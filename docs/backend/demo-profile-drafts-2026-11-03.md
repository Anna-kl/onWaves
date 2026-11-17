# Демо: черновая длительность, архив и публикация портфолио

Реализовано 03.11.2026 по разрешению Анны для завершения существующего профиля Чекановой. Локальная проверка пройдена; production требует выкладки. Исходные данные/снимки/ID — D:/Project/Onwaves-manage/reports/master-chekanova-update-2026-11-03/.

- Демо-черновик: IsPromo=true AND IsGetOrder!=true. Только здесь можно сохранить ForService Duration=null без IsTimeUnlimited и выбрать формат до подтверждения WorkLocation. Адрес не создаётся автоматически. Активная услуга вне демо требует длительности, кроме явно безлимитной.
- Выход из демо/включение записи отвергается при активных услугах без длительности или настроенного формата. Новые записи дополнительно отвергают архивные/чужие/неполные услуги. История не фильтруется и не переписывается.
- POST services теперь требует Bearer и владения ProfileUserId через ProfileOwnership (UA/BA одной Auth). Front GroupService.saveService передаёт JWT явно. Не добавлять глобальный interceptor для гостей.
- PUT services/archive/{serviceId} {archived:boolean}: owner-only, Pause/Active, без DELETE. GET services/without-group/{profileId} и get-by-group/{groupId}: только Active; includeArchived=true требует Bearer владельца. get-all-services — только Active. ShortServiceView передаёт ServiceStatus, Duration=null остаётся null.
- Albums и Images: IsPublished=true, SortOrder=0 по умолчанию для всех прежних материалов. Публичные GET albums/{profileId}, albums/image/{albumId}, albums/get-service/{serviceId} фильтруют публикацию альбома/фото и сортируют. includeHidden=true на первых двух — owner-only.
- PUT albums/{profileId}/presentation {albums:[{id,isPublished?,sortOrder?}],images:[...]}: owner-only; весь пакет (до 500, без дублей, порядок 0..100000) проверяется до первой правки. Чужой ID отклоняет пакет; файлы/связи/даты не удаляются и не меняются. Скрытие — отсутствие на витрине, не отзыв публичного S3 URL.
- Кеши owner/public имеют разные ключи. После mutation кеш сбрасывается; кабинет перечитывает строго с сервера при открытии. Не переиспользовать shareReplay старого запроса как доказательство сохранения.
- Владелец видит скрытые работы и архивные услуги; может восстановить. Кнопки галереи доступны без hover, высота минимум44 px. Не использовать DELETE для снятия устаревших пакетов.

Для общей БД public адресно добавлены четыре столбца; schema-applied.json. Публичной EF migration history в текущей БД нет, она искусственно не создавалась. Не запускать вслепую все pending миграции. Код миграции DataModel 20261103130000_ProfileMediaPresentation для других согласованных сред. Production-конфигурацию/секреты не заменять локальными.

Порядок выкладки и проверки — deployment-handoff.md в пакете; выкладывать API + browser/Universal согласованно, POST старого клиента без Bearer будет отклонён. Не включать запись/акции автоматически после выкладки.
