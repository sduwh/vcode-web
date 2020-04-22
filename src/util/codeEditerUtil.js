const languageMap = (languages, targetLanguage) => {
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].value === targetLanguage) {
      return languages[i].label.toUpperCase();
    }
  }
  return '';
}

export {
  languageMap
}