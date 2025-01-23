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
