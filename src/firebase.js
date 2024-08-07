import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  getDoc,
    setDoc,
  deleteDoc,
  arrayUnion,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  initializeAuth,
  indexedDBLocalPersistence,
} from "firebase/auth";
import { Capacitor } from "@capacitor/core";
import { TranslationKeys } from "./translation/types/TranslationKeys";
import { t } from "i18next";
import {Languages} from "./translation/languages/Languages";

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
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(/*settings*/ {}),
});

function whichAuth() {
  let auth;
  if (Capacitor.isNativePlatform()) {
    auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  } else {
    auth = getAuth();
  }
  return auth;
}

export const auth = whichAuth();

const analytics = getAnalytics(app);

export const handleFirebaseError = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return t(TranslationKeys.auth_invalid_email);
    case "auth/invalid-credential":
      return t(TranslationKeys.auth_invalid_credential);
    case "auth/user-disabled":
      return t(TranslationKeys.auth_user_disabled);
    case "auth/user-not-found":
      return t(TranslationKeys.auth_user_not_found);
    case "auth/wrong-password":
      return t(TranslationKeys.auth_wrong_password);
    case "auth/email-already-in-use":
      return t(TranslationKeys.auth_email_already_in_use);
    case "auth/weak-password":
      return t(TranslationKeys.auth_weak_password);
    case "auth/too-many-requests":
      return t(TranslationKeys.auth_too_many_requests);
    default:
      return error.message;
  }
};

export async function deleteAllChatsByUID(uid) {
  const chatsCollectionRef = collection(db, "chats");
  try {
    const chatsQuerySnapshot = await getDocs(
      query(chatsCollectionRef, where("user", "==", uid)),
    );
    chatsQuerySnapshot.docs.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error getting chats from Firestore:", error);
  }
}


export const getUserCountryCodeFromFirestore = async (uid) => {
  try {
    // Define a query to find the document where the UID property matches
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first matching document
      const docSnap = querySnapshot.docs[0];
      return docSnap.data().languageCode || null;
    } else {
      return null; // No document found with the given UID
    }
  } catch (error) {
    console.error('Error fetching user data from Firestore:', error);
    return null;
  }
};


export async function removeChat(id) {
  const chatDocRef = doc(db, "chats", id);
  try {
    await deleteDoc(chatDocRef);
  } catch (error) {
    console.error("Error removing chat from Firestore:", error);
  }
}

export async function getChatIDsFromUID(uid) {
  const chatsCollectionRef = collection(db, "chats");
  try {
    const chatsQuerySnapshot = await getDocs(
      query(chatsCollectionRef, where("user", "==", uid)),
    );
    return chatsQuerySnapshot.docs.map((doc) => {
      return doc.id;
    });
  } catch (error) {
    console.error("Error getting chats from Firestore:", error);
  }
}

export async function getChatsFromUID(uid) {
  const chatsCollectionRef = collection(db, "chats");
  try {
    const chatsQuerySnapshot = await getDocs(
      query(chatsCollectionRef, where("user", "==", uid)),
    );
    return chatsQuerySnapshot.docs.map((doc) => {
      return {
        data: doc.data(),
        id: doc.id,
      };
    });
  } catch (error) {
    console.error("Error getting chats from Firestore:", error);
  }
}

export async function createChat(firstMessage) {
  const chatRef = await addDoc(collection(db, "chats"), {
    user: auth.currentUser.uid,
    messages: [firstMessage],
    timestamp: new Date(),
    title: "New Chat",
  });
  return chatRef.id;
}

export async function reactToMessage(chatId, messageContent, reaction) {
  try {
    const chatRef = doc(db, "chats", chatId);

    const chatDoc = await getDoc(chatRef);
    if (!chatDoc.exists) {
      throw new Error(`Chat with ID ${chatId} does not exist.`);
    }

    const chatData = chatDoc.data();
    if (!chatData || !Array.isArray(chatData.messages)) {
      throw new Error(
        `Chat data is invalid or messages field is not an array.`,
      );
    }

    const messages = chatData.messages;
    const messageIndex = messages.findIndex(
      (message) => message.message === messageContent,
    );

    if (messageIndex === -1) {
      throw new Error(`Message with content "${messageContent}" not found.`);
    }

    if (reaction === "like") {
      const message = messages[messageIndex];
      message.isLiked = !message.isLiked;
    } else if (reaction === "dislike") {
      const message = messages[messageIndex];
      message.isDisliked = !message.isDisliked;
    }

    // Write the updated messages array back to Firestore
    chatData.messages = messages;
    await updateDoc(chatRef, "messages", messages);
  } catch (error) {
    console.error("Error updating message: ", error);
  }
}

export async function changeChatTitle(id, newTitle) {
  const chatDocRef = doc(db, "chats", id); // Get a reference to the chat document

  try {
    await updateDoc(chatDocRef, {
      title: newTitle,
    });
  } catch (error) {
    console.error("Error updating chat title:", error);
    throw new Error("Failed to update chat title");
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
  if (newMessage && id) {
    console.log(newMessage, id);
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
    // Delete the user's document from Firestore
    await deleteUserFromFirestore(user.uid);

    // Delete the user from Firebase Auth
    await deleteUser(user);
  } catch (error) {
    if (error.code === 'auth/requires-recent-login') {
      throw new Error('Recent login required');
    } else {
      throw error; // Other errors are thrown as is
    }
  }
};

async function deleteUserFromFirestore(uid) {
  try {
    const userDocRef = doc(db, 'users', uid);
    await deleteDoc(userDocRef);
    console.log('User document deleted successfully');
  } catch (error) {
    console.error('Error deleting user document:', error);
    throw error;
  }
}


export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export async function updateUserLanguage(uid, newLanguageCode = 'ENG') {
  try {
    const userDocRef = doc(db, 'users', uid); // Reference to the user's document

    // Check if the user's document already exists
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // If the document exists, update the language code
      await updateDoc(userDocRef, {
        language: newLanguageCode,
      });
      console.log('User language updated successfully');
    } else {
      // If the document does not exist, create it with the default language code
      await setDoc(userDocRef, {
        uid: uid,
        language: newLanguageCode,
      });
      console.log('User document created successfully with language code');
    }
  } catch (error) {
    console.error('Error updating or creating user document:', error);
    throw error;
  }
}


export const signUp = async (email, password, languageCode = Languages.English) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    const user = userCredential.user;

    // Add a document for the user in Firestore
    await addUserToFirestore(user.uid, languageCode);
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

async function addUserToFirestore(uid, languageCode) {
  try {
    const userDocRef = doc(db, 'users',uid); // 'users' is the collection name
    await setDoc(userDocRef, {
      uid: uid,
      languageCode: languageCode,
    });
    console.log('User document created successfully');
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

export const updateUserLanguageCodeInFirestore = async (
    uid,
    languageCode
) => {
  try {
    // Reference the 'users' collection and create a query to find the document with the matching UID
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first matching document
      const userDocRef = querySnapshot.docs[0].ref;

      // Update the language code field
      await updateDoc(userDocRef, {
        languageCode,
      });

      console.log(`Language code updated to ${languageCode} for user ${uid}.`);
    } else {
      await addUserToFirestore(uid, languageCode)
      console.log(`No user found with UID: ${uid}`);
    }
  } catch (error) {
    console.error('Error updating language code:', error);
    throw new Error('Unable to update language code.');
  }
};
