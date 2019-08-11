exports.isEmpty = value => {
  return !value || !value.trim();
};

exports.capitalize = word => {
  return word.charAt(0).toUpperCase();
};
