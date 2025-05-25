import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebase";

export async function getFCMToken() {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });
      return token;
    } else {
      console.error("تم رفض إذن الإشعارات");
      return null;
    }
  } catch (error) {
    console.error("خطأ في جلب FCM Token:", error);
    return null;
  }
}