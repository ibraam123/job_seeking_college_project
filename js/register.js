import { auth, provider } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const registerForm = document.getElementById("registerForm");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const googleBtn = document.getElementById("google-register-btn");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (registerPassword.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value);
    alert("Registration success");
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});

googleBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
});
