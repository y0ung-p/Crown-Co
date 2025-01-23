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
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

// Logout button click handler
document.getElementById('logout-button').addEventListener('click', async () => {
  try {
    await signOut(auth); // Sign out the user from Firebase
    localStorage.removeItem('userId'); // Optional: Clear user data from localStorage
    alert('Logged out successfully!');
    window.location.href = 'index.html'; // Redirect to the login page
  } catch (error) {
    console.error('Logout error:', error.message);
    alert('Failed to log out. Please try again.');
  }
});


