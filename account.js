import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration (ensure your Firebase config is correct)
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

// Wait for the page to load
window.addEventListener("load", () => {
  const loadingMessage = document.getElementById("loading-message");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If user is logged in, redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      // If user is not logged in, redirect to login/signup
      window.location.href = "login-page.html";
    }
  }, (error) => {
    // If there's an error with Firebase, show it
    loadingMessage.textContent = `Error: ${error.message}`;
  });
});
