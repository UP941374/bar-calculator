const CACHE_NAME = 'bar-calculator';

let resourcesToCache = ['./index.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(resourcesToCache);
    })
  );
});

self.addEventListener("fetch", e => {
  e.resondWith(
    caches.match(e.request).then(response = > {
      return response || fetch(e.request);
    })
  );
});

const cacheWhiteList = ['bar-calculator'];
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        chacheNames.map(cacheName => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})
