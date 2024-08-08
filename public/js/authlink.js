// Import the functions you need from the SDKs you need
import {getAuth,signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// Access initialized Firebase App

const firebaseConfig = {
    apiKey: "AIzaSyAKDlcIhnUJOaL50u-ZIcXolzK2AwWGX_Y",
    authDomain: "aimia-cc9e2.firebaseapp.com",
    projectId: "aimia-cc9e2",
    storageBucket: "aimia-cc9e2.appspot.com",
    messagingSenderId: "1094903861141",
    appId: "1:1094903861141:web:cc1872b69534de41f4309c",
    measurementId: "G-W4P4HDEW20"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authLink = document.getElementById('loginButton')
// Check and handle the authentication status
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, set the button to "Logout"
        authLink.textContent = 'Logout';
    } else {
        // No user is logged in, set the button to "Log In"
        authLink.textContent = 'Log In';
    }
});

// Handle button click events
authLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (authLink.textContent === 'Logout') {
        // Handle logout
        signOut(auth).then(() => {
            alert('Successfully signed out!');
            window.location.reload(); // Optionally redirect or refresh the page
        }).catch((error) => {
            alert(error.message);
            console.log(error.code, error.message);
        });
    } else {
        // Redirect to the login page for login
        window.location.href = 'login.html';
    }
});