const fileToCache = ['/index.html'];

const staticCacheName = 'App';

self.addEventListener('install', event => {
  console.log('Service Worker is installing assets');
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(fileToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for', event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          console.log('Found', event.request.url, ' in cache');
          return response;
        }

        console.log('Network request for', event.request.url);
        return fetch(event.request);
      })
      .catch(err => {
        console.error(err);
      })
  );
});
// (
//   function() {
//     self.addEventListener('install', () => {
//       console.log('Service Worker installing');
//       self.skipWaiting();
//     });

//     self.addEventListener('activate', () => {
//       console.log('Service Worker activating...');
//     });

//     self.addEventListener('fetch', event => {
//       console.log('Fetching: ', event.request.url);
//     });
//   }
// )();
