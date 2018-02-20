var inquirer = require('inquirer');
const chalk = require('chalk');
var randomWords = require('random-words');

// Create a function that start the game and show the statistics

var winCounter = 0;
var choicesLeft = 10;
var choices = [];
var userGuesses = [];
var wordLine = [];
var word = randomWords({ exactly: 1 })[0];
var round = 0;
var win = 0;
var lose = 0;

// Console a draw to start the game
console.log(`
000000000000000000000000000
00000_BY_PAULA_KEDOUK_00000
000   000     000      
000  000    0000000    
000 000    (0000000)   
00000       0000000    
0000          000      
000         0000000    
000        00 000 00   
000       00  000  00  
000      00   000   00 
000           000      
000         0000000    
000       000     000  
000      000       000 
000      000       000 
000000                 
`);

function startGame() {
  // Shows the number of letters with underline
  for (var i = 0; i < word.length; i++) {
    wordLine.push('_');
  }
  round++;
  console.log('Round: ' + round);
  console.log('________________________________\n');
  console.log('Word: ' + wordLine.join(' '));
  console.log(word);
  guessLetter();
}
startGame();

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
      checkLetter(user);
    });
}

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
      if (choicesLeft > 0) {
        guessLetter();
      }
      finishGame(word);
    }
  }
}

function finishGame(word) {
  if (winCounter === word.length) {
    console.log('\n' + chalk.green('You got it! New word: ') + '\n');
    win++;
    console.log('Win: ' + win + ', Lose: ' + lose);
    console.log('________________________________\n');
    newRound();
  } else if (choicesLeft === 0) {
    console.log('The word has: ' + word.toUpperCase());
    console.log('\n' + chalk.red('Game over! New word: ') + '\n');
    console.log('________________________________\n');
    lose++;
    console.log('Win: ' + win + ', Lose: ' + lose);
    newRound();
  }
}

function newRound() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Do you want to start a new game?',
        name: 'newGame',
        default: true
      }
    ])
    .then(function(response) {
      if (response.newGame) {
        reset();
        startGame();
      } else {
        console.log('See you next time!');
      }
    });
}

function reset() {
  winCounter = 0;
  choicesLeft = 10;
  choices = [];
  userGuesses = [];
  wordLine = [];
  word = new Word(randomWords({ exactly: 1 })[0]);
  round = 0;
  win = 0;
  lose = 0;
}
