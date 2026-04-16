const CACHE = 'workout-app-v3';
const FILES = ['/my-workout-app/', '/my-workout-app/index.html', '/my-workout-app/manifest.json', '/my-workout-app/icon.png', '/my-workout-app/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/my-workout-app/index.html'))));
});
