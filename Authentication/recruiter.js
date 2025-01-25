// Import the Firebase auth module and the initialized Firebase app from main.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { auth } from "../main.js"; // Importing the initialized auth instance from main.js

// DOM elements for login and registration forms
const loginForm = document.querySelector('.loginForm'); // Correct class for login form
const registerForm = document.querySelector('.registerForm'); // Correct class for registration form

// Handle Login Form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in successfully:', user.email);
            alert('Logged in successfully!');
            window.location.href = "dashboard.html"; // Redirect to dashboard or home page
        })
        .catch((error) => {
            console.error(error.message);
            alert('Login failed: ' + error.message);
        });
});

// Handle Registration Form
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const companyName = document.getElementById('company').value; // Correct ID for company name
    const email = document.getElementById('email').value; // Correct ID for email
    const contactNumber = document.getElementById('contactNumber').value; // Correct ID for contact number
    const password = document.getElementById('password').value; // Correct ID for password
    const confirmPassword = document.getElementById('confirmPassword').value; // Correct ID for confirm password
    const industry = document.getElementById('industry').value; // Correct ID for industry type

    // Basic validation for matching passwords
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Create user account
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User created successfully:', user.email);
            alert('Account created successfully!');

            // Store additional user details (company name, contact number, etc.) in Firestore or Realtime Database (optional)
            // For now, you can save the user details here or in Firestore.

            // Redirect to dashboard or home page after registration
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error(error.message);
            alert('Registration failed: ' + error.message);
        });
});
