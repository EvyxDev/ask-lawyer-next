
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js");


firebase.initializeApp({
   apiKey: "AIzaSyBU1X8BV9jthAtWB7nE4lKSPzC8DsQ_AEY",
  authDomain: "ask-lawyer-76c87.firebaseapp.com",
  projectId: "ask-lawyer-76c87",
  storageBucket: "ask-lawyer-76c87.appspot.com",
  messagingSenderId: "738353390524",
  appId: "1:738353390524:web:9e9f6e92500af60de241b9",
  measurementId: "G-BK5RK8181H"
});
// Initialize FCM to enable this(sw) to receive push notifications from firebase servers
const messaging = firebase.messaging()

// Listen to background messages from firebase servers
messaging.onBackgroundMessage((payload) => {
    // Extract the required details from the payload
    const notificationTitle = payload.notification?.title || "Notification";
    const notificationOptions = {
        body: payload.notification?.body || "You have a new message. Please check it out",
        icon: "/assets/icon.webp" || payload.notification?.icon ,
        data: { url: payload.fcmOptions?.link || "/" }, // The notification will redirect to the homepage("/") when clicked. Fell free to redirect to whatever page you want to.
    };

    // Display push notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || "/";

    event.waitUntil( 
        clients.matchAll({ type: "window", includeUncontrolled: true }) /* Get all open browser tabs controlled by this service worker */
        .then((clientList) => {
            // Loop through each open tab/window
            for (const client of clientList) {
                if (client.url.includes(targetUrl) && "focus" in client) {
                    return client.focus(); // If a matching tab exists, bring it to the front
                }
            }
            // If no matching tab is found, open a new one
            return clients.openWindow(targetUrl);
        })
    );
});