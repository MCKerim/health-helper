import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUBvXjjPDy2ByKlT2S1_nZvhtZ28nxTXY",
  authDomain: "health-helper-0.firebaseapp.com",
  projectId: "health-helper-0",
  storageBucket: "health-helper-0.appspot.com",
  messagingSenderId: "1024000881087",
  appId: "1:1024000881087:web:1eda1c68457386e21df10a",
  measurementId: "G-EF3NW2WPX2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  console.log(user);
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const removeUserAccount = async () => {
  const user = auth.currentUser;
  try {
    await deleteUser(user);
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      throw new Error("Recent login required");
    } else {
      throw error; // Other errors are thrown as is
    }
  }
};

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
};
export const db = getFirestore(app);
export const auth = getAuth(app);
