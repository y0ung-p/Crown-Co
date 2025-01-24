import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();

// When the page loads, check the user's authentication state
window.addEventListener("load", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in; redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      // User is not logged in; redirect to login page
      window.location.href = "login-page.html";
    }
  });
});
