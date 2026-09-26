/**
 * Панель калькулятора — фиксированный слой между шапкой `.hmenu` и нижним меню `.mob-nav`.
 * По горизонтали: на десктопе — над правой колонкой профиля, на мобилке — во всю ширину.
 *
 * По вертикали панель от прокрутки страницы **не зависит**: верх всегда под шапкой,
 * низ — `bottom`, а не рассчитанная высота. Раньше верх шёл за колонкой и пересчитывался
 * на каждом scroll, панель ездила вслед за страницей с отставанием в кадр; высота
 * из innerHeight прыгала при сворачивании адресной строки на телефоне.
 *
 * Вызывать при открытии и на resize. На scroll вызывать не нужно.
 */
export function pinCalculatorStage(el: HTMLElement, doc: Document): void {
  const desktop = window.matchMedia('(min-width: 769px)').matches;
  const top = headerBottom(doc);
  const bottom = footerInset(doc);
  const right = doc.querySelector('.ba-profile-layout__right, .ba122-right-column') as HTMLElement | null;
  const layout = doc.querySelector('.ba-profile-layout') as HTMLElement | null;
  let left = 0;
  let width = window.innerWidth;

  if (desktop && right && getComputedStyle(right).display !== 'contents') {
    const box = right.getBoundingClientRect();
    left = box.left;
    width = visibleSize(box.width, box.right - box.left);
  } else if (layout) {
    const box = layout.getBoundingClientRect();
    left = Math.max(box.left, 0);
    width = Math.min(visibleSize(box.width, box.right - box.left) || window.innerWidth, window.innerWidth);
  }

  // Chrome часто отдаёт 0×0, пока колонка ещё не сложена — панель тогда «не открывается».
  if (width < 160) {
    left = 0;
    width = window.innerWidth;
  }

  setStyle(el, 'position', 'fixed');
  setStyle(el, 'left', `${Math.round(left)}px`);
  setStyle(el, 'top', `${Math.round(top)}px`);
  setStyle(el, 'right', 'auto');
  setStyle(el, 'bottom', `${Math.round(bottom)}px`);
  setStyle(el, 'width', `${Math.round(width)}px`);
  setStyle(el, 'height', 'auto');
  setStyle(el, 'min-height', '240px');
  setStyle(el, 'max-width', '100vw');
  // Выше шапки (.hmenu 1500): крестик в правом верхнем углу колонки
  // иначе кликается в фиксированное меню, а не в закрытие.
  setStyle(el, 'z-index', '2100');
}

/** Пишем только изменившееся: пересчёт на resize не трогает стили зря. */
function setStyle(el: HTMLElement, prop: string, value: string): void {
  if (el.style.getPropertyValue(prop) !== value) {
    el.style.setProperty(prop, value);
  }
}

/** Якорь в исходном родителе: иначе *ngIf не снимает хост с body — крестик «мёртвый». */
export function liftStageToBody(el: HTMLElement, doc: Document, mark: Comment | null): Comment {
  if (!mark?.parentNode) {
    mark = doc.createComment('ow-calc-stage');
    el.parentNode?.insertBefore(mark, el);
  }
  if (el.parentElement !== doc.body) {
    doc.body.appendChild(el);
  }
  return mark;
}

export function restoreStageHome(el: HTMLElement, mark: Comment | null): void {
  if (mark?.parentNode) {
    mark.parentNode.insertBefore(el, mark);
    mark.parentNode.removeChild(mark);
    return;
  }
  el.remove();
}

function visibleSize(a: number, b: number): number {
  return Math.max(a || 0, b || 0);
}

function headerBottom(doc: Document): number {
  const bar = doc.querySelector('.hmenu') as HTMLElement | null;
  if (!bar) {
    return 0;
  }
  const box = bar.getBoundingClientRect();
  if (box.height <= 0) {
    return 0;
  }
  return Math.max(Math.round(box.bottom), 0);
}

/** Сколько пикселей снизу занимает видимое нижнее меню. Скрытое (≥640px) — 0. */
function footerInset(doc: Document): number {
  const nav = doc.querySelector('.mob-nav') as HTMLElement | null;
  if (!nav || getComputedStyle(nav).display === 'none') {
    return 0;
  }
  const box = nav.getBoundingClientRect();
  if (box.height <= 0 || box.top >= window.innerHeight) {
    return 0;
  }
  return Math.max(Math.round(window.innerHeight - box.top), 0);
}

let scrollLocks = 0;
let savedScroll: { htmlOverflow: string; bodyOverflow: string; bodyPadding: string } | null = null;

/**
 * Пока панель открыта, страница под ней не прокручивается: колесо и свайп по панели
 * иначе уводят страницу (на телефоне — ещё и прячут адресную строку), а после закрытия
 * клиент оказывается в другом месте. Ширину полосы прокрутки возвращаем отступом, как
 * это делает NgbModal, — иначе колонка под панелью сдвигается.
 *
 * Счётчик: заглушка «Загружаю вопросы…» и плеер могут держать блокировку одновременно.
 * Возвращает функцию снятия; повторный вызов снятия безопасен.
 */
export function lockPageScroll(doc: Document): () => void {
  const html = doc.documentElement;
  const body = doc.body;
  if (scrollLocks === 0) {
    const gap = Math.max(window.innerWidth - html.clientWidth, 0);
    savedScroll = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPadding: body.style.paddingRight,
    };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (gap > 0) {
      body.style.paddingRight = `${gap}px`;
    }
  }
  scrollLocks++;
  let released = false;
  return () => {
    if (released) {
      return;
    }
    released = true;
    scrollLocks = Math.max(scrollLocks - 1, 0);
    if (scrollLocks === 0 && savedScroll) {
      html.style.overflow = savedScroll.htmlOverflow;
      body.style.overflow = savedScroll.bodyOverflow;
      body.style.paddingRight = savedScroll.bodyPadding;
      savedScroll = null;
    }
  };
}
