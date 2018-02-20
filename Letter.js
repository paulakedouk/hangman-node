function Letter(letter) {
  if (letter !== ' ') {
    letter = '_';
  } else {
    letter = ' ';
  }
}

module.exports = Letter;
