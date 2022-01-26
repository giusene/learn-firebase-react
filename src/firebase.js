
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "learn-firebase-react-38aaf.firebaseapp.com",
  projectId: "learn-firebase-react-38aaf",
  storageBucket: "learn-firebase-react-38aaf.appspot.com",
  messagingSenderId: "579218159959",
  appId: "1:579218159959:web:f3c9cb030b71f2474fa612"
};


// Initialize Firebase
initializeApp(firebaseConfig);

// Riferimento al database
const db = getFirestore();

export { db }