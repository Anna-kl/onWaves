self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let n = { title: 'Notification', body: '' };

    if (event.data) {
      try {
        const p = event.data.json();            // попытаемся как JSON
        n = p.notification ?? p;
      } catch {
        const text = event.data.text();         // иначе как обычный текст
        n = { title: 'Notification', body: text };
      }
    }

    await self.registration.showNotification(n.title || 'Notification', {
      body: n.body || '',
      icon: n.icon || '/assets/icons/icon-192x192.png',
      data: n.data,
      actions: n.actions
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clients => clients[0]?.focus() && clients[0].navigate(url) || self.clients.openWindow(url))
  );
});