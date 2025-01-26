import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
	getAuth,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {
	getFirestore,
	doc,
	getDoc,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBICK-VYXlLm4m7pLj94dP7DGLVB0NNmjQ",
	authDomain: "hackathon-project-1d824.firebaseapp.com",
	projectId: "hackathon-project-1d824",
	storageBucket: "hackathon-project-1d824.firebasestorage.app",
	messagingSenderId: "1057185239567",
	appId: "1:1057185239567:web:562d955d8ea8bdf260897a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to load student data
async function loadStudentData(user) {
	const studentRef = doc(db, "students", user.uid); // Use the user's UID to fetch the document

	try {
		const studentDoc = await getDoc(studentRef);
		if (studentDoc.exists()) {
			const studentData = studentDoc.data();

			// Dynamically update the HTML content with student details
			document.querySelector(".student-name").innerText = studentData.name;
			document.querySelector(
				"#profile li:nth-child(1)"
			).innerText = `Name: ${studentData.name}`;
			document.querySelector(
				"#profile li:nth-child(2)"
			).innerText = `Email: ${studentData.email}`;
			document.querySelector(
				"#profile li:nth-child(3)"
			).innerText = `Date of Birth: ${studentData.dob}`;
			document.querySelector(
				"#profile li:nth-child(4)"
			).innerText = `Address: ${studentData.address}`;
			document.querySelector(
				"#profile li:nth-child(5)"
			).innerText = `Mobile: ${studentData.mobile}`;
			document.querySelector(
				"#profile li:nth-child(6)"
			).innerText = `City: ${studentData.city}`;
			document.querySelector(
				"#profile li:nth-child(7)"
			).innerText = `College: ${studentData.college}`;
			document.querySelector(
				"#profile li:nth-child(8)"
			).innerText = `Department: ${studentData.branch}`;

			// Handle resume display (if you store the actual URL or file)
			if (studentData.resume) {
				document.querySelector(
					"#profile li:nth-child(9)"
				).innerText = `Resume: ${studentData.resume}`;
			} else {
				document.querySelector("#profile li:nth-child(9)").innerText =
					"Resume: Not uploaded yet";
			}

			// Display applied companies (optional)
			const appliedCompanies = studentData.appliedCompanies || [];
			const companiesList = document.querySelector("#companies ul");
			companiesList.innerHTML = ""; // Clear existing list
			appliedCompanies.forEach((company) => {
				const li = document.createElement("li");
				li.textContent = `${company.name} - Status: ${company.status}`;
				companiesList.appendChild(li);
			});
		} else {
			console.log("No such student document found");
			alert("Student data not found! Please check your account.");
		}
	} catch (error) {
		console.error("Error fetching student data: ", error);
		alert("Error loading student data. Please try again later.");
	}
}

// Firebase auth state listener
onAuthStateChanged(auth, (user) => {
	console.log("Auth state changed. User: ", user);

	if (user) {
		// User is logged in, load student data
		loadStudentData(user);
	} else {
		// User is not logged in, redirect to login page
		console.log("User is not logged in.");
		window.location.href = "student_signin.html"; // Redirect to login page
	}
});

// Logout function
document.getElementById("logout").addEventListener("click", async (e) => {
	e.preventDefault(); // Prevent the default link behavior
	try {
		await signOut(auth);
		console.log("User signed out");
		// Redirect to login page after logout
		window.location.href = "student_signin.html";
	} catch (error) {
		console.error("Error logging out: ", error);
		alert("Error logging out. Please try again.");
	}
});
