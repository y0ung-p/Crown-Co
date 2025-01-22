// Initialize Firebase (ensure this is configured correctly in your project)
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
  });
}

// Signup Function
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('signup-first-name').value.trim();
  const lastName = document.getElementById('signup-last-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  try {
    // Create a new user in Firebase Authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

    // Save additional user data in Firestore
    await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
      firstName,
      lastName,
      email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    alert(`Signup successful! Welcome, ${firstName} ${lastName}`);
    window.location.href = 'dashboard.html'; // Redirect to the dashboard
  } catch (error) {
    console.error('Error signing up:', error.message);
    alert(error.message);
  }
});

// Login Function
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

    // Fetch user data from Firestore
    const userDoc = await firebase.firestore().collection('users').doc(userCredential.user.uid).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      alert(`Welcome back, ${userData.firstName || 'User'}!`);
      window.location.href = 'dashboard.html'; // Redirect to the dashboard
    } else {
      console.error('User data not found!');
      alert('User data not found. Please contact support.');
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    alert(error.message);
  }
});
