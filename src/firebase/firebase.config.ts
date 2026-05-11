import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const firebaseConfig = {
  apiKey: "AIzaSyC9adMuePZXrofGk0Q2aVO6BJnmYVqvd2U",
  authDomain: "teacherportal-45120.firebaseapp.com",
  projectId: "teacherportal-45120",
  storageBucket: "teacherportal-45120.firebasestorage.app",
  messagingSenderId: "295814051417",
  appId: "1:295814051417:web:c666b87a9716ba4ea52348",
  measurementId: "G-LY0PYGS91Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);