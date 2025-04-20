// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyaxVUdvw3qDxwnR39DTEn8GZUnirk0mI",
  authDomain: "med-connect-3a5d5.firebaseapp.com",
  projectId: "med-connect-3a5d5",
  storageBucket: "med-connect-3a5d5.firebasestorage.app",
  messagingSenderId: "380103516950",
  appId: "1:380103516950:web:b8976ce85518afcdee2637",
  measurementId: "G-2VJZDQ8Q4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services to use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
