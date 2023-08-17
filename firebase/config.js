// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NODE_FIREBASE_KEY,
  authDomain: "snapbit-express.firebaseapp.com",
  projectId: "snapbit-express",
  storageBucket: "snapbit-express.appspot.com",
  messagingSenderId: "158153047959",
  appId: process.env.NODE_FIREBASE_APPID,
  measurementId: "G-MN5GLZEGR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);