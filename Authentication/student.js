import { auth, db } from "../main.js"; // Importing the Firebase auth instance
import {
	collection,
	doc,
	setDoc, // Use setDoc to set the document with a specific ID
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// Elements
const loginForm = document.querySelector("#login-page form"); // Login form
const studentDetailsForm = document.querySelector("#student-details-page form"); // Student details form

// Handle Login
async function handleLogin(event) {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("loginpassword").value;

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log("Student logged in:", userCredential.user);

		// Pass extra data (for now, you can just send it to the local storage or a new page)
		const studentData = {
			email: email,
			// Add more data here if needed
		};
		localStorage.setItem("studentData", JSON.stringify(studentData)); // Store in localStorage for testing

		window.location.href = "std-dashboard.html"; // Redirect to student dashboard after successful login
	} catch (error) {
		console.error("Login error:", error.message);
		alert("Login failed. Please check your credentials.");
	}
}

// Handle Registration (Student Details)
async function handleRegistration(event) {
	event.preventDefault();

	const email = document.getElementById("email-details").value;
	const password = document.getElementById("Regpassword").value;
	const confirmPassword = document.getElementById("confirmPassword").value;

	// Password match validation
	if (password !== confirmPassword) {
		alert("Passwords don't match.");
		return;
	}

	try {
		// Create user with email and password
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log("Student registered:", userCredential.user);

		// Collect additional student details from the form
		const studentDetails = {
			name: document.getElementById("name").value,
			dob: document.getElementById("dob").value,
			address: document.getElementById("address").value,
			mobile: document.getElementById("mobile").value,
			city: document.getElementById("city").value,
			college: document.getElementById("college").value,
			branch: document.getElementById("branch").value,
			resume: document.getElementById("resume").files[0]?.name, // You can handle resume upload separately
		};

		// Store student details in Firestore using the UID as the document ID
		const studentRef = doc(db, "students", userCredential.user.uid); // Use userCredential.user.uid as the document ID
		await setDoc(studentRef, studentDetails); // Add the student details to Firestore

		console.log("Document written with UID: ", userCredential.user.uid);

		// Pass additional details (for now, store in localStorage)
		localStorage.setItem("studentData", JSON.stringify(studentDetails)); // Store extra data in localStorage
		showLoginForm();
		alert("Registration successful!,redirecting to login");
		studentDetailsForm.reset();
	} catch (error) {
		console.error("Registration error:", error.message);
		alert("Registration failed. Please try again.");
	}
}

// Event Listeners
loginForm.addEventListener("submit", handleLogin);
studentDetailsForm.addEventListener("submit", handleRegistration);

function showLoginForm() {
	// Hide the registration form
	document.getElementById("student-details-page").style.display = "none";

	// Show the login form
	document.getElementById("login-page").style.display = "block";
}
