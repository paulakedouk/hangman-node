var inquirer = require('inquirer');
var chalk = require('chalk');
var randomWords = require('random-words');
var word = randomWords({ exactly: 1 })[0];
var choices = [];
var userGuesses = [];
var wordLine = [];
var winCounter = 0;
var choicesLeft = 10;

function checkLetter(user) {
  // Check if the user has already chosen that letter before

  if (choices.includes(user.guess) || userGuesses.includes(user.guess)) {
    console.log("\nYou've chosen that letter before");
    console.log('________________________________\n');
    guessLetter();
  } else {
    // If the user guess is greater than -1 it means that the letter exists in that word
    if (word.indexOf(user.guess) > -1) {
      for (var i = 0; i < word.length; i++) {
        // Go through the word array, find the letter and then replace the '_' with that letter
        if (user.guess === word.charAt(i)) {
          userGuesses.push(user.guess);
          // Change color to green
          console.log('\n' + chalk.green('Correct!'));
          wordLine[i] = user.guess;
          // Shows the word with the new letter
          console.log('Word: ' + wordLine.join(' ') + '\n');
          winCounter++;
          console.log('________________________________\n');
          guessLetter();
          finishGame(word);
        }
      }
    } else {
      choices.push(user.guess);
      console.log('\n' + chalk.red('Incorrect!'));
      console.log('Chosen letters: ' + choices);
      choicesLeft--;
      console.log('\nChoices left: ' + choicesLeft);
      console.log('________________________________\n');
      guessLetter();
      finishGame(word);
    }
  }
}

// Function for the user to choose the letter
function guessLetter() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'guess',
        message: 'Guess a letter: ',
        validate: function(str) {
          if (str.length != 1) return false;
          var regEx = new RegExp('^[a-zA-Zs]{1,1}$');
          return regEx.test(str);
        }
      }
    ])
    .then(function(user) {
      // Calling function checkLetter() and passing the letter that the user chose as an argument
      CheckLetter(user);
    });
}

module.exports = checkLetter;
