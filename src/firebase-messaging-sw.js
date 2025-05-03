// See https://firebase.google.com/docs/cloud-messaging/js/receive#setting_notification_options_in_the_service_worker
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');
// let service = inject(MessagingService);
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyBiOQ4X8q8Kf5UHwTq_TaRSTb9j0xClRJs",
  authDomain: "ocpio-311510.firebaseapp.com",
  projectId: "ocpio-311510",
  storageBucket: "ocpio-311510.appspot.com",
  messagingSenderId: "625145012665",
  appId: "1:625145012665:web:b19feea8ea4bd2679fd668",
  measurementId: "G-T8F0R2G5YN"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
 // service.currentMessage.next(notificationOptions);
  self.registration.showNotification(notificationTitle, notificationOptions);
});
