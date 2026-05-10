const CACHE_NAME = 'insd-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Caching strategy for static assets and images
  const isImage = url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/) || 
                  url.origin.includes('imagekit.io') || 
                  url.origin.includes('pexels.com') || 
                  url.origin.includes('unsplash.com');
  
  const isStatic = url.pathname.match(/\.(js|css|woff2|woff|ttf)$/) ||
                   url.origin.includes('gstatic.com') ||
                   url.origin.includes('googleapis.com');

  if (isImage || isStatic) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });

          return cachedResponse || fetchedResponse;
        });
      })
    );
    return;
  }

  // Navigation requests: Network First, fallback to index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Default: Network First
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && url.origin === self.location.origin && !url.pathname.includes('/api')) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
