console.log("Hello from a SW");
//Fetch is the first event that is called when we load any resource in the domain.
var urls = ["/", "style.css", "launcher.js","manifest.json",
           "https://fonts.googleapis.com/icon?family=Material+Icons",
           "https://fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2"];
 
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

self.addEventListener('activate', function(event) {
 
  // Array of cache that we will use in this version
  var cacheWhitelist = ["activityLauncher"];
 
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Deletes the cache because we won't use it here
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 



self.addEventListener('sync', function(event) {
    if (event.tag == 'eurocheck') {
        event.waitUntil(fetch("http://api.fixer.io/latest?base=USD").then(function (result){
            return result.json();
        })
    .then(function (result) {
            console.log(result.rates.EUR);
        })
    );
    }
});

self.addEventListener("push", function(event) {
  if (event.data) {
    console.log('Push Data: ', event.data.text());
  } else {
    console.log('No data :(');
  }
  self.registration.showNotification("Push title", {
      //options for the notifications like body , actions, icon, badge etc
        body: event.data.text()
  });
});

self.addEventListener('notificationclick', function(event) {
 if (!event.action) {
   console.log('Notification Click with no action');
   return;
 } else {
   // event action has the action id
 }
self.registration.showNotification("Push title", {
       body: event.data.text()
 });
 event.notification.close();
 
 event.waitUntil(doSomething);
 
});



//self.addEventListener("fetch", function(event) {
//    //console.log(event);
//    //event.respondWith(new Response(`Hello ${event.request.url}`));
//});

//Whenever the SW is activated.
self.addEventListener('activate', function(result) {
    
});
