self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open('cache').then(function(cache) {
        return cache.match(event.request).then(function(response) {
            console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
                console.log("fetch completed: " + event.request.url, networkResponse);
                if (networkResponse) {
                    console.debug("updated cached page: " + event.request.url, networkResponse);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function(event) {
                console.log("Error in fetch()", event);
                event.waitUntil(
                    caches.open('cache').then(function(cache) {
                        return cache.addAll([
                            '/',
                            '/index.html',
                            '/index.html?homescreen=1',
                            '/?homescreen=1',
                            '/assets/css/main.css',
                            'assets/css/noscript.css',
                            'assets/css/font-awesome.min.css',
                            'assets/js/main.js',
                            'assets/js/jquery.min.js',
                            'assets/js/util.js',
                            'assets/js/browser.min.js',
                            'assets/js/breakpoints.min.js',
                            'assets/sass/main.scss',
                            'assets/sass/noscript.scss',
                            'assets/fonts/FontAwesome.otf',
                            'assets/fonts/fontawesome-webfont.eot',
                            'assets/fonts/fontawesome-webfont.ttf',
                            'assets/fonts/fontawesome-webfont.svg',
                            'assets/fonts/fontawesome-webfont.woff',
                            'assets/fonts/fontawesome-webfont.woff2',
                            '/images/bg',
                            '/images/img_1.jpg',
                            '/images/pic01.jpg',
                            '/images/pic02.jpg',
                            'hybroicon.png',
                            'hybrologo.png',
                            'hybrostudio.png',
                            'hybrostudioicon.png',
                            '/service-worker.js',
                            '/manifest.json',
                            '/socialbar.html',
                        ]);
                    })
                );
            });
            return response || fetchPromise;
        });
    }));
});