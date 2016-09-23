self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', function(event) {
  // Close the notification when it is clicked
  event.notification.close();

  if (event.action) {
    // Send the response directly to the server.
    console.log(event.action)
  } else {
    // Open the app.
    console.log("open page");
  }

});