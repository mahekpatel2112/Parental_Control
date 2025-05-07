// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAGWxJFnV-qhYv5bm3FfLz9pf1KsgHqyyg",
    authDomain: "smartypalsapp.firebaseapp.com",
    projectId: "smartypalsapp",
    storageBucket: "smartypalsapp.firebasestorage.app",
    messagingSenderId: "452222044429",
    appId: "1:452222044429:web:b1ef2ec4470027c4640844"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
