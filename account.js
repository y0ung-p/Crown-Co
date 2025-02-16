import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxot6nMXg2AZywXJzIK7rgS2goMkEcMAc",
  authDomain: "crown-co.firebaseapp.com",
  projectId: "crown-co",
  storageBucket: "crown-co.appspot.com",
  messagingSenderId: "643804759346",
  appId: "1:643804759346:web:7eb311c2e6532d04da832b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const loadingMessage = document.getElementById("loading-message");

window.addEventListener("load", () => {
  console.log("Page loaded. Checking authentication state...");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      console.log("No user is logged in.");
      window.location.href = "login-page.html"; // Redirect to login
    }
  });
});
