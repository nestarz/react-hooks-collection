import { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';

export const useLanguage = (parentLg) => {
  var userLang = typeof navigator != "undefined" ? navigator.language || navigator.userLanguage: "fr";
  const [lg, setLanguage] = useState(parentLg ? parentLg : userLang == "fr-FR" ? "fr" : "en");
  if (parentLg != lg && parentLg) setLanguage(parentLg ? parentLg : lg);
  return [lg, () => setLanguage(lg == "fr" ? "en" : "fr")]
}

export const useToggleGlobalLanguage = () => {
  const [ language, setLanguage ] = useGlobal('language');
  const toggleLanguage = () => setLanguage(language == "fr" ? "en" : "fr")
  return [language, toggleLanguage]
}
