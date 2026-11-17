# Запрос бэку: агрегат витрины главной

**Дата:** 27.09.2026. **Фронт:** `src/services/home-showcase.service.ts`, `src/app/pages/main-page.component.*`.
**Статус:** фронт работает без этого эндпоинта, агрегат нужен для скорости.

## Зачем

Новая главная показывает подборку мастеров (`home-showcase.config.ts`), у каждого — цену «от»,
приветственный купон и активную акцию, а ниже — ленту: посты и работы из портфолио, свежие сверху.

Сейчас это собирается из существующих публичных GET:

| Что | Запросы на 7 мастеров |
|---|---|
| Мастера | 1 × `profiles/?type=1&isRecommend=false&skip=0` (есть и на SSR) |
| Цена «от» | 7 × `services/without-group`, 7 × `services/groups`, N × `services/get-by-group` |
| Купон | 7 × `coupons/welcome/offer?masterId=` |
| Акция | 6 × `landing/{profileId}` |
| Лента | 7 × `posts/posts-profile`, 7 × `albums/{id}`, N × `albums/image/{albumId}` |

Всё, кроме первой строки, идёт только из браузера: цены и бейджи — после гидрации,
лента — когда до неё почти долистали. Итого ~40–60 мелких запросов на холодный заход.
Для мобильного трафика это много, для SSR — недопустимо, поэтому на сервере их нет.

## Что нужно

### 1. `GET v1/api/showcase/masters?links=a,b,c`

Публичный, без JWT, кешируемый (`Cache-Control: public, max-age=60`).
Порядок ответа — порядок `links`; скрытые и заблокированные профили выпадают.

```json
[
  {
    "id": "guid",
    "link": "cellings",
    "name": "Натяжные потолки",
    "avatarUrl": "/v1/api/Profiles/{id}/avatar-image",
    "address": { "city": "Кашира", "street": null, "home": null },
    "workLocations": [{ "locationType": 1, "cities": ["Кашира", "Ступино"] }],
    "minPrice": { "value": 900, "isFrom": true, "unit": 3 },
    "coupon": { "maxDiscount": 500, "endsAt": "2026-10-20T13:26:31+03:00", "title": "…", "tiers": [] },
    "promo": { "badge": "Акция недели", "title": "…", "validTo": "2026-11-01T23:59:59+03:00" }
  }
]
```

- `minPrice` — минимум по активным услугам: для диапазона — `startRange`, иначе `price`.
  У части услуг в диапазоне лежит `price = 1` — это мусор, его не брать.
- `coupon` — только если мастер **участвует** в кампании (`masterParticipates`), иначе `null`.
- `promo` — первое активное предложение промо-страницы в окне `validFrom…validTo`, иначе `null`.

### 2. `GET v1/api/showcase/feed?links=a,b,c&skip=0&take=12`

Посты (`Post` без `ParentId`) и медиа портфолио (`ImageProfile`) выбранных профилей одной лентой,
по `DateCreated` убыванию.

```json
[
  {
    "id": "guid",
    "kind": "video | photo | post",
    "dateCreated": "2026-09-15T20:45:49+03:00",
    "text": "подпись или текст поста",
    "url": "https://…/videos/….mp4",
    "thumbUrl": "https://…/covers/….png",
    "albumName": "Светильники",
    "profile": { "id": "guid", "link": "cellings" }
  }
]
```

`albumName` нужен фронту для фильтра: у `mary` на главную идёт только альбом «Депиляция»
(косметология без лицензии в рекламу и на главную не выводится).

## После выкладки

Фронт заменяет внутренности `HomeShowcaseService.getMasters / getMinPrice / getPerks / getFeed`
на два запроса; шаблон и конфиг подборки не меняются. `masters` можно будет отдавать и на SSR
вместе с ценами и бейджами.
