// Firebase Config (Replace with your project's credentials)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Signup Function
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('signup-first-name').value;
  const lastName = document.getElementById('signup-last-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    // Create a new user in Firebase Authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

    // Save additional user data in Firestore (or Realtime Database)
    await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
      firstName: firstName,
      lastName: lastName,
      email: email
    });

    alert('Signup successful! Welcome, ' + firstName + ' ' + lastName);
  } catch (error) {
    console.error('Error signing up:', error.message);
    alert(error.message);
  }
});
// Login Function
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

    // Fetch user data from Firestore
    const userDoc = await firebase.firestore().collection('users').doc(userCredential.user.uid).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      alert('Welcome back, ' + userData.firstName + ' ' + userData.lastName + '!');
      // Redirect to user dashboard or personalized menu
    } else {
      console.error('User data not found!');
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    alert(error.message);
  }
});

