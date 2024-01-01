import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD9TmwlknaJ5tH5hS_SgtOwS8IXV2fzPCI",
  authDomain: "hirehelix-aa9c4.firebaseapp.com",
  projectId: "hirehelix-aa9c4",
  storageBucket: "hirehelix-aa9c4.appspot.com",
  messagingSenderId: "146424537294",
  appId: "1:146424537294:web:2b9c3f6121ec3b774c309f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
