// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsNQew-39bB6cRbg9_ElgadAAjvDcAeps",
  authDomain: "xt-brokers.firebaseapp.com",
  projectId: "xt-brokers",
  storageBucket: "xt-brokers.appspot.com",
  messagingSenderId: "77225618927",
  appId: "1:77225618927:web:95166170d3e4fa7064da1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const gProvider = new GoogleAuthProvider();
enableIndexedDbPersistence(db);
