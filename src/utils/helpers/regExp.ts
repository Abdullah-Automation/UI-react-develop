export const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const onlySpecialchars = (str: string) => {
  // Regex to check if a string
  // contains only special
  // characters
  const regex = /^[^a-zA-Z0-9]+$/;

  // If the string is empty
  // then print No
  if (str.length < 1) {
    return true;
  }

  // Find match between given
  // string & regular expression
  const matchedAuthors = regex.test(str);

  // Print Yes If the string matches
  // with the Regex
  if (matchedAuthors) return true;

  return false;
};
