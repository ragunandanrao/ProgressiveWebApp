function pushAskPermission() {
  return new Promise(function(resolve, reject) {
      //Notification is the API for browser notifications
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });
 
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}

function pushSubscribeUser() {
  navigator.serviceWorker.getRegistration().then(
      function(registration) {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                'BDc9cbkk88rKFRYw7lfOdROs_oW4-u5UdFvS9jXdvikHkgLjmuY2RshWmUPLWOjrQAK-r-NflkTO5nWxWl3nSGQ'
            )
        };
        return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
    console.log('Push Subscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
}
 
// Snippet from https://www.npmjs.com/package/web-push
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

 
// Snippet from https://www.npmjs.com/package/web-push
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
 
 

