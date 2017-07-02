/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
/*
 @license https://github.com/t2ym/live-localizer/blob/master/LICENSE.md
 Copyright (c) 2017, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

'use strict';

var cacheName = 'wct-sw-' + (self.registration ? self.registration.scope : '');
// Clean cache on every request with this pattern
var entryUrlPattern = /^https?:\/\/[^:]*:[0-9]*\/components\/live-localizer\/test\/?(index(-es5)?[.]html)?(\?.*)?$/;
var cleaning = false; // true during cleaning cache; no caching if true
// Clean cache and unregister the service worker on this URL pattern
var unregisterUrlPattern = /^https?:\/\/[^:]*:[0-9]*\/components\/live-localizer\/test\/service-worker-cleanup[.]html(\?.*)?$/;

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    if (event.request.url.match(unregisterUrlPattern)) {
      cleaning = true;
      event.respondWith(
        caches.open(cacheName).then(cache => {
          return cache.keys().then((keys) => {
            var table = '\n' + keys.map((key) => key.url).join('\n');
            return caches.delete(cacheName).then(() => {
              return new Response(
                `<html>
                  <head>
                    <script src="../../web-component-tester/browser.js"></script>
                    <script>
                      suite('Service Worker', () => {
                        test('Unregister Service Worker', async () => {
                          let registration = await navigator.serviceWorker.getRegistration('/');
                          assert.isOk(registration, 'Service Worker is running');
                          let status = await registration.unregister();
                          if (status) {
                            console.log('Service Worker unregistered');
                            console.log('List of cleaned up caches');
                            console.log(\`${table}\`);
                          }
                          assert.isOk(status, 'Service Worker is unregistered successfully');
                        });
                      });
                    </script>
                  </head>
                  <body>
                    <h2>Cleaned Up Service Worker Caches</h2>
                    <pre style="font-size: 9pt">
                    ${table}
                    </pre>
                  </body>
                </html>`, { headers: {'Content-Type': 'text/html'} });
            })
          })
        })
      );
    }
    else if (!cleaning && event.request.url.startsWith(self.location.origin)) {
      if (event.request.url.match(entryUrlPattern)) {
        cleaning = true;
        event.waitUntil(
          caches.delete(cacheName).then(() => {
            cleaning = false;
          })
        );
      }
      else {
        event.respondWith(
          caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            return caches.open(cacheName).then(cache => {
              return fetch(event.request).then(response => {
                // Put a copy of the response in the runtime cache.
                return cache.put(event.request, response.clone()).then(() => {
                  return response;
                });
              });
            });
          })
        );
      }
    }
  }
});
