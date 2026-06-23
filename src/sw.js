const CACHE_NAME = 'onwaves-cache-v2';

// Основные файлы для прекеша (чтобы работало без интернета)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/img/favicons/favicon.ico'
];

self.addEventListener('install', function(event) {
  self.skipWaiting(); // Форсируем установку нового воркера
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', function(event) {
  // Очистка старых кешей при обновлении версии CACHE_NAME
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// === ЛОГИКА ОПТИМИЗАЦИИ И КЕШИРОВАНИЯ ===
self.addEventListener('fetch', function(event) {
  const request = event.request;

  // Кешируем только базовые GET-запросы к нашему домену
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Стратегия 1: Network First для HTML (чтобы Ангуляр всегда обновлялся)
  if (request.mode === 'navigate' || request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(function(networkResponse) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(request, responseClone);
          });
          return networkResponse;
        })
        .catch(function() {
          // Если нет сети, отдаем сохраненный HTML
          return caches.match(request);
        })
    );
    return;
  }

  // Стратегия 2: Stale-While-Revalidate для JS, CSS и картинок
  event.respondWith(
    caches.match(request).then(function(cachedResponse) {
      const fetchPromise = fetch(request).then(function(networkResponse) {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(function(error) {
        // Заглушка, чтобы не падало, если нет ни сети, ни кеша
        console.warn('Fetch failed, no cache fallback for:', request.url);
      });

      // Мгновенно отдаем кеш, а в фоне качаем свежую версию
      return cachedResponse || fetchPromise;
    })
  );
});

// === ЛОГИКА PUSH-УВЕДОМЛЕНИЙ (Адаптирована для старых iOS) ===

// Заменили современный Object.fromEntries на старый добрый цикл
function compact(obj) {
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
}

function parsePushPayload(event) {
  var defaults = {
    title: 'OnWaves',
    body: '',
    options: {
      icon: '/assets/icons/icon-192x192.png',
      badge: '/assets/icons/maskable-192x192.png',
      data: {}
    }
  };

  if (!event.data) return defaults;

  try {
    var p = event.data.json();
    // Заменили "??" на безопасные проверки
    var n = (p.notification !== undefined && p.notification !== null) ? p.notification : p;

    var rootData = (p.data != null && typeof p.data === 'object' && !Array.isArray(p.data)) ? p.data : {};
    var nestedData = (n.data != null && typeof n.data === 'object' && !Array.isArray(n.data)) ? n.data : {};
    var mergedData = Object.assign({}, rootData, nestedData);

    var title = n.title || p.title || defaults.title;
    var body = n.body || p.body || '';

    var options = compact({
      body: body,
      icon: n.icon || p.icon || defaults.options.icon,
      badge: n.badge || p.badge || defaults.options.badge,
      image: n.image || p.image,
      tag: n.tag || p.tag,
      renotify: (n.renotify !== undefined) ? n.renotify : p.renotify,
      requireInteraction: (n.requireInteraction !== undefined) ? n.requireInteraction : p.requireInteraction,
      silent: (n.silent !== undefined) ? n.silent : p.silent,
      vibrate: n.vibrate || p.vibrate,
      timestamp: n.timestamp || p.timestamp,
      actions: n.actions || p.actions,
      lang: n.lang || p.lang,
      dir: n.dir || p.dir,
      data: mergedData
    });

    return { title: title, options: options };
  } catch (e) {
    var text = event.data.text();
    return {
      title: defaults.title,
      options: compact({
        body: text,
        icon: defaults.options.icon,
        badge: defaults.options.badge,
        data: {}
      })
    };
  }
}

self.addEventListener('push', function(event) {
  event.waitUntil(
    Promise.resolve().then(function() {
      var payload = parsePushPayload(event);
      return self.registration.showNotification(payload.title, payload.options);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var data = event.notification.data || {};
  var url = typeof data.url === 'string' ? data.url : '/';

  if (event.action && data.actionUrls && typeof data.actionUrls === 'object' && data.actionUrls[event.action]) {
    url = data.actionUrls[event.action];
  }

  var fullUrl = new URL(url, self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clients) {
      var w = clients[0];
      if (w && 'navigate' in w) {
        return w.navigate(fullUrl).then(function() { return w.focus(); });
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(fullUrl);
      }
    })
  );
});