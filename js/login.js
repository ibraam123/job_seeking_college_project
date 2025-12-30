import { auth, provider } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const googleBtn = document.getElementById("google-login-btn");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const result = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );

    const user = result.user;

    
    localStorage.setItem("currentUser", JSON.stringify({
      id: user.uid,
      name: user.displayName && user.displayName !== "John Doe" ? user.displayName : user.email.split('@')[0] || "New User",
      email: user.email
    }));

    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});

googleBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    
    localStorage.setItem("currentUser", JSON.stringify({
      id: user.uid,
      name: user.displayName && user.displayName !== "John Doe" ? user.displayName : user.email.split('@')[0] || "New User",
      email: user.email
    }));

    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});
