# Backend: публичный профиль и booking bootstrap

## Причина

После устранения повторов frontend один SSR-рендер публичного профиля всё ещё выполняет 15 запросов.
Последовательные цепочки остаются в услугах (`groups` → `get-by-group`) и портфолио
(`albums` → `albums/image`). На замере `cellings` endpoint `GET /landing/{profileId}`
занимал до 2066 мс, поэтому frontend не может гарантировать SSR p95 ≤ 2 с.

## 1. Агрегат публичного профиля

```http
GET /v1/api/public-profiles/{link}/bootstrap
```

Ответ:

```json
{
  "profileId": "uuid",
  "profile": {},
  "workLocations": [],
  "mainTags": [],
  "canBook": true,
  "todaySchedule": {},
  "serviceGroups": [
    {
      "group": {},
      "services": []
    }
  ],
  "servicesWithoutGroup": [],
  "albums": [
    {
      "id": "uuid",
      "name": "string",
      "previewMedia": []
    }
  ],
  "reviewsSummary": {},
  "landing": {}
}
```

Требования:

- один запрос к API вместо 15 запросов из SSR;
- только публичные поля, без токенов и персональных данных;
- запросы к независимым источникам выполнять параллельно;
- услуги и preview media получать одной выборкой без N+1;
- read-only запросы EF Core выполнять с `AsNoTracking` и проекцией в DTO;
- серверный timeout 1500 мс;
- p95 backend endpoint ≤ 800 мс, p99 ≤ 1200 мс;
- `ETag` и `Cache-Control: public, max-age=30, stale-while-revalidate=120`;
- Redis/memory cache 30–60 секунд с инвалидированием после изменения профиля,
  услуг, расписания, альбомов, отзывов или лендинга.

## 2. Агрегат страницы записи

```http
GET /v1/api/public-profiles/{link}/booking-bootstrap
    ?serviceId={uuid}
    &year={number}
    &month={1..12}
```

Ответ:

```json
{
  "profileId": "uuid",
  "profile": {},
  "service": {},
  "workDays": []
}
```

Требования:

- услуга выбирается на backend непосредственно по `serviceId`, без загрузки всех групп;
- проверять принадлежность услуги профилю и возможность онлайн-записи;
- не возвращать отключённую/удалённую услугу;
- p95 ≤ 500 мс;
- одинаковый контракт для прямого открытия, reload и SPA-навигации.

## 3. Проверка сохранённого слота

Желательный атомарный endpoint:

```http
POST /v1/api/booking-slots/validate
Content-Type: application/json

{
  "profileId": "uuid",
  "serviceId": "uuid",
  "dayId": "uuid",
  "date": "2026-07-20",
  "start": "10:30"
}
```

Ответ `200 { "available": true }` либо `409 { "available": false, "reason": "occupied" }`.
Проверка и последующее создание записи в идеале должны использовать reservation token или
одну транзакцию, иначе между validate и create остаётся race condition.

## Приёмка

- 20 последовательных прямых открытий публичного профиля: 200, p95 ≤ 2 с;
- 20 прямых открытий календаря: 200, p95 ≤ 3 с;
- не более одного backend-запроса bootstrap на SSR-рендер;
- изменение услуги/альбома/лендинга видно не позднее 60 секунд;
- ошибки дочерних источников не роняют весь ответ: необязательные секции возвращаются пустыми
  с диагностикой в серверных логах.
