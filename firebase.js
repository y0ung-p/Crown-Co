import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
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
