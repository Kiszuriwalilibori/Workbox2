importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

//workbox.precaching.precacheAndRoute([{"revision":"b6cb14dbfa1eb45524431e9faae19d3e","url":"css/app.css"},{"revision":"9222ac33fc1ec4c2f9bfbf304991c6e6","url":"index.html"},{"revision":"abbbfae859783538e8f1dd0c74b6ee73","url":"js/app.js"},{"revision":"104536ce72429ec1f598883183de70b7","url":"workbox-69b5a3b7.js"}]);

console.log('this is my custom service worker');

workbox.routing.registerRoute(
    new RegExp('https://jsonplaceholder.typicode.com/users'),
    workbox.strategies.cacheFirst({cacheName:'usersCache'})
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
  // new RegExp('.*\.css'),
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'styleCache',
  })
);

workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'scriptsCache',
  })
);
workbox.routing.registerRoute(
  ///index\.html/,
  /.*\.(?:HTML)/,
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
