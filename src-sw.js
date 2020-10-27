importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

//workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

console.log('this is my custom service worker');

workbox.routing.registerRoute(
    new RegExp('https://jsonplaceholder.typicode.com/users'),
    workbox.strategies.cacheFirst()
  );

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|webp|gif)/,
  workbox.strategies.cacheFirst({
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
  new RegExp('.*\.css'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'scriptsCache',
  })
);
workbox.routing.registerRoute(
  new RegExp('index\.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'documentCache',
  })
);

workbox.routing.registerRoute(
  /.*\.(?:woff|woff2|ttf|otf)/,
  workbox.strategies.cacheFirst({
    cacheName: 'fontCache',
  })
);
