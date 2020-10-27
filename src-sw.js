importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

console.log('this is my custom service worker');

// workbox.routing.registerRoute(
//     new RegExp('https://jsonplaceholder.typicode.com/users'),
//     workbox.strategies.cacheFirst()
//   );

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.cacheFirst({
    cacheName: 'imagesCache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, 
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'style',
  new workbox.strategies.staleWhileRevalidate({
    cacheName: 'styleCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script',
  new workbox.strategies.staleWhileRevalidate({
    cacheName: 'scriptsCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'document',
  new workbox.strategies.staleWhileRevalidate({
    cacheName: 'documentCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'font',
  new workbox.strategies.cacheFirst({
    cacheName: 'fontCache',
  })
);
