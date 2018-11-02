const CACHE_VERSION = 1;
const STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;
const IMAGES_CACHE = `images-cache-v`;
const OTHERS_CACHE = `others-cache-v`;
const allCaches = [
  STATIC_CACHE,
  IMAGES_CACHE,
  OTHERS_CACHE
];

self.addEventListener("install", function(e) {
  e.waitUntil(
      caches.open("v1").then(function(cache) {
          return cache.addAll(allCaches);
      })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
      caches.match(e.request).then(function(response) {
          if (response) {
              console.log("Found ", e.request, " in cache");
              return response;
          } else {
              console.log("Could not find ", e.request, " in cache, FETCHING!");
              return fetch(e.request)
              .then(function(response) {
                  const clonedResponse = response.clone();
                  caches.open("v1").then(function(cache) {
                      cache.put(e.request, clonedResponse);
                  })
                  return response;
              })
              .catch(function(err) {
                  console.log(err);
              });
          }
      })
  );
});
