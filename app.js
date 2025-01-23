// Import Firebase if you're using modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence 
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxot6nMXg2AZywXJzIK7rgS2goMkEcMAc",
  authDomain: "crown-co.firebaseapp.com",
  projectId: "crown-co",
  storageBucket: "crown-co.firebasestorage.app",
  messagingSenderId: "643804759346",
  appId: "1:643804759346:web:7eb311c2e6532d04da832b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const toggleMessage = document.getElementById("toggle-message");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
const loginErrorMessage = document.getElementById("login-error-message");

// Toggle Between Signup and Login Forms
toggleLink.addEventListener("click", () => {
  if (signupForm.classList.contains("active")) {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    formTitle.textContent = "Login";
    toggleMessage.textContent = "Don't have an account yet?";
    toggleLink.textContent = "Signup";
  } else {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    formTitle.textContent = "Signup";
    toggleMessage.textContent = "Already have an account?";
    toggleLink.textContent = "Login";
  }
});

// Signup Form Submission
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("signup-first-name").value;
  const lastName = document.getElementById("signup-last-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally store user details in Firestore
    // (If you use Firestore, import `getFirestore` and `setDoc`)
    // const db = getFirestore(app);
    // await setDoc(doc(db, "users", user.uid), { firstName, lastName, email });

    alert("Signup successful! You can now log in.");
    signupForm.reset();
    toggleLink.click(); // Switch to login form
  } catch (error) {
    alert(`Signup error: ${error.message}`);
  }
});

// Login Form Submission
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const rememberMe = document.getElementById("remember-me").checked; // Checkbox for "Remember Me"

  try {
    // Set persistence based on "Remember Me"
    const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistence);

    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user ID in localStorage for persistence across pages
    localStorage.setItem("userId", user.uid);

    // Redirect to the dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login error:", error.message);
    loginErrorMessage.style.display = "block"; // Show error message
    loginErrorMessage.textContent = error.message;
  }
});

// Check Authentication State (For Persistence Across Pages)
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    localStorage.setItem("userId", user.uid); // Ensure user ID is stored
  } else {
    console.log("No user is signed in.");
  }
});
