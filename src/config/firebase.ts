// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSbhTofKOHpMx-mbiKSwzqiI5PYyIvynE",
  authDomain: "react-first-project-3ec01.firebaseapp.com",
  projectId: "react-first-project-3ec01",
  storageBucket: "react-first-project-3ec01.appspot.com",
  messagingSenderId: "220285614309",
  appId: "1:220285614309:web:a26a90cf3f7c29ccc93c0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();


export const db = getFirestore(app);
