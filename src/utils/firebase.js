// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_3c6zS9cx4m4MReyGWMcZYTY_czXzdjw",
  authDomain: "netflix-gpt-5b22f.firebaseapp.com",
  databaseURL: "https://netflix-gpt-5b22f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "netflix-gpt-5b22f",
  storageBucket: "netflix-gpt-5b22f.appspot.com",
  messagingSenderId: "281926041032",
  appId: "1:281926041032:web:7598d16a0c9d56c7ce94fd",
  measurementId: "G-YVB98K136D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();