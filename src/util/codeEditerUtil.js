const languageMap = (languages, targetLanguage) => {
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].value === targetLanguage) {
      return languages[i].label.toUpperCase();
    }
  }
  return '';
};

const getLanguagesArray = languages => {
  const editorModeMap = {
    'C++': 'text/x-c++src',
    JAVA: 'text/x-java',
    PYTHON3: 'python',
    C: 'text/x-csrc',
    GO: 'text/x-go',
  };
  const returnArray = [];
  languages.forEach(item => {
    if (editorModeMap[item.toUpperCase()] !== undefined || editorModeMap[item.toUpperCase()] != null) {
      returnArray.push({ label: item.toUpperCase(), value: editorModeMap[item.toUpperCase()] });
    }
  });
  return returnArray;
};

export { languageMap, getLanguagesArray };
