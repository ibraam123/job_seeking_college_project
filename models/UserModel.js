import { auth } from "../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export default class UserModel {

    
    static getCurrentUser() {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve({
                        id: user.uid,
                        name: user.displayName || "No Name",
                        email: user.email
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }
}
