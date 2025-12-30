// Function to render the navbar user name from localStorage
function renderNavbarUser() {
    const userDisplayName = document.getElementById("user-display-name");
    const visitorButtons = document.getElementById("visitor-buttons");
    const userDropdown = document.getElementById("user-dropdown");
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        // If no user is logged in, show visitor buttons and hide user dropdown
        if (visitorButtons) visitorButtons.classList.remove("d-none");
        if (userDropdown) userDropdown.classList.add("d-none");
        return;
    }

    // If user is logged in, hide visitor buttons and show user dropdown
    if (visitorButtons) visitorButtons.classList.add("d-none");
    if (userDropdown) userDropdown.classList.remove("d-none");

    if (userDisplayName) {
        userDisplayName.textContent = user.name || "User";
    }
}

// Function to handle logout
function handleLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("currentUserProfile");
            window.location.href = "login.html";
        });
    }
}

// Initialize navbar functionality on page load
document.addEventListener("DOMContentLoaded", () => {
    renderNavbarUser();
    handleLogout();
});
