import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DeTranslation } from "./languages/DeTranslation";
import { EnTranslation } from "./languages/EnTranslation";
import { getUserCountryCodeFromFirestore } from "../firebase"; // Import the Firestore helper function
import { auth } from '../firebase'; // Import Firebase auth instance
import { User } from "firebase/auth"; // Use the User type from firebase/auth
import { Languages } from "./languages/Languages";

// Define the resources with translations
const resources = {
  de: {
    translation: DeTranslation,
  },
  en: {
    translation: EnTranslation,
  },
};

// Function to determine the initial language
const determineInitialLanguage = async (): Promise<string> => {
  // Wait for Firebase authentication state to be established
  const currentUser = await new Promise<User | null>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Unsubscribe from the listener once we have the user
      resolve(user);
    });
  });

  if (currentUser) {
    try {
      // Attempt to get the language code from Firestore
      const firestoreLanguageCode = await getUserCountryCodeFromFirestore(currentUser.uid);
      if (firestoreLanguageCode) {
        console.log("Language from Firestore:", firestoreLanguageCode);
        return firestoreLanguageCode;
      }
    } catch (error) {
      console.error("Error retrieving language from Firestore:", error);
    }
  }

  // Fallback to browser language if Firestore does not have a language code
  const browserLanguage = navigator.language || navigator.languages[0];
  console.log("Fallback to browser language:", browserLanguage);
  return browserLanguage.startsWith("de") ? "de" : "en";
};

// Initialize i18next with the determined language
const initializeI18n = async (): Promise<void> => {
  const initialLanguage = await determineInitialLanguage();

  await i18n.use(initReactI18next).init({
    resources,
    supportedLngs: Object.keys(resources),
    lng: initialLanguage, // Set the initial language
    fallbackLng: initialLanguage, // Use the same language as fallback
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
  });
};

type Language = {
  code: string;
  displayCode: string;
  name: string | undefined;
};

// Function to get the list of supported languages with their native names
export function getSupportedLanguages(): Language[] {
  const supportedLanguages = Object.keys(resources);

  // Create an instance of Intl.DisplayNames for displaying language names
  const displayNames = new Intl.DisplayNames(i18n.language, {
    type: "language",
  });

  // Map supported languages to their respective display names and codes
  return supportedLanguages.map((language) => ({
    code: language,
    displayCode: language.toLocaleUpperCase(),
    name: displayNames.of(language),
  }));
}

export { initializeI18n, i18n };