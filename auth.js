// auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

// Signup Function
export async function signup(firstName, lastName, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Save additional user data in Firestore
    await setDoc(doc(db, "users", userId), {
      firstName,
      lastName,
      email,
      createdAt: serverTimestamp(),
    });

    alert(`Signup successful! Welcome, ${firstName} ${lastName}`);
    window.location.href = "dashboard.html"; // Redirect to the dashboard
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert(error.message);
  }
}

// Login Function
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      alert(`Welcome back, ${userData.firstName || "User"}!`);
      window.location.href = "dashboard.html"; // Redirect to the dashboard
    } else {
      console.error("User data not found!");
      alert("User data not found. Please contact support.");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert(error.message);
  }
}
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();

// Check User Authentication Status on Page Load
window.addEventListener("load", () => {
  const accountLink = document.querySelector(".navbar a[href='account.html']");
  const logoutBtn = document.getElementById("logout-btn");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      localStorage.setItem("userId", user.uid); // Store user ID for session management
      accountLink.textContent = "Dashboard"; // Update "Account" link to "Dashboard"
      logoutBtn.style.display = "inline-block"; // Show Logout Button
    } else {
      // User is not logged in
      localStorage.removeItem("userId");
      accountLink.textContent = "Account"; // Default back to "Account"
      logoutBtn.style.display = "none"; // Hide Logout Button
    }
  });
});

// Logout Functionality
if (document.getElementById("logout-btn")) {
  document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userId");
        alert("Logged out successfully!");
        window.location.href = "login-page.html";
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  });
}
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();

window.addEventListener("load", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If logged in, redirect to Dashboard
      window.location.href = "dashboard.html";
    } else {
      // If not logged in, redirect to Login/Signup
      window.location.href = "login-page.html";
    }
  });
});

