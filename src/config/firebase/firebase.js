// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
  apiKey: "AIzaSyB9gxM0feUP_sC2Scp2gDUx-R6QKm8CNyA",
  authDomain: "forobd-71910.firebaseapp.com",
  projectId: "forobd-71910",
  storageBucket: "forobd-71910.appspot.com",
  messagingSenderId: "1024199847420",
  appId: "1:1024199847420:web:58d5e48033d77ad4c95679",
  measurementId: "G-NLVSYTMYCQ"
});

// Initialize Firebase

//const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = firebase.auth();

export default app;