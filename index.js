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

var word = randomWords({ exactly: 1 })[0];

// Show that word

for (var i = 0; i < word.length; i++) {
  wordLine.push('_');
}
console.log('________________________________\n');
console.log('Word: ' + wordLine.join(' '));
console.log(word);
game();

function game() {
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
  if (choicesLeft === 1) {
    console.log('________________________________\n');
    console.log('\n' + chalk.red('GAME OVER!') + '\n');
    console.log('________________________________\n');
  } else {
    if (word.indexOf(user.guess) > -1) {
      for (var i = 0; i < word.length; i++) {
        if (user.guess === word.charAt(i)) {
          console.log('\n' + chalk.green('Correct!'));

          wordLine[i] = user.guess;
          console.log('Word: ' + wordLine.join(' ') + '\n');
          console.log('________________________________\n');
          game();
        }
      }
    } else {
      console.log('\n' + chalk.red('Wrong!'));
      choices.push(user.guess);

      console.log('Chosen letters: ' + choices);
      choicesLeft--;
      console.log('\nChoices left: ' + choicesLeft);
      console.log('________________________________\n');
      game();
    }
  }
}
