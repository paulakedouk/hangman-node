function Letter(letter) {
  this.letter = letter;
  if (this.character) {
  }
}

var newLetter = new Letter('A');

console.log(newLetter.letter);

module.exports = Letter;
