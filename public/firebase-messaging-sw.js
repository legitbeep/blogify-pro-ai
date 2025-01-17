importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA7IAEYfqq9aIKx3TRmpq0Tox4ZCuKwlrc",
  authDomain: "testingpro-f3347.firebaseapp.com",
  projectId: "testingpro-f3347",
  storageBucket: "testingpro-f3347.firebasestorage.app",
  messagingSenderId: "896054172405",
  appId: "1:896054172405:web:73dcb896f8a0a4b40483bc",
  measurementId: "G-456QVER7F5",
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
});
