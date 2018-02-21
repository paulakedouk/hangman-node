class GameLetter {
  // create a letter object for each char in current word
  constructor(letter) {
    this.character = letter !== ' ' ? '_' : ' ';
    this.letter = letter;
    this.currentVal = this.character;
    this.isLetter = false;
  }
}

module.exports = GameLetter;
