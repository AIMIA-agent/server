// Import the functions you need from the SDKs you need
import {getAuth,signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAKDlcIhnUJOaL50u-ZIcXolzK2AwWGX_Y",
    authDomain: "aimia-cc9e2.firebaseapp.com",
    projectId: "aimia-cc9e2",
    storageBucket: "aimia-cc9e2.appspot.com",
    messagingSenderId: "1094903861141",
    appId: "1:1094903861141:web:cc1872b69534de41f4309c",
    measurementId: "G-W4P4HDEW20"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let loginForm = document.getElementById('login-form');

// Assign event listeners to forms and buttons if they exist
if (loginForm) {
    loginForm.addEventListener('submit', handleSignIn);
}


// Handle Sign In
function handleSignIn(e) {
    e.preventDefault();
    console.log('Sign-in attempt initiated');

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    console.log(emailInput)

    if (!emailInput || !passwordInput) {
        console.error('Email or password input not found');
        alert('Error: Email or password input not found');
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        console.error('Email or password is empty');
        alert('Please enter both email and password');
        return;
    }

    console.log('Attempting to sign in with:', email);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user.email);
            alert('Login successful! Welcome, ' + user.email);
            
            // Redirect to the dashboard page
            window.location.href = './index.html';
        })
        .catch((error) => {
            console.error('Login error:', error.code, error.message);
            alert('Failed to sign in: ' + error.message);
        });
}
// // Handle Sign Out
// function handleSignOut() {
//     signOut(auth).then(() => {
//         console.log('User signed out');
//         alert('You have been signed out');
//         // Redirect or update UI as needed
//     }).catch((error) => {
//         console.error('Sign out error:', error);
//         alert('Error signing out: ' + error.message);
//     });
// }

// // Monitor authentication state changes
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log('User is signed in with UID:', user.uid);
//         // Additional actions when user is signed in
//     } else {
//         console.log('User is signed out');
//         // Additional actions when user is signed out
//     }
// });
