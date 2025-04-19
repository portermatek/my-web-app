// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyByjYuH5cuJVGUIKUyTfD8DT-W0nCXGnJM",
  authDomain: "medconnect-demo-fe3cd.firebaseapp.com",
  projectId: "medconnect-demo-fe3cd",
  storageBucket: "medconnect-demo-fe3cd.firebasestorage.app",
  messagingSenderId: "393837004131",
  appId: "1:393837004131:web:02f17f985fe0229d60bf56",
  measurementId: "G-6DC5NEH53X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services to use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
