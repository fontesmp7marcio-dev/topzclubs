// TOPZCLUBS - High Reliability Push Notification Service Worker (Android, iOS & Desktop)
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {
    title: 'TOPZCLUBS',
    body: 'Nova atualização de jogos ou bilhetes!',
    icon: '/pwa-192x192.png',
    badge: '/favicon.png',
    url: '/',
    tag: `topzclubs-${Date.now()}`,
  };

  try {
    if (event.data) {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const title = data.title || 'TOPZCLUBS';
  const isGreenOrProgress = data.body && (data.body.includes('GREEN') || data.body.includes('encerrado') || data.body.includes('bilhete'));

  // Notification Options configured for maximum mobile visibility & lock screen wake
  const options = {
    body: data.body,
    icon: data.icon || '/pwa-192x192.png',
    badge: data.badge || '/favicon.png',
    image: data.image || undefined,
    vibrate: isGreenOrProgress ? [100, 50, 100, 50, 300] : [200, 100, 200],
    sound: '/assets/cash-register.mp3',
    tag: data.tag || `topzclubs-${Date.now()}`,
    renotify: true,
    requireInteraction: true, // Keeps notification active on locked screen / notification tray until user dismisses or clicks
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
      type: data.type || 'geral',
    },
    actions: [
      { action: 'open', title: 'Abrir no App' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Focus existing tab if open
      for (const client of windowClients) {
        if ('focus' in client) {
          if ('navigate' in client && targetUrl !== '/') {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      // Otherwise open fresh window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
