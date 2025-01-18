import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import api from "../axios";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  if (typeof Notification === "undefined") {
    console.warn("This browser does not support notifications.");
    return "unsupported";
  }

  const permission = await Notification.requestPermission();
  console.log("Notification permission status:", permission);
  return permission;
};

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission, "permission");
  let fcmtoken;
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BPbrIpJjC4hH7baxhyBDdCwC0HrDQ9qDv6q82_YRYjSsY3lG0_WkM6G6sFdfNwD6IDCUjKfhf5wKmD5EZQChXYY",
    });
    fcmtoken = token;
  }
  if (fcmtoken) {
    const res = await NotificationService.createToken({
      token: fcmtoken,
    });

    console.log(res, "res $%^&");
  }
};

let messageListenerInitialized = false;
export const onMessageListener = (callback: (payload: any) => void) => {
  if (
    typeof window !== "undefined" &&
    messaging &&
    !messageListenerInitialized
  ) {
    messageListenerInitialized = true;
    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      if (callback) {
        callback(payload);
      }
    });
  }
};

class NotificationService {
  static async createToken(data: { token: string }): Promise<any> {
    return api.put("/user/firebase-token", data);
  }
}

export default NotificationService;
