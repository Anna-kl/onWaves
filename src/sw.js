self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

/** Убираем undefined — Chrome/Android иногда капризничают с лишними ключами */
function compact(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

/**
 * Парсинг тела push. Ожидаемые форматы с бэкенда:
 * 1) { "notification": { "title", "body", "icon", "image", "badge", "tag", ... }, "data": { "url": "/path" } }
 * 2) Плоский объект с title/body (как раньше)
 *
 * «Красивее» на телефоне: image (большая картинка в шторке Android), badge (монохромная иконка в статус-баре),
 * tag + renotify (группировка), vibrate, actions (кнопки «Открыть» / «Позже»).
 */
function parsePushPayload(event) {
  const defaults = {
    title: 'OnWaves',
    body: '',
    options: {
      icon: '/assets/icons/icon-192x192.png',
      badge: '/assets/icons/maskable-192x192.png',
      data: {},
    },
  };

  if (!event.data) {
    return defaults;
  }

  try {
    const p = event.data.json();
    const n = p.notification ?? p;

    const rootData =
      p.data != null && typeof p.data === 'object' && !Array.isArray(p.data) ? p.data : {};
    const nestedData =
      n.data != null && typeof n.data === 'object' && !Array.isArray(n.data) ? n.data : {};
    const mergedData = { ...rootData, ...nestedData };

    const title = n.title || p.title || defaults.title;
    const body = n.body || p.body || '';

    const options = compact({
      body,
      icon: n.icon || p.icon || defaults.options.icon,
      badge: n.badge || p.badge || defaults.options.badge,
      image: n.image || p.image,
      tag: n.tag || p.tag,
      renotify: n.renotify ?? p.renotify,
      requireInteraction: n.requireInteraction ?? p.requireInteraction,
      silent: n.silent ?? p.silent,
      vibrate: n.vibrate || p.vibrate,
      timestamp: n.timestamp || p.timestamp,
      actions: n.actions || p.actions,
      lang: n.lang || p.lang,
      dir: n.dir || p.dir,
      data: mergedData,
    });

    return { title, options };
  } catch {
    const text = event.data.text();
    return {
      title: defaults.title,
      options: compact({
        body: text,
        icon: defaults.options.icon,
        badge: defaults.options.badge,
        data: {},
      }),
    };
  }
}

self.addEventListener('push', (event) => {
  event.waitUntil(
    (async () => {
      const { title, options } = parsePushPayload(event);
      await self.registration.showNotification(title, options);
    })()
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  let url = typeof data.url === 'string' ? data.url : '/';
  /* Опционально с бэкенда: data.actionUrls: { "reply": "/chat/5", "dismiss": "/" } под id из actions[].action */
  if (event.action && data.actionUrls && typeof data.actionUrls === 'object' && data.actionUrls[event.action]) {
    url = data.actionUrls[event.action];
  }

  const fullUrl = new URL(url, self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const w = clients[0];
      if (w && 'navigate' in w) {
        return w.navigate(fullUrl).then(() => w.focus());
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(fullUrl);
      }
    })
  );
});
