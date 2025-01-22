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
