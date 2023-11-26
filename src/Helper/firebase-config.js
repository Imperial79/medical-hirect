import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDVG4NOpamS-6qodK7HLH9UfF5z4vYny-g",
    authDomain: "medilink-dd7ad.firebaseapp.com",
    projectId: "medilink-dd7ad",
    storageBucket: "medilink-dd7ad.appspot.com",
    messagingSenderId: "226694258438",
    appId: "1:226694258438:web:a27543852d111a8f1cc887"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();