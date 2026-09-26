# OnWaves — инструкция для агентов

Рабочий скилл вёрстки/Angular/RxJS: `.cursor/skills/onwaves-front/`. Соседи: Flask `D:/Project/Flask Api/.cursor/skills/onwaves-flask/`, бэк `D:/Project/OcpioServer/.cursor/skills/onwaves-service-ocpio/`.

Это фронтенд-репозиторий [onwaves.online](https://onwaves.online): двусторонний агрегатор услуг с онлайн-записью, кабинетом мастера и маркетинговым контуром привлечения. Читай этот файл целиком перед правками в незнакомой зоне. Не «причёсывай» легаси, пока задача этого не требует.

**Стек:** Angular 16 + Universal SSR (`@nguniversal/express-engine`), NgRx 16, PrimeNG, ng-bootstrap, Yandex Maps v3, SignalR, кастомный PWA (`/sw.js`). Пакет: `main-site-ocpio`. Проект в `angular.json`: `MainSiteOcpio`. Локаль: `ru`.

**Бэкенд (не в этом репо):** `https://onwaves-server.online/v1/api/`. AI-сервис: `{UriAI}` → prod `…/flask-api/api/`. Хабы: `{hubUri}hubs/orders`.

---

## 1. Продукт (результат аудита)

OnWaves — **маркетплейс записи**, не платёжный шлюз и не классифайды.

| Сторона | Кто | Что получает |
|---------|-----|----------------|
| Спрос (UA) | Клиент | Поиск мастера/салона, свободные слоты, запись без звонка, свои записи, чат, уведомления |
| Предложение (BA) | Мастер / салон | Публичная страница по slug, прайс, график, галерея, лента, промо-офферы, CRM клиентов, запись 24/7 |
| Платформа | OnWaves | SEO-витрина, PWA, Метрика, лендинги набора, уведомления (SMS / MAX / Telegram / Web Push) |

**Позиционирование на витрине:** «онлайн-запись к мастерам и в салоны красоты», «без звонков и комиссий». Категории шире красоты: фото/видео, IT, бытовые услуги, строительство. Монетизация на витрине — **бесплатный вход** (стадия набора предложения). `/oplata` — способы оплаты мастера для клиента, не эквайринг OnWaves.

**Два маркетинговых контура — не путать:**

1. **Саморегистрация BA** — `/landing` (гость; авторизованного уводит гард на `/`). CTA «Стать мастером», PWA-установка.
2. **Ручной набор + реклама** — `/masters`. Оффер «первым 50 страница бесплатно», ИИ-продвижение, CTA в Telegram (`t.me/ANUTTA_K`) и MAX. События: `profiles/get-landing-event` (`masters_page_visit`, `masters_click_telegram`, `masters_click_max`). Живой пример профиля: `/cellings`.

**Внутри кабинета** у BA есть отдельный продукт — **промо-страница** (`/ba-edit/:id/promo`, API `landing/`). Это офферы на публичном профиле, не маркетинговые URL `/landing` и `/masters`.

**Каналы:** Яндекс.Метрика `102514111`, Яндекс.Директ (вне этого репо), VK Ads Top.Mail.Ru `3792159`, VK `vk.com/club238581537`, Telegram `t.me/onwaves`, почта `askme@onwaves.online`. Google Analytics / gtag **в рантайме не подключены** (`measurementId` в env — мёртвый хвост Firebase). Не добавляй пиксели «на всякий случай».

---

## 2. Роли, сессия, URL

### Роли (`UserType`)

- `User` (0) — UA, клиент. Кабинет: `/profile-user/:id`, `/page-user/:id`.
- `Business` (1) — BA, мастер/салон. Редактор: `/ba-edit/:guid/…`. Календарь записей: `/notes/:guid`. Хаб: `/cabinet-ba`.
- `Admin` (2).

Один аккаунт может держать несколько профилей. Активный профиль — cookie `profileId-ocpio`.

### Cookies (префикс `ocpio` — легаси-имя продукта)

| Cookie | Смысл |
|--------|--------|
| `auth-token-ocpio` | JWT (не HttpOnly; кладётся из JS) |
| `profileId-ocpio` | GUID активного профиля |
| `uuid-ocpio` | отпечаток устройства |

Сессия поднимается в `APP_INITIALIZER` → `initializeAuth` → `LoginService.checkCookie()` → `POST auths/uuid` **до** роутера (`initialNavigation: 'enabledBlocking'`). Не ломай этот порядок: `profileEditGuard` ждёт `isLoad$`.

Гарды: `src/app/guards/profile-edit.guard.ts` (JWT + профиль в NgRx), `redirect-authenticated-from-landing.guard.ts` (`/landing` → `/` если есть cookie).

Гость может записаться: `POST auths/quick-register` (см. `docs/backend/guest-booking-quick-register.md`) через `booking-contact-modal`.

### Публичный URL — slug, не GUID

Карточка мастера: `https://onwaves.online/{link}`. Параметр `:id` в `ProfileBARouting` — это **link**. Резолв: `ProfileService.translateLink` → `GET profiles/translate-link/{link}` → GUID в `ProfileDataService.transferId`.

Редактор всегда по GUID: `/ba-edit/{guid}/uslugi`.

Зарезервированные slug (нельзя как `profile.link`, не класть в sitemap): `catalog`, `landing`, `masters`, `search`, `static`, `ba-edit`, `profilebisacc`, `cabinet-ba`, `sitemap.xml`, `robots.txt`. Критерий ссылки: один сегмент без `/ ? # :` и пробелов, длина ≤ 120.

`ProfileBAModule` импортирует `ProfileBARouting` **раньше** `ProfileBANotesRouting`, иначе slug `notes` перехватит воронку записи.

---

## 3. Карта репозитория

```
src/app/
  auth/              LoginService, initializeAuth
  baedit/            кабинет BA (ленивый BaEditModule + ProfilebisaccModule)
  profile-ba/        публичный профиль + воронка записи + калькулятор + /notes
  profile-user/      кабинет UA
  pages/             главная, /landing, /masters, чат, список клиентов
  search/            расширенный поиск и выдача
  maks/              CRM клиентов (/clients)
  static/            help, политики, о сервисе
  common/            календарь, карты, лента, альбомы, адрес, видео
  components/        модалки регистрации, OTP, уведомления
  ngrx-store/        сессия, BA на просмотре, уведомления, AI, ссылки
  DTO/               classes / views / enums / requests
  ssr/               preload, HTTP timeout, SSR interceptors
  guards/
src/services/        HTTP-клиенты API (не путать с src/app/services/)
src/helpers/
src/enviroments/     опечатка в имени папки — не переименовывать
src/sw.js            кастомный service worker (не ngsw)
server.ts            Express SSR, sitemap, robots, HTML-кеш
```

Живые маршруты BA-редактора объявлены **внутри** `ba-edit.module.ts` и `profilebisacc.module.ts` (префикс уже в `app-routing`). Файл `ba-edit-routing.ts` — легаси; не подключай его заново и не синхронизируй вслепую.

HTTP-сервисы живут в `src/services/*.ts`. URL: `environment.Uri + '{resource}/'`. Авторизацию **не** вешает глобальный interceptor: каждый метод сам клеит `Authorization: Bearer {token}` из cookie/аргумента. Не «улучшай» это перехватом, пока явно не попросили.

Конверт API: `IResponse { message, code, data }`. Смотри `code`, не только HTTP-статус.

---

## 4. Маршруты

| Путь | Что | Индекс |
|------|-----|--------|
| `/` | Главная: поиск, категории, лента «Рекомендуем / Рядом» | да |
| `/landing` | Лендинг мастера, саморег | да, гости |
| `/masters` | Ручной набор + ИИ-продвижение | да |
| `/search/extsearch` | Форма расширенного поиска | да |
| `/search/result`, `/search/extsearch/:search` | Выдача | **noindex** |
| `/:slug` | Публичный профиль (`dynamicSeo` + `dynamicHit`) | да |
| `/:slug/lenta` | Лента постов | через профиль |
| `/:slug/choose-service\|choose-date\|confirm-record*` | Воронка записи | **noindex**, не кешировать SSR |
| `/ba-edit/:id` | Редактор: корень, contacts, rubric, uslugi, galereya, schedule, oplata, promo, arenda-* | noindex + Disallow |
| `/profilebisacc/:id` | «Как видит клиент» | noindex |
| `/notes/:id` | Календарь записей BA | noindex |
| `/cabinet-ba` | Хаб кабинета BA | noindex |
| `/clients` | CRM | noindex |
| `/chat-page` | Чат (REST; SignalR закомментирован) | noindex |
| `/notification` | Список уведомлений | noindex |
| `/catalog` | HTML-каталог ссылок (собирает `server.ts`) | да |
| `/static/oservice\|help\|pravila\|policies` | Статьи | да |
| `/static/settings` | Настройки (нужен гард) | noindex |

Редиректы закладок: `/grafik/:id` → `ba-edit/:id/schedule`, аналогично `oplata`, `galereya`.

---

## 5. Команды

```bash
npm start                 # ng serve, 127.0.0.1:4200, API → localhost:5001
npm run dev:ssr           # Universal dev
npm run build:ssr         # браузер + server
npm run serve:ssr         # node dist/MainSiteOcpio/server/main.js
npm run prerender         # сейчас только "/"
npm test                  # Karma/Jasmine; большинство spec — пустые заготовки CLI
npm run generateMenu      # node ./node/categories/generateCategories.js
```

Окружения: `src/enviroments/environment.ts` (dev) и `environment.prod.ts`. `ng build` подменяет через `fileReplacements`.

| Ключ | Dev | Prod |
|------|-----|------|
| `Uri` / `UriFoto` | `https://localhost:5001/v1/api/` | `https://onwaves-server.online/v1/api/` |
| `hubUri` | `http://localhost:5000/` | `https://onwaves-server.online/` |
| `UriAI` | `http://127.0.0.1:8000/api/` | `https://onwaves-server.online/flask-api/api/` |
| `siteUrl` | всегда `https://onwaves.online` | то же; **не брать из Host** |
| `domain` | `localhost` | `onwaves.online` |

`server.ts` **не импортирует** `environment`: отдельный бандл подтянул бы localhost. `SITE_URL` и `SITEMAP_API_URL` дублируются константами. Меняя домен — правь оба места.

---

## 6. Жёсткие правила

### SSR и гидрация

- Любой `window` / `document` / `scrollIntoView` / localStorage / cookie-запись — только под `isPlatformBrowser`. Иначе упадёт Universal.
- `provideClientHydration()` включает HTTP transfer cache: GET с SSR не должны без нужды дублироваться на клиенте.
- HTML-кеш в `server.ts`: TTL 60 с, max 500. **Запрещено** кешировать `/choose-date` и `/confirm-record(2)` — слоты устаревают, гидрация рисует «нет окон» поверх закешированных.
- SSR HTTP timeout 5 с (`ServerTimeoutInterceptor`, только `AppServerModule`). Рендер не должен ждать вечно; данные догрузятся в браузере.
- На SSR нет пользовательских cookie → всегда анонимный HTML. Не клади персональные данные в серверный рендер «чтобы быстрее».
- Preload (`NetworkAwarePreloadStrategy`): только `data.preload`, только браузер, только с JWT, не на медленной сети. Рекламному гостю на профиле кабинет в фон не тащить.
- Падение SSR → отдать CSR `index.html` с 200, не 5xx. **Исключение `/cellings`:** оболочка без `h1` и без «Рассчитать стоимость» в body снова покупает пустоту — см. плейбук рекламного slug.
- `www.onwaves.online` → 301 на apex. Хост `ssr.onwaves.online` — `Disallow: /` и `X-Robots-Tag: noindex`. Метрика на нём выключена.
- Публичный профиль на SSR всё ещё делает много запросов. Агрегат `GET public-profiles/{link}/bootstrap` — в `docs/public-profile-performance-backend.md`, **ещё нет в API**. Не пиши фронт под него, пока бэк не отдаёт контракт.

### SEO

Стратегия органики (что индексируем и зачем, правила разметки, карта сайта, перелинковка, измерение, красные линии) — `D:/Project/Onwaves-manage/skills/onwaves-seo/SKILL.md`. Здесь — только контракт кода витрины; не дублируй туда и оттуда.

Приёмка версии, баг витрины, воронка записи и приветственные купоны — `D:/Project/Onwaves-manage/skills/onwaves-qa/SKILL.md`. В проходе «только проверить» код не правь.

**Прод 22.09.2026**, бандл `main.6b0603617785d781.js`, ответ сервера без JS:

- `/mary`: title «Mary, Кашира — онлайн-запись | OnWaves», один `h1` «Mary», свой description, каноникал без query, один `ld-json-page`. Дефект 21.09 (общий title OnWaves, ноль `h1`, skeleton в body) на этой выкладке закрыт. Класс `landing-skel` остаётся в CSS, элемента каркаса нет.
- `/cellings`, в том числе с UTM: потолочный title, один `h1` «Сколько будет стоить ваш натяжной потолок?», в body «Рассчитать стоимость» и города Ступино, Кашира, Озёры, Коломна. Каноникал без query.
- Купоны: пилот `welcome-pilot-2026-09` включён для этих двух профилей до 20.10.2026. Окно гостя — один раз в сутки на все карточки; после «Не сейчас» блок условий у услуг остаётся; соседний профиль в те же сутки окно не открывает. В первом HTML окна и текста скидки нет. Картинка баннера обещает «от 300 ₽ при записи от 2 000 ₽», список под ней — 200 / 300 / 500 ₽. Подтверждение записи и кабинет «Мой купон» 22.09 не проходились.

Единая точка тегов: `src/services/seo.service.ts`. На каждой навигации `AppComponent.collectRouteSeo` читает `data` маршрута.

- `title` / `description` / `noindex` / `ogType` — в `data` роута.
- `dynamicSeo: true` (публичный профиль): AppComponent ставит только canonical + robots; title/OG/JSON-LD ставит компонент **после** ответа API (`page-user-ba`). Иначе общий `update()` затрёт уже правильные теги дефолтом.
- `update()` обязан перетирать **все** поля, включая откат к дефолту. SPA не перезагружает документ — description карточки иначе утечёт на `/static/help`.
- Canonical = `environment.siteUrl` + путь, **без query** (utm, `?action=register`).
- JSON-LD: один `<script id="ld-json-page">`. Профиль — `schema.org/LocalBusiness`. На уходе со страницы сбрасывать.
- Индексируем мало URL: главная, лендинги, форма поиска, статика, **карточки по slug**, `/catalog`. Кабинеты, выдача поиска, шаги записи — `noindex` + `Disallow` в `src/robots.txt`.
- Если URL уже в индексе Яндекса, а нужно выкинуть: сначала снять Disallow, чтобы робот увидел noindex, потом вернуть. Комментарий в `robots.txt`.
- `Clean-param` лежит в группе `User-agent: *`. Отдельную группу `User-agent: Yandex` не заводить — Яндекс тогда проигнорирует все Disallow выше.
- Новую публичную страницу: `data.title` + `description`, запись в `SITEMAP_ROUTES` (`server.ts`), не забыть `noindex` если это кабинет.
- Дефолтный OG-image: `/assets/img/jpg/logo.jpg` (временный, не 1200×630). Не подставляй его как `og:image` карточки, если есть фото профиля.

### Аналитика

- Счётчик Метрики `102514111`, `defer:true`; Top.Mail.Ru (VK Ads) `3792159` — только загрузчик, без авто-`pageView` и без `pid`. Хиты только из `AnalyticsService.trackPage`.
- Статические страницы: хит шлёт `AppComponent` на `NavigationEnd`.
- `data.dynamicHit: true`: хит шлёт **компонент** после своего title. Иначе в Метрику уйдёт прошлый `document.title`.
- Цели: `trackEvent(category, action, …)` → `ym reachGoal` и `_tmr reachGoal` с тем же `action`. Живая цель по записи: `add_record`. Калькулятор на карточке: `calculator_start` (создан новый расчёт, Метрика `637119448`), `calculator_complete` (дошли до сметы), `calculator_max` (после сметы открыл MAX мастера) — те же имена уходят в `GET profiles/get-reference/{id}` (Kafka → бот администратора). **Один раз на расчёт** (`helpers/calculator-events.ts`): повторное открытие панели, F5 и возврат к расчёту событий не дают. Новую цель заводи в Метрике, в кабинете VK Ads **и** в коде; не изобретай gtag.
- Рекламные метки `/cellings` не смешивать: `potolki_search` — живой поиск `713764394`; `potolki_epk` — остановленная РСЯ `713412394`. Допуск по отказу и `calculator_start` смотреть на новой когорте и отдельно по `potolki_search`, не средним за август и не окном 11–17.09.
- `/masters`: параллельно Kafka/Telegram через `ProfileService.sendLandingEvent`. Только в браузере. Ошибки глотать (`.subscribe({ error: () => {} })`) — лендинг не должен падать из-за учёта.
- Не считать стейджинг `ssr.onwaves.online`.

### Запись и слоты

Цепочка: `/:slug` → `choose-service` → `choose-date` (черновик в sessionStorage `choose-date-selection:…`) → `confirm-record` → `POST records/add-user/{masterId}`.

- Слоты: `schedule.service.ts` → `services/get-free-slot-detailed/{id}` (клиент). Не расходись с `days-in-month` — см. `docs/backend/booking-free-slots-consistency.md`.
- Форматы работы: `WorkLocationType` Fixed=0, Mobile=1, Online=2. Mobile на записи требует адрес клиента (`IRecordLocation`).
- Не кешируй HTML/слоты агрессивно. Не показывай «окна», которых API уже не отдаёт.

### Калькулятор и смета

Плеер анкеты — `profile-ba/components/calculator-player/*`, API `v1/api/calculators` (`by-profile`, `quotes`, `quotes/{id}/answers/{stepId}`, `quotes/{id}/leads`). Решение по схеме — `OcpioServer/docs/CALCULATOR-SCHEMA-V3-2026-09-15.md`.

- **Цену клиент не считает.** Текущий вопрос, активный путь, количества, строки сметы и итог приходят с сервера. Ни арифметики, ни ставок, ни «пересчитаем локально, чтобы не мигало» на фронте быть не должно.
- Проход хранит сервер: `quoteId` + токен в заголовке + `revision`. Quote создаётся при открытии плеера, ключ `ow-calc-quote:{profileCalculatorId}` в `localStorage`. F5 восстанавливает текущий шаг по quote, а не начинает заново; повтор запроса с тем же `requestId` не создаёт второй лид; расхождение ревизии — 409: показываем актуальный шаг, а не молча перезаписываем ответ.
- Идентификаторы шага и экземпляра (помещения) приходят полями. Не разбирай их из строки и не собирай на клиенте.
- Результат бывает трёх видов: цена; «от X ₽» с перечнем позиций, которые мастер оценит на замере; расчёт недоступен. Третий — поломка настройки, а не обычная заявка: не рисуй его как второй.
- Ответ на анкету — не запись. По итогу всегда CTA «Записаться на бесплатный замер»: воронка по `measurementServiceId`, иначе услуга с «замер» в имени или `/choose-service`. Правил слотов это не меняет.
- После итога нижняя зона плеера — одна закреплённая кнопка записи с суммой под ней; поле ввода скрыто. Лид без записи — запасной путь за ссылкой, не вторая кнопка того же веса.
- Расчёт едет в запись: `goRecord()` пишет снимок `helpers/calculator-handoff.ts` (`sessionStorage`, ключ `ow-calc-handoff`, привязка к `profileId` мастера, TTL 6 ч), `confirm-record` дописывает его в комментарий и чистит после создания записи. Это мост до серверной связи quote ↔ record — `Onwaves-manage/docs/calculator-to-record-2026-09-16.md`.
- «Написать мастеру» — вторая кнопка итога, контурная, под записью. Пока ведёт в MAX мастера (`getMaxUrl(профиль.max)`; нет MAX — нет кнопки). Вкладка открывается синхронно в обработчике клика; расчёт мастеру шлёт бот OnWaves (`CalculatorService.notifyMaster`, `POST quotes/{id}/master-notify`), клиенту в буфер — первое сообщение с номером расчёта. Решение — `OcpioServer/docs/CALCULATOR-MAX-HANDOFF-2026-09-16.md`.
- Плеер — фиксированный слой (`calculator-stage.ts`) между шапкой `.hmenu` и нижним меню `.mob-nav` (z-index 9999): `top` + `bottom`, не рассчитанная высота. Новый фиксированный слой поверх страницы — добавь его в расчёт, иначе он закроет поле ввода.
- Положение панели от прокрутки страницы не зависит: пересчёт только на resize, слушатель `scroll` не вешать. Пока панель открыта, страница заблокирована (`lockPageScroll`).
- Анимация выезда — только `transform`. Фокус внутри панели — только `focus({ preventScroll: true })`: обычный `focus()` прокручивает хост и гасит выезд, это видно как дрожание. Если панель встаёт на место заглушки «Загружаю вопросы…», второй раз не выезжает (`animateIn`).
- Перенос хоста в `body` и возврат в `ngOnDestroy` (`liftStageToBody` / `restoreStageHome`) держатся на том, что `BrowserAnimationsModule` снимает узлы после `ngOnDestroy`. Без модуля анимаций закрытый плеер остаётся висеть в DOM — не убирай модуль, не проверив закрытие.
- SSR: публичный `GET by-profile` допустим под общим таймаутом `ServerTimeoutInterceptor`; `quote` на сервере не создаётся; персональный проход в 60-секундный HTML-кеш `server.ts` не попадает.
- Легаси: `profile-ba/components/cellings-offer/*`, `helpers/cellings-offer.ts` и ветка `isCellingsProfile` — форма под одного мастера. Удаляются после настройки калькулятора на боевом профиле; новые правки туда не вносим. Slug `/cellings` — адрес в объявлениях Директа, его не трогаем.
- **Допуск `/cellings` при живом расходе** (18.09.2026): контракт первого HTML (title, один `h1`, кнопка, города) на проде уже зелёный — **не** переписывать §6 ТЗ 17.09. Незакрыто: CTA выше сгиба на 390 (`cellingsHero`: тело → обложка при ≤767), CSR-фолбэк с оффером в body, клик калькулятора на проде, отказ < 60% / `calculator_start`. Зелёный `curl` ≠ закрытый допуск. Подробности — плейбук ниже и `D:/Project/Onwaves-manage/docs/cellings-admission-live-spend-2026-09-18.md`.

### Чаты

Решение — `OcpioServer/docs/CHATS-MASTER-THREADS-2026-09-16.md`.

- **Переписка одна на пару «клиент × профиль мастера».** Услуга, акция, расчёт и запись — карточки внутри неё, а не отдельные чаты. Любая кнопка «Написать» ведёт в тот же тред.
- Отправитель определяется сервером по JWT. Id профиля в URL как отправителя не использовать.
- Пока чата нет, «Написать» ведёт в MAX или Telegram мастера. `services/master-chat.service.ts` и `DTO/views/chat/IMasterChat.ts` — заготовка под чат, не подключать без API тредов.
- Гостевой вход — только через `QuickSessionService` (`services/quick-session.service.ts`): куки, стор, согласие — один код для записи и сообщения. Сессию для существующего номера сервер не выдаёт; фронт её не домысливает.
- Старая `/chat-page` (`pages/chat-main`) — легаси: без авторизации, без сортировки, `HH:MM` показывает месяц. Не развивать — переписывается по разделу 9.2 ТЗ.
- Времена в чатах — `HH:mm`.

### Состояние

NgRx-ключи **не переименовывать** (опечатки — часть контракта сессии):

| Ключ | Смысл |
|------|--------|
| `modeleReducerPoint` | сессия: token + `profileMainClient` |
| `baClientReducer` | открытый BA на просмотре |
| `checedIdClient` | выбранный клиент в CRM/notes |
| `updateGallery` | флаг грязной галереи |
| `notification` | инбокс |
| `link` | редирект после логина |
| `aiStore` / `aiReducer` | голосовой ассистент записи |

Рядом — `BehaviorSubject` на `LoginService`: `isAutentificate$`, `isLoad$`, `allProfiles$`. Для «залогинен ли» в гарде — cookie JWT + store, не один только Subject.

### PWA и пуш

Кастомный `/sw.js`, кэш `onwaves-cache-v4`. Регистрация в проде из `app.component.ts`. Logout **не** unregister SW (подписка переживает выход). VAPID — `environment.publicKey`. Не переключай на `@angular/service-worker` без отдельной задачи.

---

## 7. Глоссарий (не переводить в «правильный английский»)

| Термин в коде | Смысл |
|---------------|--------|
| BA | Business Account, мастер/салон |
| UA | User Account, клиент |
| uslugi | услуги / прайс |
| grafik / schedule | график работы; роут уже `schedule` |
| galereya | портфолио |
| oplata | способы оплаты BA |
| lenta | посты профиля |
| arenda | почасовая / услуга-аренда |
| notes | журнал записей BA |
| profilebisacc | превью «глазами клиента» |
| maks | модуль CRM (`/clients`) |
| ocpio | старое имя в cookies/package |
| IViewBussinessProfile | главное view профиля (опечатка в имени — не трогать) |
| workLocation | стационар / выезд / онлайн |
| promo / landing (API) | промо-офферы на карточке BA |
| quote (калькулятор) | проход посетителя по анкете и снапшот сметы |
| смета / breakdown | строки расчёта: позиция, количество, цена, сумма |
| `/landing`, `/masters` | маркетинговые посадочные платформы |
| `/cellings` | боевой рекламный slug потолков (Директ); не менять |
| правило допуска | оффер в первом HTML + CTA выше сгиба + отказ/цели; HTML A ≠ воронка D |

Русские имена файлов и папок — легаси, не массово переименовывать. UI-копирайт — русский, тон витрины: коротко, без канцелярита, без обещания комиссии/платежей платформы.

---

## 8. Как писать код в этом репо

- TypeScript strict, шаблоны `strictTemplates`. Кавычки в `.ts` — одинарные (`.editorconfig`).
- Модули NgModule; standalone точечно (например toast). Новый экран кабинета — в существующий ленивый модуль, не в `AppModule`.
- Стили: SCSS рядом с компонентом + токены `src/assets/styles/main/color.scss`. Бренд: `#1f8f8f` / `$green-basic:#006174` / `$green-dark:#043c48`. Не тащи произвольный Tailwind и не подмешивай новую UI-библиотеку.
- Комментарии — **зачем**, на русском, как в `seo.service.ts` / `server.ts` / гарде. Не комментируй очевидное «увеличиваем i».
- Правь минимально. Не рефактори соседние опечатки (`enviroments`, ключи стора, dual auth) в том же PR.
- Два auth-сервиса: `src/services/auth.service.ts` (email/FCM) и `src/app/components/modals/services/auth.service.ts` (`AuthServices`, SMS/MAX OTP, quick-register). Не сливай без задачи.
- Две колонки профиля: публичная `profile-ba/components/column-baprofile` и кабинет `baedit/components/column-baprofile`. Меняй ту, что на экране задачи.
- Карты: `angular-yandex-maps-v3`, ключ в `app.module.ts` (`provideYConfig`). Не подключай Google Maps к витрине.
- После UI-изменения проверь поток глазами: десктоп и узкая мобильная вёрстка. Главная ценность — мобильный заход с рекламы на slug.
- Секреты: ключи Firebase, VAPID, ключи карт уже в репо. Новые секреты в код не класть. Не коммить `.env` бэка.

Контракты, которых ещё нет на бэке, лежат в `docs/` и `BACKEND-REQUEST-*.md`. Фронт под них пиши только если в задаче сказано «бэк уже отдал». Кратко:

| Документ | Тема |
|----------|------|
| `docs/public-profile-performance-backend.md` | bootstrap публичного профиля / booking |
| `docs/backend/booking-free-slots-consistency.md` | слоты месяца = get-free-slot |
| `docs/backend/guest-booking-quick-register.md` | гостевая запись |
| `docs/backend/ba-calendar-client-messengers.md` | telegram/max в расписании |
| `docs/max-messenger-backend.md` | поле `max` у BA |
| `docs/work-location-geocode-api.md` | batch geocode |
| `BACKEND-REQUEST-2026-07-29-sitemap-profiles.md` | sitemap — **уже используется** `server.ts` |
| `BACKEND-REQUEST-2026-07-19-service-formats.md` | форматы услуг — в работе/история |

---

## 9. Плейбуки

### Новая публичная страница

1. Роут в `app-routing` (литерал **выше** catch-all `:id` профиля).
2. `data.title` + `description`; кабинет — `noindex: true`.
3. При живых данных с API — `dynamicSeo` + `dynamicHit`, теги и хит из компонента.
4. При необходимости — строка в `SITEMAP_ROUTES` и не в `RESERVED_PROFILE_SLUGS`.
5. Проверить SSR-title (curl / view-source), canonical без query, JSON-LD не протекает на соседний роут.

### Событие воронки / рекламы

1. Метрика и VK Ads: `AnalyticsService.trackEvent` + цель в кабинете Метрики и VK Ads (имя = `action`, сейчас `add_record`).
2. Лендинг набора: ещё `sendLandingEvent(page, option, whoIs)` только в браузере.
3. Не дублируй хит: либо AppComponent, либо `dynamicHit`-компонент.

### Правка публичного профиля

- Не ломай `translate-link` и 404: при отсутствии профиля Express должен отдать 404 + noindex (`profileba.component.ts`).
- Не добавляй N+1 запросов на SSR (альбомы, группы услуг). Сначала переиспользуй кеш `ProfileService` (TTL 30 с + `shareReplay`).
- Запись и слоты — отдельные роуты, их HTML не кешировать.

### Рекламный slug `/cellings` (допуск при живом расходе)

ТЗ Front-кода: `D:/Project/Onwaves-manage/docs/cellings-admission-live-spend-2026-09-18.md`. Контракт `<head>`/`h1`/кнопки **не дублировать** — он в `cellings-first-html-ssr-2026-09-17.md` §5 и §9.

Снимок 18.09: поиск `713764394` **ON**, 2 000 ₽/нед, UTM `potolki_search`; РСЯ `713412394` **SUSPENDED** (`potolki_epk`). Десять `GET` без JS на проде — title потолков, один `h1` «Сколько будет стоить ваш натяжной потолок?», кнопка, четыре города, нет «салоны красоты», нет `div.landing-skel`. Код резолвера/`cellingsHero`/фильтра кеша/`patchCellingsHead` уже на проде.

**Следующий код (не этот документный заход):**

1. Только `cellings` / `cellingsHero`: на ≤767 порядок карточки — тело оффера (h1 → города → лид → цена → кнопки), затем обложка. С 768 фото сверху допустимо, если на 1280 CTA в колонке акции в первом экране. `min-height` Campaign не поднимать. Скелетон по-прежнему не сериализовать.
2. CSR-фолбэк в `server.ts`: сейчас патчится только `<title>`/`og`, в body пусто. Предпочтение: непросроченный удачный HTML `/cellings` из памяти, иначе минимальный каркас (title §5.1, один `h1` §5.2, ссылка «Рассчитать стоимость» на `/cellings` без query). Не подменять глобальный `index.html`. Не маскировать фолбэк кешем каталога.
3. Приёмка клика гостем на проде, не `ng serve`: «Рассчитать стоимость» → граф этого профиля, не `/choose-service` и не `tel:`; «Бесплатный замер» → услуга замера этого мастера; один `h1` на 390 и 1280; `/mary` без регресса (`h1` — имя, акция — `h2`); нет второго JSON-LD и хита Метрики в серверном HTML. Сломанный клик с каркаса `failed`/`absent` — чинить обработчик, не легаси-форму.

**Операционный контур (не код Front, не Директ из этого репо):** пакет поиска не поднимать; РСЯ и VK не включать; пауза поиска — только если повторный `curl` без JS снова без «Натяжные потолки» / `h1` / «Рассчитать стоимость». Расхождение объявления «за 2 минуты» с запретом §5.4 посадкой не лечить.

**Приёмка разведена.** A (первый HTML) уже зелёный — после кода только регресс. B — 390/1280 без скролла видны h1 и кнопка. C — фолбэк Universal всё равно с потолочным title, h1 и кнопкой. D — новая когорта Метрики: отказ `/cellings` < 60% на 50+ визитах, отдельно `potolki_search`, есть `calculator_start`. Пока D красный — допуск закрывать нельзя, даже при зелёном A. CAC/ROAS из этих цифр не считать.

### Правка кабинета BA

- Экран уже в `BaEditModule`. Новый child path — в `ba-edit.module.ts` (не в мёртвом `ba-edit-routing.ts`).
- Нужен гард — он уже на родителе `/ba-edit` в `app-routing`.
- Превью клиента — `profilebisacc`, не подменяй публичный `/:slug`.

---

## 10. Аудит: что сломано / не доделано (не чинить без задачи)

Зафиксировано по коду и прод-витрине (2026-08-25). Это карта мин, не бэклог «сделай всё».

**Продукт и маркетинг**

- Воронка Метрики почти пустая: цель записи `add_record`; цели калькулятора заведены 18.09 (`calculator_start` = `637119448`), на срезе 11–17.09 их ещё не было. Нет целей на регистрацию BA, CTA `/landing`, поиск, установку PWA, отказ на слотах.
- **`/cellings` при живом поиске (18.09):** HTML-контракт 17.09 на проде выполняется; допуск воронки не закрыт (отказ 72–84% в старых окнах, клик расчёта не доказан, дыры 390 и CSR-фолбэка). Не чинить ключами Директа и не открывать РСЯ «на статистику».
- GA/gtag не используются; реклама завязана на Директ + Метрику + VK Ads (Top.Mail.Ru). UTM с каноникала снимаются — это правильно для SEO, атрибуция в Метрике и пикселе.
- `/masters` продаёт «ИИ-агенты продвигают», `/landing` — самообслуживание. Разный оффер, разные CTA; не смешивай тексты.
- Чат без живого SignalR: сообщения через HTTP. Не обещай realtime в UI.
- `oplata` ≠ приём денег платформой.

**Техдолг (трогать только в задаче на это)**

- Папка `enviroments`, ключи стора с опечатками, `IViewBussinessProfile`.
- Два auth-сервиса, две column-baprofile, мёртвый `ba-edit-routing.ts`, модуль `search-page`, статические HTML в `src/static-landing/`.
- SignalR чата закомментирован; AI-навигация в `app.component` частично выключена.
- `SsrHttpLoggerInterceptor` помечен как временный — не размазывай логи на прод без нужды.
- ~130 spec-файлов, почти все пустые. Имеет смысл `booking-date.spec.ts`. Не генерируй новые пустые spec.
- JWT в JS-cookie: XSS читает сессию. HttpOnly — отдельное решение с бэком, не «поправь заодно».
- Кастомный SW вместо ngsw; кэш HTML/навигации чувствителен к выкладке.

**Производительность витрины**

- Холодный SSR профиля исторически был секундами; HTML-кеш 60 с лечит повтор, не первый хит уникального slug (рекламный хвост). Лечится бэкенд-bootstrap, не ещё одним фронтовым waterfall.
- Главный бандл разгружали ленивыми `ba-edit` / `profilebisacc` / chat / clients — не возвращай кабинет в `AppModule`.

**Безопасность / данные**

- API-ключи карт и Firebase в клиенте. Не копируй их в новые места «для удобства».
- Sitemap и `/catalog` отдают публичные `link`+`name`, не GUID и не ПДн.

---

## 11. Definition of done

- Поведение совпадает с задачей на UA **и** BA, если затронут общий стейт.
- Публичные роуты: title/description/canonical/robots проверены, JSON-LD не дублируется.
- Запись: слоты и confirm не регрессировали; гость и авторизованный путь живы.
- SSR не обращается к `window` в новом коде; booking-URL не попали в HTML-кеш.
- Метрика: нет двойного хита, title актуальный.
- UI проверен в браузере (не только скриншотом сборки), в том числе узкая ширина.
- Рекламный slug: `curl` без JS содержит оффер; на 390 CTA выше сгиба. Зелёный HTML не подменяет приёмку отказа и `calculator_start`.
- Нет попутного рефакторинга имён, стора и «приведения к английскому».
)
</content>