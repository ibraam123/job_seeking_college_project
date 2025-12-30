// views/RegisterView.js
import RegisterController from "../controllers/RegisterController.js";

const registerForm = document.getElementById("registerForm");
const googleBtn = document.getElementById("google-register-btn");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        await RegisterController.register(email, password);
        alert("Registration success!");
        // Redirect to browse-job.html
        window.location.href = "browse-job.html";
    } catch (err) {
        alert(err.message);
    }
});

googleBtn.addEventListener("click", async () => {
    try {
        await RegisterController.registerWithGoogle();
        window.location.href = "browse-job.html";
    } catch (err) {
        alert(err.message);
    }
});
