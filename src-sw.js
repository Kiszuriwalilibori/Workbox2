importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

console.log('this is my custom service worker');

// workbox.routing.registerRoute(
//     new RegExp('https://jsonplaceholder.typicode.com/users'),
//     workbox.strategies.cacheFirst()
//   );

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new cacheFirst({
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
  new staleWhileRevalidate({
    cacheName: 'styleCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script',
  new staleWhileRevalidate({
    cacheName: 'scriptsCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'document',
  new staleWhileRevalidate({
    cacheName: 'documentCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'font',
  new cacheFirst({
    cacheName: 'fontCache',
  })
);
