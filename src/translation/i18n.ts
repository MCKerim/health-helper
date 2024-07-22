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

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  supportedLngs: Object.keys(resources),
  fallbackLng: "de",

  interpolation: {
    escapeValue: false, // react already safes from xss
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
