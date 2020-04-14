const sites = require("./sites")
const translations = require("../translations/translations.json")

const fallbackLng = Object.values(sites).find(site => site.default).siteLanguage

module.exports = {
  debug: false,
  resources: translations,
  lng: fallbackLng,
  fallbackLng,
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: { useSuspense: false },
}
