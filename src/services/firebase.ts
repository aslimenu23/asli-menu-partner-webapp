import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDOBtWoANArNZ_X39kXEzc-3t5i74VBQZ8",
  authDomain: "aslimenu.firebaseapp.com",
  projectId: "aslimenu",
  storageBucket: "aslimenu.appspot.com",
  messagingSenderId: "606195351596",
  appId: "1:606195351596:web:a122a6500f37c9d5251189",
  measurementId: "G-QHC19RWHQX",
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
export {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
