var inquirer = require('inquirer');
const chalk = require('chalk');
var randomWords = require('random-words');

// Create a function that start the game and show the statistics

var hasLetter = false;
var choices = [];
var shot = 10;

var win = 0;
var loss = 0;
var choicesLeft = 10;
var wordLine = [];
var rightLetter = [];
var wrongLetter = [];
var winCounter = 0;
var userGuesses = [];
var word = randomWords({ exactly: 1 })[0];

function startGame() {
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

  // Show that word

  for (var i = 0; i < word.length; i++) {
    wordLine.push('_');
  }
  console.log('________________________________\n');
  console.log('Word: ' + wordLine.join(' '));
  console.log(word);
  guessLetter();
}
startGame();

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
      checkLetter(user);
    });
}

function checkLetter(user) {
  if (choices.includes(user.guess) || userGuesses.includes(user.guess)) {
    console.log("\nYou've chosen that letter before");
    console.log('________________________________\n');
  } else {
    if (word.indexOf(user.guess) > -1) {
      for (var i = 0; i < word.length; i++) {
        if (user.guess === word.charAt(i)) {
          userGuesses.push(user.guess);
          console.log('\n' + chalk.green('Correct!'));
          wordLine[i] = user.guess;
          console.log('Word: ' + wordLine.join(' ') + '\n');
          winCounter++;
          console.log('________________________________\n');
          finishGame(word);
        }
      }
    } else {
      choices.push(user.guess);
      console.log('\n' + chalk.red('Wrong!'));
      console.log('Chosen letters: ' + choices);
      choicesLeft--;
      console.log('\nChoices left: ' + choicesLeft);
      console.log('________________________________\n');

      finishGame(word);
    }
  }
  guessLetter();
  finishGame(word);
}

function finishGame(word) {
  var finalWord = wordLine.join('').split(',');
  if (finalWord === word) {
    console.log('\n' + chalk.green('YOU WON!') + '\n');
    console.log('________________________________\n');
    reset();
    console.log('\n');
  } else if (choicesLeft === 0) {
    console.log('\n' + chalk.red('GAME OVER!') + '\n');
    console.log('________________________________\n');
    reset();
    console.log('\n');
  }
}

function reset() {
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
        startGame();
      }
    });
}
