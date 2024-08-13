import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import en from './locales/en/translation.json'
import th from './locales/th/translation.json'
import speech_en from './locales/en/speech.json'
import speech_th from './locales/th/speech.json'

const resources = {
  en: {
    default: en,
    speech: speech_en,
  },
  th: {
    default: th,
    speech: speech_th,
  }
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng: localStorage.getItem("lang") || 'th',
  // keySeparator: false, // this was the line that I've had to remove to make it work
  keySeparator: '.', // if you want to re-enable it (not "true", but actual separator value)
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;