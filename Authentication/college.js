import { auth } from '../main.js'; // Importing the Firebase auth instance
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

// Reference to the DOM elements
const loginForm = document.querySelector('.loginForm');
const registerForm = document.querySelector('.registerForm');

// Show error message
function showError(message) {
    alert(message); // Replace with a better UI later
}

// Login handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginpassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential.user);
        alert('Login successful!');
        // Redirect or load college dashboard
        window.location.href = 'dash.html';
    } catch (error) {
        console.error('Error logging in:', error.message);
        showError(error.message);
    }
});

// Registration handler
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('contact-email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        showError('Passwords do not match!');
        return;
    }

    // Collecting additional college data
    const collegeData = {
        collegeName: document.getElementById('collegeName').value,
        website: document.getElementById('website').value,
        address: document.getElementById('address').value,
        eligibility: document.getElementById('eligibility').value,
        placementRules: document.getElementById('placement-rules').value,
        sessionStart: document.getElementById('session-start').value,
        sessionEnd: document.getElementById('session-end').value,
        studentDocuments: document.getElementById('student-documents').value,
        recruiterDocuments: document.getElementById('recruiter-documents').value,
        studentData: document.getElementById('student-data').value,
        contactName: document.getElementById('contact-name').value,
        contactPhone: document.getElementById('contact-phone').value,
    };

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registration successful:', userCredential.user);

        // Save college data temporarily for now (Firestore will be used later)
        console.log('College Data:', collegeData);
        alert('Registration successful!');
        window.location.href = 'collegee.html';
        // Clear form or redirect as needed
        registerForm.reset();
    } catch (error) {
        console.error('Error registering:', error.message);
        showError(error.message);
    }
});
