import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBU1X8BV9jthAtWB7nE4lKSPzC8DsQ_AEY",
  authDomain: "ask-lawyer-76c87.firebaseapp.com",
  databaseURL: "https://ask-lawyer-76c87-default-rtdb.firebaseio.com",
  projectId: "ask-lawyer-76c87",
  storageBucket: "ask-lawyer-76c87.firebasestorage.app",
  messagingSenderId: "738353390524",
  appId: "1:738353390524:web:9e9f6e92500af60de241b9",
  measurementId: "G-BK5RK8181H"
};
const app = initializeApp(firebaseConfig);

export const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

const db = getDatabase(app);

export { db };