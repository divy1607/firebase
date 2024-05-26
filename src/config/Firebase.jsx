import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDofnMgHbBkXzJUZ-9jGUowXhUX0cEa6DM",
  authDomain: "divy-1bf0c.firebaseapp.com",
  projectId: "divy-1bf0c",
  storageBucket: "divy-1bf0c.appspot.com",
  messagingSenderId: "737495457735",
  appId: "1:737495457735:web:0463dd57021df3dc9003e2",
  measurementId: "G-CRZKSYDF33"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);