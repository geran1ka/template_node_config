export const getStringFirstLetterCapitalized = str => {
  if (typeof str === 'string') {
    return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase();
  }
  return str;
};
