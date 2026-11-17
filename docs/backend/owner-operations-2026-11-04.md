# Личный реестр «Акции и выплаты»

Дата: 04.11.2026. Код реализован; production-выкладка и миграция рабочей внешней БД отдельно.

## Доступ и приватность

Маршрут Angular: `/admin/operations`, ленивый standalone-компонент. Инициализация входа не меняется. Guard ждёт `LoginService.isLoad$`, затем capabilities. Пункт меню зависит от аккаунта, а не типа активного профиля.

База API: `/v1/api/owner-operations`. Все бизнес endpoints защищены `OnwavesOwnerOperations`: валидированный JWT/действующая серверная сессия и точное совпадение claim `AuthId` с `OwnerOperations:OwnerAuthId`. Невалидная/пустая настройка закрывает доступ. Admin сам по себе доступа не даёт. `GET access` доступен любому вошедшему аккаунту и возвращает только `canAccessOwnerOperations`; гостю 401.

Ответы `private, no-store`. SSR не запрашивает capabilities/финансовые данные и отдаёт только noindex-оболочку. `/admin` уже исключён из SSR-кеша, SW-кеша, robots и списка публичных slug. Новые назначения slug `admin` запрещены, существующие не изменяются молча. В разделе нет финансовой аналитики, localStorage, TransferState или офлайн-копии балансов. При смене сессии/logout/offline состояние очищается.

## Контракт

DTO сервера: `ServicesClient/Services/OwnerOperations/OwnerOperationsContracts.cs`. DTO клиента: `src/app/DTO/views/owner-operations/owner-operations.ts`. Camel case, деньги — integer `...Kopecks`, неизвестные суммы — null, timezone `Europe/Moscow`. Статусы/остатки текущие на `asOfUtc`, выбранный день не восстанавливает старый баланс.

| Метод | Путь | Назначение |
|---|---|---|
| GET | access | Только boolean возможностей |
| GET | summary | Сводка `date`, необязательный `masterId` |
| GET | campaigns, campaigns/{sourceType}/{id} | Акции и их компоненты |
| GET | obligations | Остатки, суммы по всему фильтру |
| GET | visits | `from/to`, `undated`, отдельные права без записи |
| POST | payments/preview | Проверка выбранных остатков/версий без записи |
| POST | payments | Факт уже совершённого перевода |
| GET | payments | Фактическая история; известные legacy-итоги до импорта тоже видны |
| POST | payments/{id}/corrections | mistaken / refund, причина, версия |
| GET/POST/PUT | manual-plans[/{id}] | Ручной план; не настройка штатной акции |
| GET/POST/PUT | manual-visits[/{id}] | Внешний визит; не создание Record |
| POST | visits/record/{id}/attendance | Явка/неявка после конца визита, основание, версия |
| POST | manual-plans/{id}/link | Явное связывание без двойного счёта |
| GET | reconciliation/preview | Dry-run известных исторических Paid |
| POST | reconciliation/import | Импорт по expectedVersion dry-run |
| GET | audit | История с фильтром entityKey |

Фильтры списков: masterId, state, kind, city/search (где применимо), from/to, cursor, pageSize 1..100. Cursor — смещение. Диапазон до 366 дней. Проекция ограничена 5 000 исходными строками каждого типа; превышение — 422 вместо неполного финансового итога. Ошибки 400/401/403/404/409/422 различаются.

Создание платежа, ручного плана и ручного визита требует `idempotencyKey`. У платежа: фактическое UTC-время не в будущем, метод sbp/transfer/cash/other, обязательное основание, allocations с серверными expectedVersion. Один перевод — один получатель. Сервер проверяет суммы и не допускает переплату. Новые ручные процентные суммы считает сервер с округлением AwayFromZero до копейки.

## Деньги и исторические источники

Канонические ключи: promoSeat:<seatId>, coupon:<compensationId>, prizeAward:<awardId>, couponReserve:<usePromoId>, manualPlan:<planId>. PromoSeat включает купон в OnwavesPays; CouponCompensation той же записи — компонент. Уже оплаченный отдельно купон уменьшает общий остаток. Новые частичные платежи погашают купонный компонент первыми; полный Paid места ставится только при закрытии всей доплаты.

Приз: начисление по выполненным booking snapshots, PaidAmount — накопленная выплата, DueAmount уже остаток. Лимит двух возможных визитов не создаёт два назначенных визита. Сам Success/автоматически созданный Due не подтверждает явку. Неоднозначные, тестовые и несовместимые снимки не доступны для выплаты.

Все HTTP writers выплат купонов/PromoSeat/Giveaway используют OwnerOperationsWriter. Serializable + PostgreSQL transaction advisory lock, уникальный request key/hash, проверка версий, синхронизация источников, аудит и commit. Старые права доступа не расширены. Старый cancel не может стереть уже зарегистрированную оплату.

Перед новым платежом известные прежние Paid должны пройти dry-run/импорт. Импорт — устойчивый aggregate key, одна общая оплата места с купоном; неизвестные даты сохраняются null. GET ничего не создаёт. У источников после импорта журнал является общей историей платежей.

Связывание оплаченного ручного плана со штатным источником допускается только при согласованных фактических снимках и нулевой оплате целевого источника. Исходные allocations не меняются: нулевая кассовая запись link переносит paid balance; CashHistory не считает её новым переводом. Корректировка исходного перевода после связи адресует текущий канонический источник. Если оплачены обе стороны/снимки различаются — 409, нужна сверка.

## Выкладка

Добавочная миграция DataModel `20261104180000_OwnerOperations` после ScheduledPromoCouponSeats. Автомиграции нет. OwnerAuthId задаётся серверной конфигурацией, в клиентский код и appsettings не вшивается. Переключать все API writers совместно; старые и новые экземпляры не должны одновременно регистрировать выплаты.

При откате интерфейса сохранить ledger writer и таблицы. Down миграции запрещён, чтобы не удалить финансовую историю. Корректировка — отдельная запись с причиной. Общие артефакты dirty checkout нельзя выдавать за изолированный комплект выкладки.

Проверки: `OwnerOperationsTests` (отдельный PostgreSQL 127.0.0.1:55433 с OWNER_OPERATIONS_LOCAL_POSTGRES=1), `node tools/test-owner-operations.cjs`, `npm run build:ssr`, браузер 390/768/1280.
