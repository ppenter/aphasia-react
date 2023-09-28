import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import en from './locales/en/translation.json'
import th from './locales/th/translation.json'

const resources = {
  en: {
    default: en,
  },
    th: {
      default: th,
    }
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng:"th", //default language
});

export default i18next;