// views/LoginView.js
import LoginController from "../controllers/LoginController.js";

const loginForm = document.getElementById("loginForm");
const googleBtn = document.getElementById("google-login-btn");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        await LoginController.login(email, password);
        alert("Login success!");
        // Redirect to browse-job.html instead of profile.html
        window.location.href = "browse-job.html";
    } catch (err) {
        alert(err.message);
    }
});

googleBtn.addEventListener("click", async () => {
    try {
        await LoginController.loginWithGoogle();
        window.location.href = "browse-job.html";
    } catch (err) {
        alert(err.message);
    }
});
