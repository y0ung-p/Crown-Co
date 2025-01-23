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
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase Authentication
const auth = getAuth();

// Dummy Product Data
const products = [
  { id: 1, name: "Crown Hat", price: 25, image: "hat.jpg" },
  { id: 2, name: "Crown Hoodie", price: 50, image: "hoodie.jpg" },
  { id: 3, name: "Crown T-Shirt", price: 20, image: "tshirt.jpg" },
  { id: 4, name: "Crown Sneakers", price: 100, image: "sneakers.jpg" },
];

// DOM Elements
const productList = document.querySelector(".product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const userRewards = document.getElementById("user-rewards span");
const userName = document.getElementById("user-name span");
const logoutBtn = document.getElementById("logout-btn");

// Cart and Rewards
let cart = [];
let rewards = 0;

// Render Products
function renderProducts() {
  products.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product-item");
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(productEl);
  });
}

// Add Product to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  calculateCartTotal();
  renderCart();
}

// Render Cart
function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const cartItemEl = document.createElement("div");
    cartItemEl.classList.add("cart-item");
    cartItemEl.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(cartItemEl);
  });
}

// Calculate Cart Total
function calculateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Checkout (Earn Rewards)
document.getElementById("checkout-btn").addEventListener("click", () => {
  const total = parseFloat(cartTotal.textContent);
  rewards += Math.floor(total / 10); // Earn 1 point for every $10 spent
  userRewards.textContent = rewards;
  alert(`Checkout successful! You earned ${Math.floor(total / 10)} points.`);
  cart = [];
  calculateCartTotal();
  renderCart();
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("userId");
    window.location.href = "login-page.html";
  });
});

// Initialize Dashboard
auth.onAuthStateChanged((user) => {
  if (user) {
    userName.textContent = user.email;
    renderProducts();
  } else {
    window.location.href = "login-page.html";
  }
});

// Add Product to Cart Button Events
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
    addToCart(Number(e.target.dataset.id));
  }
  if (e.target.tagName === "BUTTON" && e.target.dataset.index) {
    const index = Number(e.target.dataset.index);
    cart.splice(index, 1);
    calculateCartTotal();
    renderCart();
  }
});



