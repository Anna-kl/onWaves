# Бэкенд: лёгкая регистрация гостя при онлайн-записи

## Что происходит на фронте

Гость проходит флоу `choose-service → choose-date → confirm-record` без входа
в аккаунт. На шаге `confirm-record` вместо немедленного `saveRecord` открывается
модалка: имя, телефон (+7, маска), чекбоксы согласий. По нажатию
«Подтвердить запись» фронт делает два запроса:

```
1. POST  /v1/api/auths/quick-register        ← НОВЫЙ эндпоинт (это ТЗ)
2. POST  /v1/api/records/add-user/{masterId}  ← существующий, не трогаем
```

После `quick-register` фронт:
- кладёт `token` в cookie `auth-token-ocpio` (365 дней, `path=/`),
- кладёт `profileUserId` в cookie `profileId-ocpio` (365 дней, `path=/`),
- вызывает уже существующий `POST /v1/api/auths/uuid` (LoginService.updateProfileUA),
  который подтягивает профиль в NgRx-стор — **новый токен должен работать с
  этим эндпоинтом без изменений**,
- вызывает `add-user` с `record.clientId = profileUserId`.

---

## Новый эндпоинт `POST /v1/api/auths/quick-register`

### DTO запроса

```csharp
public class QuickRegisterRequest
{
    /// <summary>11 цифр: "7" + 10-значный номер. Пример: "79991234567".</summary>
    [Required, RegularExpression(@"^7\d{10}$")]
    public string Phone { get; set; } = string.Empty;

    /// <summary>Имя клиента, минимум 2 символа.</summary>
    [Required, MinLength(2), MaxLength(100)]
    public string Name { get; set; } = string.Empty;
}
```

### DTO ответа

Переиспользуется существующая модель, которую уже возвращают `checkCode` и
`createProfile`:

```csharp
// Существующая модель — менять не нужно
public class ViewAuthProfile
{
    public string Token { get; set; } = string.Empty;
    public string? ProfileUserId { get; set; }
}
```

Обёртка `IResponse` — та же, что везде:

```json
{
  "message": "ok",
  "code": 201,
  "data": {
    "token": "<jwt>",
    "profileUserId": "<guid>"
  }
}
```

| code | Значение |
|------|----------|
| `201` | Создан новый профиль |
| `200` | Найден существующий профиль, выдан новый токен |
| `400` | Невалидный запрос (phone/name не прошли валидацию) |
| `429` | Превышен рейт-лимит |
| `500` | Внутренняя ошибка |

### Алгоритм обработчика

```csharp
[HttpPost("quick-register")]
public async Task<IActionResult> QuickRegister([FromBody] QuickRegisterRequest req)
{
    // 1. Валидация (ModelState + атрибуты — автоматически)

    // 2. Rate limit: по req.Phone и по IP
    //    Используй тот же механизм, что у GET auths/{phone}
    //    (лимит N запросов / 10 минут — возвращай code:429 / code:500)

    // 3. Нормализация телефона (убрать всё лишнее, оставить 11 цифр)
    var phone = Regex.Replace(req.Phone, @"\D", "");

    // 4. Найти профиль UserType.User по phone
    var profile = await _profileRepo
        .FindByPhoneAndTypeAsync(phone, UserType.User);

    bool isNew = profile == null;

    if (isNew)
    {
        // 5a. Создать новый профиль
        profile = new Profile
        {
            Id        = Guid.NewGuid(),
            Name      = req.Name,
            Phone     = phone,
            UserType  = UserType.User,
            Register  = DateTime.UtcNow,
            Status    = AuthStatus.Active,   // или Default — по аналогии с createProfile
        };
        await _profileRepo.AddAsync(profile);
    }
    // Если профиль найден — ничего не меняем (Name, Phone, Status не трогаем)

    // 6. Выпустить JWT — ТОЧНО ТАК ЖЕ, как при checkCode/createProfile
    //    Клеймы должны совпадать с тем, что ожидает POST auths/uuid
    var token = _jwtService.GenerateToken(profile);

    // 7. Вернуть ответ
    return Ok(new IResponse
    {
        Code    = isNew ? 201 : 200,
        Message = "ok",
        Data    = new ViewAuthProfile
        {
            Token         = token,
            ProfileUserId = profile.Id.ToString()
        }
    });
}
```

### JWT: какие клеймы нужны

`POST auths/uuid` (вызывается сразу после quick-register) ожидает те же клеймы,
что выдаёт `checkCode`. Убедись, что `_jwtService.GenerateToken(profile)` кладёт
в токен минимально:

| Claim | Источник |
|-------|----------|
| `sub` / `nameidentifier` | `profile.Id` |
| `userType` / аналог | `UserType.User` |
| `iat`, `exp` | стандартные (срок жизни токена — как у checkCode) |

> Если `auths/uuid` проверяет что-то ещё (сессию, device-id и т.п.) —
> убедись, что quick-register создаёт нужные записи в тех же таблицах.

---

## Связь с существующими эндпоинтами

| Существующий эндпоинт | Меняется? | Примечание |
|-----------------------|-----------|------------|
| `GET auths/{phone}` | Нет | Отправляет SMS — quick-register его не использует |
| `POST auths/` (checkCode) | Нет | |
| `POST auths/uuid` | Нет | Должен принять токен из quick-register |
| `POST profiles/` (createProfile) | Нет | Quick-register делает то же сам, без отдельного вызова |
| `POST records/add-user/{id}` | Нет | Вызывается фронтом вторым запросом с `clientId` |
| `POST Consent/bulk` | Нет | Уже работает «по телефону» без profileUserId |

---

## Consent: привязка согласия

Фронт отправляет `POST Consent/bulk` **одновременно** (не дожидаясь ответа)
с таким телом:

```json
{
  "profileUserId": "<guid из quick-register>",
  "phone": "79991234567",
  "channels": null,
  "isGranted": true,
  "consentTextVersion": "<актуальная версия>",
  "source": "registration"
}
```

> Изменения в `Consent/bulk` не нужны. Единственное, что стоит проверить:
> при нахождении/создании профиля в quick-register — есть ли логика,
> которая подтягивает согласия, ранее зафиксированные **только по телефону**
> (без profileUserId), к появившемуся профилю?
> Это важно для `GET Consent/{profileUserId}/history`.

### ConsentChannel (enum, менять нельзя)

```
Sms = 0, Telegram = 1, Push = 2, Vk = 3, Email = 4
```

`channels: null` = все каналы.

---

## Рейт-лимиты и анти-абуз

Эндпоинт создаёт аккаунт **без подтверждения номера** — он привлекателен для
накрутки чужими номерами.

**Рекомендованный лимит:** по аналогии с `GET auths/{phone}` —
не более N запросов на один `phone` / IP за 10 минут.

**Формат ошибок:** используй те же коды, что уже знает фронт от `register(phone)`:

```json
{ "code": 500, "message": "Превышено число запросов" }
```
```json
{ "code": 204, "message": "Повторно запросить код можно будет через 5 мин" }
```

Или верни `429 Too Many Requests` — фронт покажет общее сообщение об ошибке.

---

## Идемпотентность

Повторный `quick-register` с тем же `phone` (например, после ошибки сети или
при повторном нажатии «Подтвердить запись» в модалке) должен:
- вернуть **тот же профиль** (`profileUserId` не меняется),
- выдать **новый токен** (как обычный повторный логин),
- не создавать второй профиль.

---

## Миграция / изменения в БД

Новых полей/таблиц не требуется. Профиль создаётся с теми же колонками,
что и через стандартный `POST profiles/`. Убедись, что:

- поле `Name` не null (quick-register всегда его передаёт),
- поле `Phone` хранит 11-значную строку без пробелов и дефисов,
- индекс на `(Phone, UserType)` существует — он нужен для быстрого поиска
  при каждом вызове quick-register.

---

## Чек-лист

- [ ] **Controller:** добавить `POST auths/quick-register` в `AuthsController`
- [ ] **DTO запроса:** `QuickRegisterRequest { Phone, Name }` с валидацией
- [ ] **DTO ответа:** переиспользовать `ViewAuthProfile { Token, ProfileUserId }`
- [ ] **Логика:** найти профиль `UserType.User` по `Phone` → найден: логин; нет: создать
- [ ] **Создание профиля:** `Name, Phone, UserType = User, Register = UtcNow, Status = Active`
- [ ] **JWT:** те же клеймы, что у `checkCode`/`createProfile` → `auths/uuid` принимает
- [ ] **Код ответа:** `200` — вход в существующий, `201` — создан новый
- [ ] **Идемпотентность:** повторный вызов с одним phone не дублирует профиль
- [ ] **Рейт-лимит:** по phone и IP, формат ошибок как у `register(phone)`
- [ ] **Индекс:** `(Phone, UserType)` — проверить наличие, создать при отсутствии
- [ ] **Consent:** проверить, привязываются ли согласия «по телефону» к профилю
