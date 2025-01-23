// Firebase Configuration (Replace with your Firebase project settings)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxot6nMXg2AZywXJzIK7rgS2goMkEcMAc",
  authDomain: "crown-co.firebaseapp.com",
  projectId: "crown-co",
  storageBucket: "crown-co.firebasestorage.app",
  messagingSenderId: "643804759346",
  appId: "1:643804759346:web:7eb311c2e6532d04da832b",
  measurementId: "G-B3HV2RPC6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore instance
const firestore = firebase.firestore();

// DOM Elements
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const formTitle = document.getElementById("form-title");
const toggleMessage = document.getElementById("toggle-message");
const toggleLink = document.getElementById("toggle-link");

// Toggle between Signup and Login forms
toggleLink.addEventListener("click", () => {
  if (signupForm.classList.contains("active")) {
    // Switch to Login form
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    formTitle.textContent = "Login";
    toggleMessage.textContent = "Don't have an account yet?";
    toggleLink.textContent = "Sign Up";
  } else {
    // Switch to Signup form
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    formTitle.textContent = "Signup";
    toggleMessage.textContent = "Already have an account?";
    toggleLink.textContent = "Login";
  }
});

// Signup Function
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("signup-first-name").value.trim();
  const lastName = document.getElementById("signup-last-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  try {
    // Create user in Firebase Authentication
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    // Save additional user data in Firestore
    await firestore.collection("users").doc(userCredential.user.uid).set({
      firstName,
      lastName,
      email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    alert(`Signup successful! Welcome, ${firstName} ${lastName}`);
    window.location.href = "dashboard.html"; // Redirect to the user's dashboard
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert(error.message);
  }
});

// Login Function
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    // Authenticate user with Firebase Authentication
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    // Fetch user data from Firestore
    const userDoc = await firestore
      .collection("users")
      .doc(userCredential.user.uid)
      .get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      alert(`Welcome back, ${userData.firstName || "User"}!`);
      window.location.href = "dashboard.html"; // Redirect to the user's dashboard
    } else {
      console.error("User data not found in Firestore.");
      alert("User data not found. Please contact support.");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert(error.message);
  }
});
