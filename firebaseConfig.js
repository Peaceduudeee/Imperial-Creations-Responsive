import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD94H2uZiBWq-4-W0ImhDVBAlUygGwOaQc",
  authDomain: "imperial-creations-caf2d.firebaseapp.com",
  projectId: "imperial-creations-caf2d",
  storageBucket: "imperial-creations-caf2d.appshot.com",
  messagingSenderId: "613460118913",
  appId: "1:613460118913:web:5ef2f970e949c81d436c80",
  measurementId: "G-NC40SD184P"
};

// Initialize Firebase (Prevent re-initialization)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); //  Initialize and export auth

export { app, db, auth, storage }; //  Export both Firestore (`db`) and Auth (`auth`)