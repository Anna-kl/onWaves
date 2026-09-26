import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/enviroments/environment';

/** Что страница хочет сообщить о себе поисковику. Все поля необязательны: */
/** незаданное поле откатывается к дефолту сайта, а не остаётся от прошлой страницы. */
export interface SeoPageData {
  title?: string;
  description?: string;
  /**
   * Заголовок og/twitter, если он короче document title.
   * На /masters «| OnWaves» остаётся в выдаче и не дублируется в превью.
   */
  shareTitle?: string;
  /** Абсолютный URL картинки для шаринга. */
  image?: string;
  /** true — страница не должна попадать в индекс (личные кабинеты, служебные экраны). */
  noindex?: boolean;
  /** Тип og:type; для карточек бизнеса имеет смысл 'profile'. */
  ogType?: string;
}

const DEFAULT_TITLE = 'OnWaves — онлайн-запись к мастерам и в салоны';
const DEFAULT_DESCRIPTION =
  'OnWaves — бесплатный сервис онлайн-записи: выбирайте мастера или салон, ' +
  'смотрите свободное время и записывайтесь онлайн за минуту.';
/**
 * ВРЕМЕННО: обычный логотип 683x491. Он проходит минимум для крупной карточки
 * (600x315), но правильный размер превью — 1200x630, и логотип на нём смотрится
 * пустовато. Нужен брендированный баннер от дизайнера — заменить только путь.
 */
const DEFAULT_IMAGE = '/assets/img/jpg/logo.jpg';

/** id единственного блока микроразметки — по нему он заменяется, а не дублируется. */
const JSON_LD_ID = 'ld-json-page';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  /**
   * Полностью описывает страницу для поисковика и соцсетей.
   *
   * Вызывается на каждой навигации, поэтому обязана перетирать ВСЕ поля, в том
   * числе возвращать к дефолту те, что страница не задала. Иначе description и
   * og:image от карточки мастера утекают на следующую страницу — SPA не
   * перезагружает документ, теги живут между навигациями.
   */
  public update(url: string, data: SeoPageData = {}): void {
    const pageTitle = data.title?.trim() || DEFAULT_TITLE;
    const pageDesc = data.description?.trim() || DEFAULT_DESCRIPTION;
    const shareTitle = data.shareTitle?.trim() || pageTitle;
    const canonical = this.buildCanonical(url);

    this.writeTitle(pageTitle);
    this.writeMeta('name', 'description', pageDesc);

    this.writeMeta('property', 'og:title', shareTitle);
    this.writeMeta('property', 'og:description', pageDesc);
    this.writeMeta('property', 'og:url', canonical);
    this.writeMeta('property', 'og:type', data.ogType || 'website');
    this.writeMeta('property', 'og:site_name', 'OnWaves');
    this.writeMeta('property', 'og:locale', 'ru_RU');

    const image = this.toAbsolute(data.image) || `${environment.siteUrl}${DEFAULT_IMAGE}`;
    this.writeMeta('property', 'og:image', image);
    this.writeMeta('name', 'twitter:card', 'summary_large_image');
    this.writeMeta('name', 'twitter:title', shareTitle);
    this.writeMeta('name', 'twitter:description', pageDesc);
    this.writeMeta('name', 'twitter:image', image);

    this.setCanonical(canonical);
    this.setRobots(data.noindex === true);
    // Разметка описывает конкретную сущность. Оставить её на следующей странице
    // хуже, чем не иметь вовсе: поисковик увидит структурированные данные,
    // которых нет в контенте. Страница, которой разметка нужна, ставит её сама
    // сразу после update().
    this.setJsonLd(null);
  }

  /**
   * Режим для страниц с асинхронным SEO (карточка бизнеса): трогает только то,
   * что известно из самого URL.
   *
   * Полный update() тут применять нельзя: компонент такой страницы выставляет
   * title/description в ngOnInit, то есть ДО NavigationEnd, и общий обработчик
   * затёр бы уже правильные теги дефолтными. Каноникал же от данных не зависит —
   * его безопасно (и нужно) поставить сразу.
   */
  public updateNavigationOnly(url: string, noindex = false): void {
    const canonical = this.buildCanonical(url);
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.setCanonical(canonical);
    this.setRobots(noindex);
    // JSON-LD не трогаем: NavigationEnd приходит ПОСЛЕ ngOnInit карточки,
    // которая уже поставила разметку. Сброс здесь выкидывал бы её из SSR HTML.
    // Уход на обычную страницу чистит блок через update().
  }

  /**
   * Ставит (или снимает при null) JSON-LD страницы.
   *
   * Держим ровно один блок с известным id: карточка мастера перерисовывается на
   * каждый ответ бэка, и без замены по id разметка накапливалась бы дублями.
   */
  public setJsonLd(data: object | null): void {
    const head = this.doc.head;
    if (!head) return;

    const existing = head.querySelector<HTMLScriptElement>(`script[id="${JSON_LD_ID}"]`);
    if (!data) {
      // Через parentNode, а не existing.remove(): на сервере DOM эмулируется
      // (domino), и полагаться там на методы ChildNode лишний риск.
      if (existing?.parentNode) {
        existing.parentNode.removeChild(existing);
      }
      return;
    }

    const script = existing ?? this.doc.createElement('script');
    if (!existing) {
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', JSON_LD_ID);
      head.appendChild(script);
    }
    // Экранирование '<' обязательно. Содержимое <script> — raw text: при
    // сериализации в HTML оно НЕ экранируется, поэтому «</script>» в поле
    // «о себе» закрыл бы тег и всё, что дальше, попало бы в документ как
    // разметка. Это не только сломанная страница, но и XSS через профиль.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }

  /**
   * Канонический URL: всегда прод-origin + путь без query.
   *
   * Query отбрасывается сознательно — рекламный трафик приходит с utm-метками, а
   * ?action=register открывает модалку регистрации поверх той же главной. Все
   * такие адреса — один документ, и каноникал обязан сводить их к одному.
   */
  private buildCanonical(url: string): string {
    const path = (url.split('#')[0] ?? '').split('?')[0] ?? '';
    const normalized = this.normalizePath(path);
    return `${environment.siteUrl}${normalized}`;
  }

  /** Приводит путь к одной форме: ведущий слэш есть, хвостового нет (кроме корня). */
  private normalizePath(path: string): string {
    let result = path.startsWith('/') ? path : `/${path}`;
    if (result.length > 1 && result.endsWith('/')) {
      result = result.slice(0, -1);
    }
    return result;
  }

  private toAbsolute(url?: string): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    return `${environment.siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
  }

  /**
   * Title.setTitle на SSR (Domino) пишет document.title и не всегда
   * синхронизирует узел <title>. Сериализатор Universal отдаёт элемент из
   * index.html — бот Директа видит каталог, хотя тело страницы уже правильное.
   * Каноникал через querySelector в HTML попадал; title пишем так же.
   */
  private writeTitle(pageTitle: string): void {
    this.title.setTitle(pageTitle);
    const el = this.doc.head?.querySelector('title') ?? this.doc.querySelector('title');
    if (el) {
      el.textContent = pageTitle;
    }
  }

  /**
   * Все совпавшие теги, не только последний: иначе в <head> остаётся первый
   * og:title из index.html, а робот читает его.
   */
  private writeMeta(attr: 'name' | 'property', key: string, content: string): void {
    if (attr === 'name') {
      this.meta.updateTag({ name: key, content });
    } else {
      this.meta.updateTag({ property: key, content });
    }
    const nodes = this.doc.head?.querySelectorAll(`meta[${attr}="${key}"]`);
    nodes?.forEach(node => node.setAttribute('content', content));
  }

  /**
   * Через DOCUMENT, а не document: тег должен оказаться в HTML ещё на SSR.
   * Каноникал, дорисованный только после гидрации, для краулера бесполезен —
   * он читает ответ сервера.
   */
  private setCanonical(href: string): void {
    const head = this.doc.head;
    if (!head) return;

    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  /**
   * noindex снимается явным index,follow, а не удалением тега: при SPA-переходе
   * из кабинета на публичную страницу оставшийся noindex выкинул бы из индекса
   * именно ту страницу, ради которой всё делается.
   */
  private setRobots(noindex: boolean): void {
    this.meta.updateTag({
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow',
    });
  }
}
