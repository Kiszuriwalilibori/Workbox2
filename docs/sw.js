importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
import {CacheFirst} from 'workbox-strategies';

workbox.precaching.precacheAndRoute([{"revision":"b6cb14dbfa1eb45524431e9faae19d3e","url":"css/app.css"},{"revision":"2d1aa9b2af04590ba7f393d4399af402","url":"index.html"},{"revision":"006d20a6f8655078e4b32054b600a367","url":"js/app.js"},{"revision":"104536ce72429ec1f598883183de70b7","url":"workbox-69b5a3b7.js"}]);

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
      new workbox.expiration.Plugin({
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
