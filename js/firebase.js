import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeBzHDSGdEDAnhDEhO6kZpIwpj2Y7EwrM",
  authDomain: "jobboardweb-f988b.firebaseapp.com",
  projectId: "jobboardweb-f988b",
  storageBucket: "jobboardweb-f988b.appspot.com",
  messagingSenderId: "720883540860",
  appId: "1:720883540860:web:cfc4efc793d27293cc3af9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
