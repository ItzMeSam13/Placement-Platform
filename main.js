// main.js (Initialized with Firebase CDN)

console.log("Firebase initialized");

// Import Firebase SDK via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBICK-VYXlLm4m7pLj94dP7DGLVB0NNmjQ",
    authDomain: "hackathon-project-1d824.firebaseapp.com",
    projectId: "hackathon-project-1d824",
    storageBucket: "hackathon-project-1d824.firebasestorage.app",
    messagingSenderId: "1057185239567",
    appId: "1:1057185239567:web:562d955d8ea8bdf260897a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize authentication
export { auth };  // Export the auth module for use in other files
console.log("Firebase Auth Initialized: ", auth);  // Just to verify if it's working
