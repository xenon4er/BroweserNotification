'use strict'

/*navigator.serviceWorker.register('/sw.js').then(function(registration){
      console.log("registration");
  
      self.addEventListener('notificationclick', event => {
          var messageId = event.notification.data;
          console.log("notificationclick");
          event.notification.close();

          if (event.action) {
            // Send the response directly to the server.
          } else {
            // Open the app.
          }
        }, false);
});


*/
function notifyMe() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: 'http://www.nowolves.com/images/nowolves.gif',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample',
          actions: [
            { "action": "yes", "title": "Yes!", },
            { "action": "no", "title": "No", }
          ]
        });
      });
    }
  });
}


// Once the service worker is registered set the initial state  
function initialiseState() {  
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
    console.warn('Notifications aren\'t supported.');  
    return;  
  }



  if (Notification.permission === 'denied') {  
    console.warn('The user has blocked notifications.');  
    return;  
  }
  if (!('PushManager' in window)) {  
    console.warn('Push messaging isn\'t supported.');  
    return;  
  }

}
window.addEventListener('load', function() {  
  var pushButton = document.querySelector('.js-push-button');  
  pushButton.addEventListener('click', function() {  
      notifyMe();  
  });

  // Check that service workers are supported, if so, progressively  
  // enhance and add push messaging support, otherwise continue without it.  
  if ('serviceWorker' in navigator) {  
    navigator.serviceWorker.register('/sw.js')  
    .then(initialiseState);  
  } else {  
    console.warn('Service workers aren\'t supported in this browser.');  
  }  
});
