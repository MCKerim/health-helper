import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DeTranslation } from "./languages/DeTranslation";
import { EnTranslation } from "./languages/EnTranslation";

const resources = {
  de: {
    translation: DeTranslation,
  },
  en: {
    translation: EnTranslation,
  },
};

function determineInitialLanguage(): string {
  const browserLanguage = navigator.language || navigator.languages[0];
  console.log("Fallback to browser language:", browserLanguage);
  return browserLanguage.startsWith("de") ? "de" : "en";
}

i18n.use(initReactI18next).init({
  resources,
  lng: determineInitialLanguage(),
  supportedLngs: Object.keys(resources),
  fallbackLng: determineInitialLanguage(),

  interpolation: {
    escapeValue: false,
  },
});

type Language = {
  code: string;
  displayCode: string;
  name: string | undefined;
};

// Function to get the list of supported languages with their native names
export function getSupportedLanguages(): Language[] {
  const supportedLanguages = Object.keys(resources);

  const displayNames = new Intl.DisplayNames(i18n.language, {
    type: "language",
  });

  return supportedLanguages.map((language) => ({
    code: language,
    displayCode: language.toLocaleUpperCase(),
    name: displayNames.of(language),
  }));
}

export default i18n;
