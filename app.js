// app.js
import { signup, login } from "./auth.js";

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("signup-first-name").value.trim();
  const lastName = document.getElementById("signup-last-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  signup(firstName, lastName, email, password);
});

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  login(email, password);
});
