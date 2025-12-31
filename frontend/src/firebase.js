import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlTYhEHxfmUB8z4M96NAaNP6l447h0TbI",
  authDomain: "shivam-3f394.firebaseapp.com",
  projectId: "shivam-3f394",
  storageBucket: "shivam-3f394.firebasestorage.app",
  messagingSenderId: "901240152514",
  appId: "1:901240152514:web:e83fa96372715d68ce365b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
