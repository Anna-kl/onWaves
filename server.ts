import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as compression from 'compression';
import * as express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { request as httpsRequest } from 'node:https';
import { basename, join } from 'node:path';
import { URL } from 'node:url';
import { AppServerModule } from './src/main.server';

/**
 * Кеш готового HTML для SSR-рендера.
 *
 * Замер до правки: холодный рендер профиля отдавал TTFB 13.1 с, повторные —
 * 1.7-2.2 с. Рекламный трафик идёт по длинному хвосту уникальных URL, поэтому
 * почти каждый заход был холодным. При этом на сервере нет ни cookie, ни
 * localStorage: ngx-cookie-service читает пустой document.cookie, значит SSR
 * всегда рендерит анонимную версию страницы и она одинакова для всех.
 */
const SSR_CACHE_TTL_MS = 60_000;
const SSR_CACHE_MAX_ENTRIES = 500;
const ssrCache = new Map<string, { html: string; expiresAt: number }>();

/**
 * Роуты записи кешировать нельзя: их содержимое — свободные слоты, они разбираются
 * быстрее, чем живёт кеш. Отданный из кеша HTML показывал слоты, которых уже нет,
 * а браузер после гидрации дорисовывал «нет доступных слотов» — на экране оказывались
 * оба состояния сразу.
 */
const SSR_CACHE_SKIP = [/\/choose-date(\/|\?|$)/, /\/confirm-record2?(\/|\?|$)/];
const INDEX_HTML_TITLE = 'OnWaves — онлайн-запись к мастерам и в салоны красоты';
const CELLINGS_SHELL_TITLE =
  'Натяжные потолки — Кашира, Ступино, Озёры, Коломна и Домодедово — OnWaves';
const CELLINGS_SHELL_DESCRIPTION =
  'Натяжные потолки в Кашире, Ступино, Озёрах, Коломне и Домодедове: рассчитайте смету по прайсу мастера и запишитесь на бесплатный замер.';
const RESERVED_PROFILE_SLUGS = new Set([
  'catalog', 'landing', 'masters', 'search', 'static', 'ba-edit',
  'profilebisacc', 'cabinet-ba', 'sitemap.xml', 'robots.txt',
]);

function ssrPathname(url: string): string {
  const path = (url.split('#')[0] ?? '').split('?')[0] || '/';
  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
}

function isCellingsSsrPath(url: string): boolean {
  return ssrPathname(url) === '/cellings';
}

function ssrCacheKey(url: string): string {
  return isCellingsSsrPath(url) ? ssrPathname(url) : url;
}

function isSsrCacheable(url: string): boolean {
  return !SSR_CACHE_SKIP.some(pattern => pattern.test(url));
}

/** Пустой первый HTML /cellings минуту кормил бы бота каталожным title. */
function ssrTitle(html: string): string {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
}

function isCatalogHead(html: string): boolean {
  const title = ssrTitle(html);
  return !title || title === INDEX_HTML_TITLE || /салоны красоты/i.test(title);
}

function isPublicProfileSsrPath(url: string): boolean {
  const path = ssrPathname(url);
  const parts = path.split('/').filter(Boolean);
  if (parts.length !== 1) {
    return false;
  }
  return !RESERVED_PROFILE_SLUGS.has(parts[0].toLowerCase());
}

/** Класс в CSS-бандле не считаем: ищем узел скелетона в body. */
function hasLandingSkeleton(html: string): boolean {
  return /<[^>]*class=["'][^"']*landing-skel/i.test(html);
}

function ssrH1Text(html: string): string {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) {
    return '';
  }
  return match[1].replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Минутный HTML-кеш нельзя кормить оболочкой без профиля: робот и реклама
 * получают каталожный title, ноль h1 и skeleton, а браузер уже дорисовал карточку.
 * /cellings — свой контракт оффера; остальные публичные slug — имя в h1.
 */
function canCacheSsrHtml(url: string, html: string): boolean {
  if (isCellingsSsrPath(url)) {
    if (isCatalogHead(html)) {
      return false;
    }
    return /<h1[\s>]/i.test(html) && html.includes('Рассчитать стоимость');
  }
  if (!isPublicProfileSsrPath(url)) {
    return true;
  }
  if (isCatalogHead(html) || hasLandingSkeleton(html)) {
    return false;
  }
  const heading = ssrH1Text(html);
  if (!heading) {
    return false;
  }
  const title = ssrTitle(html);
  return title.includes(heading);
}

function replaceMetaContent(
  html: string,
  attr: 'name' | 'property',
  key: string,
  content: string,
): string {
  const re = new RegExp(`${attr}="${key}" content="[^"]*"`, 'gi');
  return html.replace(re, `${attr}="${key}" content="${content}"`);
}

/** Страховка: если SeoService не сериализовал <head>, бот не должен видеть каталог. */
function patchCellingsHead(html: string): string {
  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${CELLINGS_SHELL_TITLE}</title>`);
  out = replaceMetaContent(out, 'property', 'og:title', CELLINGS_SHELL_TITLE);
  out = replaceMetaContent(out, 'property', 'og:description', CELLINGS_SHELL_DESCRIPTION);
  out = replaceMetaContent(out, 'name', 'description', CELLINGS_SHELL_DESCRIPTION);
  out = replaceMetaContent(out, 'name', 'twitter:title', CELLINGS_SHELL_TITLE);
  out = replaceMetaContent(out, 'name', 'twitter:description', CELLINGS_SHELL_DESCRIPTION);
  return out;
}

/**
 * Канонический хост. Дублирует environment.prod.siteUrl намеренно: server.ts
 * сам environment не импортирует (карта сайта и 301 не должны зависеть от
 * fileReplacements). При смене домена править оба места.
 */
const SITE_URL = 'https://onwaves.online';

/** Хосты, которые отвечают тем же приложением, но индексироваться не должны. */
const NOINDEX_HOSTS = ['ssr.onwaves.online'];

/** Публичные статические маршруты витрины для sitemap. */
const SITEMAP_ROUTES: { path: string; changefreq: string; priority: string }[] = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/landing', changefreq: 'monthly', priority: '0.8' },
  { path: '/masters', changefreq: 'monthly', priority: '0.8' },
  { path: '/search/extsearch', changefreq: 'weekly', priority: '0.7' },
  { path: '/catalog', changefreq: 'daily', priority: '0.6' },
  { path: '/static/oservice', changefreq: 'monthly', priority: '0.5' },
  { path: '/static/help', changefreq: 'monthly', priority: '0.5' },
];

/**
 * Список публичных карточек мастеров (бэк, 2026-07-29).
 *
 * Хост API дублирует environment.prod.Uri по той же причине, что и SITE_URL:
 * server.ts собирается отдельным таргетом и импорт environment притащил бы
 * сюда localhost из дев-конфига.
 */
const SITEMAP_API_URL = 'https://onwaves-server.online/v1/api/Profiles/sitemap';
const SITEMAP_PAGE_SIZE = 1000;
/** Потолок страниц — страховка от бесконечного цикла, если бэк однажды начнёт
 *  отдавать полную страницу бесконечно. 60 x 1000 = 60 000 карточек. */
const SITEMAP_MAX_PAGES = 60;
const SITEMAP_FETCH_TIMEOUT_MS = 10_000;
const SITEMAP_CACHE_TTL_MS = 60 * 60 * 1000;

interface SitemapProfile {
  link: string;
  name: string | null;
  lastModified: string | null;
}

let sitemapCache: { profiles: SitemapProfile[]; expiresAt: number } | null = null;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** `<lastmod>` принимает только валидную дату — мусор из БД молча пропускаем. */
function normalizeLastmod(value: string | null | undefined): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

/**
 * Сегмент публичного URL карточки. Тот же критерий, что у каноникала профиля:
 * один кусок пути без / ? # : и пробелов. GUID и «https://…» в карту не кладём —
 * такие адреса не открываются через translate-link.
 */
function isPlainProfileLink(link: string): boolean {
  if (!link || link.length > 120 || /[\/:?#\s]/.test(link)) return false;
  return !RESERVED_PROFILE_SLUGS.has(link.toLowerCase());
}

function extractSitemapItems(body: any): { items: any[]; totalCount: number | null } {
  const raw = body?.data?.items ?? body?.items;
  const items = Array.isArray(raw) ? raw : [];
  const total = Number(body?.data?.totalCount ?? body?.totalCount);
  return { items, totalCount: Number.isFinite(total) ? total : null };
}

/**
 * JSON по HTTPS через node:https, без fetch и AbortSignal.timeout.
 * На части хостов (iisnode, старый Node) fetch либо нет, либо падает так,
 * что карта сайта отвечала 500 — а это хуже пустой витрины: робот надолго
 * откладывает повторный обход.
 */
function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = httpsRequest(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: `${parsed.pathname}${parsed.search}`,
        method: 'GET',
        headers: { Accept: 'application/json' },
      },
      res => {
        const status = res.statusCode ?? 0;
        if (status >= 400) {
          res.resume();
          reject(new Error(`${url} -> HTTP ${status}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
          } catch (err) {
            reject(err);
          }
        });
      },
    );
    req.setTimeout(SITEMAP_FETCH_TIMEOUT_MS, () => {
      req.destroy(new Error(`timeout ${SITEMAP_FETCH_TIMEOUT_MS}ms: ${url}`));
    });
    req.on('error', reject);
    req.end();
  });
}

async function fetchProfileLinks(): Promise<SitemapProfile[]> {
  const collected: SitemapProfile[] = [];
  const seen = new Set<string>();

  for (let page = 1; page <= SITEMAP_MAX_PAGES; page++) {
    const url = `${SITEMAP_API_URL}?page=${page}&pageSize=${SITEMAP_PAGE_SIZE}`;
    const body = await fetchJson(url);
    const { items, totalCount } = extractSitemapItems(body);

    for (const item of items) {
      const link = typeof item?.link === 'string' ? item.link.trim() : '';
      if (!isPlainProfileLink(link)) continue;
      // Бэк сравнивает ссылки без учёта регистра, поэтому «Anna» и «anna» —
      // одна карточка. Дедуплицируем по нижнему регистру, чтобы один и тот же
      // мастер не попал в карту дважды.
      const key = link.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const name = typeof item?.name === 'string' ? item.name.trim() : '';
      collected.push({
        link,
        name: name || null,
        lastModified: normalizeLastmod(item?.lastModified),
      });
    }

    if (items.length === 0) {
      return collected;
    }
    if (totalCount != null && collected.length >= totalCount) {
      return collected;
    }
    // Нет totalCount и страница короче запрошенной — это конец. Если бэк
    // молча режет pageSize (отдаёт 5 при запросе 1000), без totalCount
    // хвост потеряется; тогда смотрим totalCount выше.
    if (totalCount == null && items.length < SITEMAP_PAGE_SIZE) {
      return collected;
    }
  }

  console.warn(`[sitemap] достигнут потолок ${SITEMAP_MAX_PAGES} страниц — список обрезан`);
  return collected;
}

async function getSitemapProfiles(): Promise<SitemapProfile[]> {
  if (sitemapCache && sitemapCache.expiresAt > Date.now()) {
    return sitemapCache.profiles;
  }

  try {
    const profiles = await fetchProfileLinks();
    sitemapCache = { profiles, expiresAt: Date.now() + SITEMAP_CACHE_TTL_MS };
    console.info(`[sitemap] собран: ${profiles.length} карточек + ${SITEMAP_ROUTES.length} статических`);
    return profiles;
  } catch (error) {
    console.error('[sitemap] не удалось получить список профилей', error);
    return [];
  }
}

function renderSitemap(profiles: SitemapProfile[]): string {
  // У статики нет честной даты правки. «Сегодня» на каждом обходе
  // говорило бы роботу, что эти страницы меняются ежедневно.
  const staticUrls = SITEMAP_ROUTES.map(
    route =>
      `  <url>\n` +
      `    <loc>${SITE_URL}${route.path}</loc>\n` +
      `    <changefreq>${route.changefreq}</changefreq>\n` +
      `    <priority>${route.priority}</priority>\n` +
      `  </url>`,
  );

  const profileUrls = profiles.map(profile => {
    // encodeURIComponent — на случай ссылок с кириллицей или пробелами: в <loc>
    // адрес обязан быть уже экранированным. escapeXml — поверх, для '&' и '<'.
    const loc = `${SITE_URL}/${escapeXml(encodeURIComponent(profile.link))}`;
    const lastmod = profile.lastModified
      ? `    <lastmod>${profile.lastModified}</lastmod>\n`
      : '';
    return (
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      lastmod +
      `    <changefreq>weekly</changefreq>\n` +
      `    <priority>0.9</priority>\n` +
      `  </url>`
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${[...staticUrls, ...profileUrls].join('\n')}\n</urlset>\n`;
}

function renderHtmlCatalog(profiles: SitemapProfile[]): string {
  const items = profiles
    .map(profile => {
      const href = `${SITE_URL}/${encodeURIComponent(profile.link)}`;
      const label = escapeHtml(profile.name || profile.link);
      return `      <li><a href="${escapeHtml(href)}">${label}</a></li>`;
    })
    .join('\n');

  const list = items
    ? `<ul>\n${items}\n    </ul>`
    : '<p>Карточки мастеров скоро появятся.</p>';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Каталог мастеров — онлайн-запись | OnWaves</title>
  <meta name="description" content="Все публичные страницы мастеров и салонов OnWaves. Откройте карточку и запишитесь онлайн.">
  <link rel="canonical" href="${SITE_URL}/catalog">
  <meta name="robots" content="index, follow">
  <style>
    body { font-family: Montserrat, system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 20px; color: #11142D; }
    h1 { font-size: 1.6rem; }
    a { color: #2F9E8F; }
    ul { line-height: 1.8; padding-left: 1.2em; }
  </style>
</head>
<body>
  <p><a href="${SITE_URL}/">OnWaves</a></p>
  <h1>Каталог мастеров</h1>
  <p>Публичные страницы мастеров и салонов. Запись онлайн без звонков.</p>
  ${list}
</body>
</html>
`;
}

/**
 * XML карты сайта. Отказ бэка не роняет карту: отдаём витрину без карточек.
 * 500 здесь хуже неполной карты — робот, получив ошибку, надолго откладывает обход.
 */
async function buildSitemap(): Promise<string> {
  return renderSitemap(await getSitemapProfiles());
}

async function buildHtmlCatalog(): Promise<string> {
  return renderHtmlCatalog(await getSitemapProfiles());
}

function sendSitemapSafely(
  res: express.Response,
  type: string,
  body: string,
): void {
  if (res.headersSent) return;
  res.type(type).set('Cache-Control', 'public, max-age=3600').send(body);
}

function requestHost(hostHeader: string | undefined): string {
  return (hostHeader ?? '').split(':')[0].toLowerCase();
}

function isNoindexHost(hostHeader: string | undefined): boolean {
  return NOINDEX_HOSTS.includes(requestHost(hostHeader));
}

/**
 * Хосты, которые обязаны схлопываться в канонический 301-м редиректом.
 *
 * www и apex — для поисковика два РАЗНЫХ сайта с одинаковым содержимым.
 * Одного canonical мало: он лишь подсказка, вес по внешним ссылкам на www
 * при этом размазывается между двумя адресами. 301 переносит его целиком.
 *
 * ssr-хост сюда НЕ входит: он должен остаться доступен для отладки, от
 * индексации его закрывают robots.txt и X-Robots-Tag.
 */
const REDIRECT_TO_CANONICAL_HOSTS = ['www.onwaves.online'];

function readSsrCache(key: string): string | null {
  const hit = ssrCache.get(key);
  if (!hit) {
    return null;
  }
  if (hit.expiresAt <= Date.now()) {
    ssrCache.delete(key);
    return null;
  }
  // Map хранит ключи в порядке вставки — переставляем в конец, чтобы вытеснялись
  // действительно давно не запрашивавшиеся страницы, а не просто старые.
  ssrCache.delete(key);
  ssrCache.set(key, hit);
  return hit.html;
}

function writeSsrCache(key: string, html: string): void {
  if (ssrCache.size >= SSR_CACHE_MAX_ENTRIES) {
    const oldest = ssrCache.keys().next();
    if (!oldest.done) {
      ssrCache.delete(oldest.value);
    }
  }
  ssrCache.set(key, { html, expiresAt: Date.now() + SSR_CACHE_TTL_MS });
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/MainSiteOcpio/browser');
  const hasOriginalIndex = existsSync(join(distFolder, 'index.original.html'));
  const indexHtml = hasOriginalIndex ? 'index.original.html' : 'index';
  const indexFile = hasOriginalIndex ? 'index.original.html' : 'index.html';

  // ИЗМЕРЕНО: nginx перед этим сервером гзипует только text/html (дефолтный
  // gzip_types), поэтому main.js уходил в браузер как 3 338 286 байт сырыми,
  // styles.css — 626 006. Сжимаем на стороне Express, тогда конфигурация nginx
  // роли не играет: gzip даёт 4.1 МБ -> 0.92 МБ на первый экран.
  server.use(compression());

  // www -> apex, 301 и с сохранением пути и query. Стоит выше всего
  // остального: незачем рендерить страницу хосту, ответ которому — редирект.
  server.use((req, res, next) => {
    if (REDIRECT_TO_CANONICAL_HOSTS.includes(requestHost(req.headers.host))) {
      res.redirect(301, `${SITE_URL}${req.originalUrl}`);
      return;
    }
    next();
  });

  // Страховка к robots.txt для стейджинга: Disallow запрещает обход, но URL,
  // которые робот уже знает, из индекса выбивает именно заголовок.
  server.use((req, res, next) => {
    if (isNoindexHost(req.headers.host)) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }
    next();
  });

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Обе точки обязаны стоять ВЫШЕ обработчика '*.*': он отдаёт статику и на
  // отсутствующий файл отвечает 404, то есть перехватил бы sitemap.xml, а на
  // robots.txt отдал бы файл из dist без учёта хоста.
  server.get('/sitemap.xml', (_req, res) => {
    buildSitemap()
      .then(xml => sendSitemapSafely(res, 'application/xml', xml))
      .catch(error => {
        // Сюда попасть можно только на непредвиденной ошибке рендера.
        // Всё равно отдаём витрину с кодом 200: 500 на sitemap.xml для
        // Google и Яндекса значит «карты нет», и они долго не возвращаются.
        console.error('[sitemap] непредвиденная ошибка', error);
        sendSitemapSafely(res, 'application/xml', renderSitemap([]));
      });
  });

  // HTML-каталог — второй уровень ссылок для роботов, которые карту XML
  // ещё не забрали или плохо по ней ходят (Яндекс особенно любит живой HTML).
  // Маршрут обязан стоять выше catch-all /:id, иначе Angular решит, что
  // «catalog» — это slug мастера.
  server.get('/catalog', (_req, res) => {
    buildHtmlCatalog()
      .then(html => sendSitemapSafely(res, 'html', html))
      .catch(error => {
        console.error('[catalog] непредвиденная ошибка', error);
        sendSitemapSafely(res, 'html', renderHtmlCatalog([]));
      });
  });
  server.get('/sitemap.html', (_req, res) => {
    res.redirect(301, `${SITE_URL}/catalog`);
  });

  server.get('/robots.txt', (req, res, next) => {
    // Стейджинг отдаёт тот же контент, что и прод. Без этого он утащил бы в
    // индекс полный дубль сайта, а каноникал прода не помог бы: он ссылается
    // на другой хост, и до его учёта страницу всё равно надо обойти.
    if (isNoindexHost(req.headers.host)) {
      res
        .type('text/plain')
        .set('Cache-Control', 'no-store')
        .send('User-agent: *\nDisallow: /\n');
      return;
    }
    // Прод — отдаём собранный src/robots.txt через статику ниже.
    next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
      setHeaders: (res, filePath) => {
        // maxAge:'1y' безопасен только для файлов с хешем в имени. Раньше он
        // распространялся и на sw.js с манифестом — а это ровно те файлы,
        // которым нельзя залипать: браузер обновляет service worker, сверяя
        // скрипт с сервером, и застрявшая копия означает, что после деплоя
        // push-подписка живёт на старом воркере. В .htaccess (Apache-хост) эти
        // исключения были, на Node-хосте их не было.
        const name = basename(filePath).toLowerCase();
        const neverCache = [
          'sw.js',
          'ngsw-worker.js',
          'ngsw.json',
          'manifest.webmanifest',
          'index.html',
          'index.original.html',
        ];
        if (neverCache.includes(name)) {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      },
    }),
    (req, res) => {
      // Never render index.html for a missing JS/CSS/image request. Returning
      // the Angular shell with status 200 makes browsers reject it as a module
      // because its real MIME type is text/html.
      res
        .status(404)
        .set('Cache-Control', 'no-store')
        .type('text/plain')
        .send(`Static asset not found: ${req.path}`);
    }
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const startedAt = Date.now();
    const cacheKey = ssrCacheKey(req.originalUrl);
    const cacheable = isSsrCacheable(cacheKey);
    const cached = cacheable ? readSsrCache(cacheKey) : null;
    if (cached) {
      const ms = Date.now() - startedAt;
      // TTFB для кеш-хита: время до отдачи готового HTML (обычно единицы мс).
      console.info(`[SSR] HIT  ${req.originalUrl} ${ms}ms`);
      res.status(200)
        .set('X-SSR-Cache', 'HIT')
        .set('Server-Timing', `ssr;desc="cache-hit";dur=${ms}`)
        .send(cached);
      return;
    }

    res.render(
      indexHtml,
      { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] },
      (error, html) => {
        const ms = Date.now() - startedAt;
        if (!error) {
          // TTFB холодного рендера = время Angular Universal (весь SSR-водопад
          // API-запросов). Именно этот показатель ловим против цели «профиль ≤3с».
          console.info(`[SSR] ${cacheable ? 'MISS' : 'SKIP'} ${req.originalUrl} ${ms}ms`);

          // Компонент мог выставить статус через токен RESPONSE — так страница
          // несуществующей карточки отдаёт 404 (см. profileba.component).
          // Безусловный status(200) затирал бы его, и для поисковика это был бы
          // soft 404: пустая страница с кодом «всё в порядке».
          const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 200;

          let out = html;
          if (status === 200 && isCellingsSsrPath(req.originalUrl) && isCatalogHead(out)) {
            out = patchCellingsHead(out);
          }

          // Кешируем только удачные ответы: иначе один 404 залип бы на минуту
          // и раздавался бы дальше уже с кодом 200 из ветки кеш-хита выше.
          if (cacheable && status === 200 && canCacheSsrHtml(cacheKey, out)) {
            writeSsrCache(cacheKey, out);
          }
          res.status(status)
            .set('X-SSR-Cache', cacheable && status === 200 ? 'MISS' : 'SKIP')
            .set('Server-Timing', `ssr;desc="render";dur=${ms}`)
            .send(out);
          return;
        }

        // SSR is an optimisation, not a reason to make the route unavailable.
        // If an upstream API times out, return the browser shell and let Angular
        // load the data after hydration instead of leaking a 5xx to the proxy.
        console.error(`[SSR] FAIL ${req.originalUrl} ${ms}ms; using CSR fallback`, error);
        const fallbackFile = join(distFolder, indexFile);
        if (isCellingsSsrPath(req.originalUrl)) {
          try {
            const shell = patchCellingsHead(readFileSync(fallbackFile, 'utf8'));
            res.status(200)
              .type('html')
              .set('X-SSR-Cache', 'FALLBACK')
              .set('Server-Timing', `ssr;desc="csr-fallback";dur=${ms}`)
              .send(shell);
            return;
          } catch (readError) {
            console.error('[SSR] cellings shell title patch failed', readError);
          }
        }
        res.status(200)
          .set('X-SSR-Cache', 'FALLBACK')
          .set('Server-Timing', `ssr;desc="csr-fallback";dur=${ms}`)
          .sendFile(fallbackFile);
      }
    );
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
