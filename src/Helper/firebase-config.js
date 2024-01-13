import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxeGUHRFqF4Ke-Adi82TZfl74wdxtiH3s",
  authDomain: "hirehelix-ba881.firebaseapp.com",
  projectId: "hirehelix-ba881",
  storageBucket: "hirehelix-ba881.appspot.com",
  messagingSenderId: "260325872424",
  appId: "1:260325872424:web:8a0b354317a4d28e8cf61d",
  measurementId: "G-CHF7PE1F3Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
