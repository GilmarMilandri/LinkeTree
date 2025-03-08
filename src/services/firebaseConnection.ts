
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkEQ1F9IZdxowmC2fOuKS3eAh3Qg1jBBk",
  authDomain: "reactlinks-749ad.firebaseapp.com",
  projectId: "reactlinks-749ad",
  storageBucket: "reactlinks-749ad.firebasestorage.app",
  messagingSenderId: "62137862498",
  appId: "1:62137862498:web:e871c894aa77086304c43b",
  measurementId: "G-099R1XMWYH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };