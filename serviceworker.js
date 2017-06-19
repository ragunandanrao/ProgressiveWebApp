console.log("Hello from a SW");
//Fetch is the first event that is called when we load any resource in the domain.
var urls = ["/", "style.css", "launcher.js"];
 
self.addEventListener("install", function(event) {
    console.log("The SW is now installed"); 
    //Cache storage API 'caches' 
    //caches.open creates a new cache with the given name. 
    //event.waitUntil is a request for not being terminates until that promise is fulfilled.
    event.waitUntil(caches.open("activityLauncher").then(function(cache) {
        return cache.addAll(urls);
    }));
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        //caches.match looks for http request and responses key, value pair cache. 
        //Checking for the hit/miss operation in cache.
        caches.match(event.request)
            .then(function(response) {
                // Even if the response is in the cache, we fetch it
                // and update the cache for future usage
                //fetch API replaces AJAX
                //Going to network to fetch the resource.
                var fetchPromise = fetch(event.request).then(
                    function(networkResponse) {
                        caches.open("activityLauncher").then(function (cache) {
                           cache.put(event.request, networkResponse.clone());
                            return networkResponse; 
                        });
                    });
                // We use the currently cached version if it's there
                return response || fetchPromise;
            })
        );
    });  


//self.addEventListener("fetch", function(event) {
//    //console.log(event);
//    //event.respondWith(new Response(`Hello ${event.request.url}`));
//});

//Whenever the SW is activated.
self.addEventListener('activate', function(result) {
    
});
