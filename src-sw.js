importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

console.log('this is my custom service worker');

// workbox.routing.registerRoute(
//     new RegExp('https://jsonplaceholder.typicode.com/users'),
//     workbox.strategies.cacheFirst()
//   );

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|webp|gif)/,
  workbox.strategies.CacheFirst({
    cacheName: 'imagesCache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, 
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'styleCache',
  })
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  new workbox.strategies.staleWhileRevalidate({
    cacheName: 'scriptsCache',
  })
);

workbox.routing.registerRoute(
  /index\.html/,
  new workbox.strategies.staleWhileRevalidate({
    cacheName: 'documentCache',
  })
);

workbox.routing.registerRoute(
  /.*\.(?:woff|woff2|ttf|otf)/,
  new workbox.strategies.cacheFirst({
    cacheName: 'fontCache',
  })
);
