const checkValidity = (value, rules) => {
  let isValid = true;
  if (isValid && rules.required) {
    isValid = value.trim() !== ""; //INPUTHANDLER WOULD AHVE UPDATED THE STATE BY NOW..
  }

  if (isValid && rules.minLen) {
    isValid = value.length >= rules.minLen;
  }

  if (isValid && rules.maxLen) {
    isValid = value.length <= rules.maxLen;
  }

  if (isValid && rules.have) {
    for (let ele of rules.have) {
      if (value.indexOf(ele) === -1) {
        isValid = false;
        break;
      }
    }
  }
  return isValid;
};

export { checkValidity };
