import { auth } from '../main.js'; // Importing the Firebase auth instance
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

// DOM references
const loginForm = document.querySelector('.loginForm');
const registerForm = document.querySelector('.registerForm');

// Helper function to show error messages
function showError(message) {
    alert(message); // Replace this with a custom error display in the UI if needed
}

// Login handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential.user);
        alert('Login successful!');
        window.location.href = 'recruiter-dashboard.html';
        // Redirect to recruiter dashboard or perform other actions
    } catch (error) {
        console.error('Error logging in:', error.message);
        showError(error.message);
    }
});

// Registration handler
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showError('Passwords do not match!');
        return;
    }

    // Collecting additional recruiter data
    const recruiterData = {
        companyName: document.getElementById('company').value,
        contactNumber: document.getElementById('contactNumber').value,
        industry: document.getElementById('industry').value,
        profile: document.getElementById('profile').files[0]?.name || 'Not uploaded', // For simplicity
    };

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Registration successful:', userCredential.user);

        // Save recruiter data temporarily for now (Firestore or Realtime Database will be used later)
        console.log('Recruiter Data:', recruiterData);
        alert('Registration successful!');
        window.location.href = 'Rec-Reg.html'; // Redirect to the login page for recruiters

        // Clear the form or redirect to a new page
        registerForm.reset();
    } catch (error) {
        console.error('Error registering:', error.message);
        showError(error.message);
    }
});
