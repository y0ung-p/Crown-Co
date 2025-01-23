import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

// Check user authentication on page load
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user.email);

    // Display user-specific data (if needed)
    document.getElementById('user-name').textContent = `Welcome, ${user.displayName || 'User'}!`;
  } else {
    // Redirect to login if no user is signed in
    window.location.href = 'index.html';
  }
});

