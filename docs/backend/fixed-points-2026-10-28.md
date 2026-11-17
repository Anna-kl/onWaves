# Несколько фиксированных точек приёма

Для агента. Фронт уже шлёт и читает этот контракт. Пока методов нет, вторая точка в кабинете не сохранится: старый `POST work-location` для Fixed делает upsert по `(profileId, locationType)` и затирает предыдущий адрес.

Выезд и онлайн не становятся точками. У них по-прежнему одна запись на профиль.

## Нельзя

- Не удалять и не пересоздавать `Schedule` и `DaysOfSchedules`. `Record.DaysOfScheduleId` не перевешивать.
- Не возвращать 409 «профиль на старом графике». Живой `GET schedules/week/{id}` — новая неделя. Ошибка ручки — старый экран. Старый экран не удалять.
- Не трогать промо, купоны, `/cellings`.
- Не переименовывать BA, `grafik`, `IViewSchedule`, `workLocationType`, ключи стора.
- Слоты считает только сервер.
- Услуга «на месте» не получает свою цену на каждой точке. Цена остаётся на услуге. Другая цена — другая услуга.



## Точка

`WorkLocation` для `locationType = 0` (Fixed):

- `id` — guid, обязателен в ответе.
- `title` — необязательное название («Студия на Ленина»).
- адрес как сейчас: `country`, `region`, `city`, `street`, `house`, `apartment`, координаты.

У профиля несколько строк Fixed. У Mobile и Online по-прежнему одна.


| Метод                                             | Смысл                                                                                                          |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `GET profiles/{id}/work-location`                 | массив, в нём все Fixed плюс одна Mobile и одна Online, если включены                                          |
| `POST profiles/{id}/work-location`                | создать точку или формат. Для Fixed каждый POST — новая строка, не upsert. Ответ `201`, в `data` строка с `id` |
| `PUT profiles/{id}/work-location/{locationId}`    | изменить эту строку. Тело — `IWorkLocation` с тем же `id`                                                      |
| `DELETE profiles/{id}/work-location/{locationId}` | удалить точку. Если есть будущие записи — отказ и текст, который можно показать мастеру                        |


Повторный POST Mobile или Online по-прежнему обновляет единственную строку этого формата.

## Услуга

Поле `fixedPointIds: guid[]` только при `workLocationType = Fixed`.

- Id — точки этого профиля.
- Несколько точек и пустой список — ошибка сохранения.
- Одна точка и пустой список — сервер сам проставляет её id.
- Выезд и онлайн поле не используют.

`GET` услуг возвращает `fixedPointIds`. Старые услуги Fixed при миграции получают id единственной точки.

## График и слоты

Необязательный `pointId`:

- query: `GET schedules/week/{profileId}`, `GET schedules/template/{profileId}`, `GET schedules/days-in-month`, `DELETE schedules/day/{profileId}`
- тело: `PUT schedules/day/{profileId}`, `PUT schedules/template/{profileId}`, `PUT schedules/template/{profileId}/weekday`, `PUT schedules/rhythm/{profileId}`, `POST services/get-free-slot/{id}`, `POST services/get-free-slot-detailed/{id}`

Для Fixed `pointId` обязателен, если точек больше одной. Пустой `pointId` — график выезда и онлайна.

Уникальность шаблона недели: `(ProfileUserId, PointId, DayOfWeek)`. `PointId = null` — график профиля.

`GET schedules/week/{profileId}` без `pointId` по-прежнему отвечает 200, если новая неделя жива. По этому ответу фронт решает, можно ли добавить вторую точку. Старые карточки графика по точкам не делятся.

## Запись

`RecordLocation` для «на месте» хранит `workLocationId` и снимок адреса (`title`, `country`, `region`, `city`, `street`, `house`, `apartment`). Фронт шлёт их сам. Для выезда по-прежнему адрес клиента и `locationType = 1`, без `workLocationId`. Для онлайна локация может быть пустой.

Одна запись — одна точка. Услуги в ней должны быть доступны на этой точке.

Журнал (`get-ba-schedule`) отдаёт `location` у записи, чтобы карточка показала точку.

## Миграция

Строки дней и записи не двигать.

1. Существующей строке Fixed выдать `id`.
2. Услуги Fixed этого профиля привязать к этому id.
3. Если Fixed есть — текущий график профиля повесить на эту точку (`PointId` шаблона и новых дат). Если мастер только на выезде или онлайн — график остаётся с пустым `PointId`.

