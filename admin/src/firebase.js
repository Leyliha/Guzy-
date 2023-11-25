// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmw2fJF7j1mOsmKJQpXGF_D-pRkmb95_4",
  authDomain: "kolorit-eea7e.firebaseapp.com",
  projectId: "kolorit-eea7e",
  storageBucket: "kolorit-eea7e.appspot.com",
  messagingSenderId: "6202746906",
  appId: "1:6202746906:web:9023a5d933bba7aca149a3",
  measurementId: "G-P4XTC203BP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app