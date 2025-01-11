// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPJeS6DSRFukja0n4dyolij1v7SRrXMR0",
  authDomain: "fir-login-signup-b215a.firebaseapp.com",
  projectId: "fir-login-signup-b215a",
  storageBucket: "fir-login-signup-b215a.firebasestorage.app",
  messagingSenderId: "753064488374",
  appId: "1:753064488374:web:8c2e153e81a807adade517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
