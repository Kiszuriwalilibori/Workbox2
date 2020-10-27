importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
workbox.precaching.precacheAndRoute([{"revision":"b6cb14dbfa1eb45524431e9faae19d3e","url":"css/app.css"},{"revision":"2d1aa9b2af04590ba7f393d4399af402","url":"index.html"},{"revision":"006d20a6f8655078e4b32054b600a367","url":"js/app.js"},{"revision":"104536ce72429ec1f598883183de70b7","url":"workbox-69b5a3b7.js"}]);

console.log('this is my custom service worker');

// workbox.routing.registerRoute(
//     new RegExp('https://jsonplaceholder.typicode.com/users'),
//     workbox.strategies.cacheFirst()
//   );

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
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
  new StaleWhileRevalidate({
    cacheName: 'styleCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'scriptsCache',
  })
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'document',
  new StaleWhileRevalidate({
    cacheName: 'documentCache',
  })
);



//workbox.precaching.precacheAndRoute([])