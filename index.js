const { EASY_WORDS_TO_GUESS, HANGMAN_PICS, HARD_WORDS_TO_GUESS } = require('./constants');
// In node.js: install a prompt library by running: `uz` in the current folder
const prompt = require("prompt-sync")();

//Welcome message
console.log(`
Hello and welcome to the Hangman Game!
To start the game, you have to choose difficulty by typing in 'easy' or 'hard'.
You start with 6 lives, if you loose them all -> GAME OVER!
Have fun! :)
`)

//Choosing random word by level of difficulty
let randomWords = [];
let answer = prompt("Choose difficulty: ");

while (answer !== "easy" && answer !== "hard") {
    console.log("invalid input");
    answer = prompt("Choose difficulty: ");
}

let wordsForDifficulty;
if (answer === "easy") {
    wordsForDifficulty = EASY_WORDS_TO_GUESS;
    //lives = 6; // TODO: Implement different lives for different levels
} else if (answer === "hard") {
    wordsForDifficulty = HARD_WORDS_TO_GUESS;
    //lives = 3;
}

const word = wordsForDifficulty[Math.floor(Math.random() * wordsForDifficulty.length)];

let lives = 6;
let gameStatus = [];
let wrongGuessed = [];
let alreadyGuessed = [];
let correctLetters = [];

//display missing letters
for (let i = 0; i < word.length; i++) {
    gameStatus[i] = '_';
}
console.log(gameStatus.join(' '));

//              *** Game Flow ***

while (lives > 0) {
    let guess = prompt("Type in a letter: ").toLowerCase();
    if (guess == 'quit') {
        break;
    }

    if (guess.length !== 1) {
        console.log("Please enter a single letter.");
        continue;
    }

    // ALTERNATIVE
    // while (guess.length !== 1) {
    //     console.log("Please enter a single letter.");
    //     guess = prompt("Type in a letter: ").toLowerCase();
    // }

    let isRepeated = false;

    // checking for repeated letters
    for (let k=0; k <= alreadyGuessed.length; k++ ) {
        if(alreadyGuessed[k] === guess) {
            console.log("You already tried that!");
            lives++;
            isRepeated = true;
            break;
        } 
    }

    if (isRepeated) {
        continue;
    }

    let guessedMatch = false;
    let wordIndexes = [];

    //checking if input letter matches any letters of the word
    for (let j = 0; j < word.length; j++){
        if (word[j] === guess) {
            guessedMatch = true;
            wordIndexes.push(j);
        } 
    }
    
    if (guessedMatch) {
        for (let i = 0; i < wordIndexes.length; i++) {
            gameStatus[wordIndexes[i]] = guess;
        }

        console.log("You've guessed right! Go on!");
        console.log("Lives left: "+lives);
        correctLetters.push(guess);
         
    } else {
        lives = lives - 1;
        console.log("Lives left: " + lives);
        wrongGuessed.push(guess);
        console.log("Wrong guesses: " + wrongGuessed);
    }
    alreadyGuessed.push(guess);

    //Display of hangman pics based on lives
    console.log(HANGMAN_PICS[lives]);

    //Game win
    if (correctLetters.length === word.length) {
        console.log("Yay! You've won! :)");
        break;
    }

    //Game lost
    if (lives === 0) {
        console.log("You've lost! :(");
        console.log("The word was: "+word);
        break;
    }
    
    console.log(gameStatus.join(' '));

}




    
















