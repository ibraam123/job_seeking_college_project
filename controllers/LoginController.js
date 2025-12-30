// controllers/LoginController.js
import UserModel from "../models/UserModel.js";

export default class LoginController {
    static async login(email, password) {
        const user = await UserModel.login(email, password);

        if (!user) {
            alert("Invalid credentials");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        }));

        window.location.href = "profile.html";
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }
}
