importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

//workbox.precaching.precacheAndRoute([{"revision":"54598e07758128a20943611d4c766f09","url":"css/app.css"},{"revision":"bede61ab8ec9d54dc1565fa44fefae42","url":"index.html"},{"revision":"006d20a6f8655078e4b32054b600a367","url":"js/app.js"},{"revision":"104536ce72429ec1f598883183de70b7","url":"workbox-69b5a3b7.js"}]);

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
