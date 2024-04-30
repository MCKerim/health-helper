import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
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

export async function createChat(firstMessage) {
  // Adjust "chats" to your actual collection name
  try {
    const chatRef = await addDoc(collection(db, "chats"), {
      user: auth.currentUser.uid,
      messages: [firstMessage], // Initialize with the first message
    });
    return chatRef.id;
  } catch (error) {
    console.error("Error creating chat in Firestore:", error);
  }
}

export async function getChat(id) {
  const chatDocRef = doc(db, "chats", id); // Adjust "chats" to your actual collection name
  try {
    const chatDoc = await getDoc(chatDocRef);
    if (chatDoc.exists()) {
      return chatDoc.data();
    } else {
      console.error("Chat not found");
    }
  } catch (error) {
    console.error("Error getting chat from Firestore:", error);
  }
}

export async function saveMessageToChat(newMessage, id) {
  const chatDocRef = doc(db, "chats", id); // Adjust "chats" to your actual collection name
  try {
    const chatDoc = await getDoc(chatDocRef);
    if (chatDoc.exists()) {
      // If chat exists, append the new message
      await updateDoc(chatDocRef, {
        messages: arrayUnion(newMessage),
      });
    } else {
      // If chat does not exist, create it with the new message
      createChat(newMessage);
    }
  } catch (error) {
    console.error("Error saving message to Firestore:", error);
  }
}

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
