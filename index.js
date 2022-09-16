const { EASY_WORDS_TO_GUESS, HANGMAN_PICS, HARD_WORDS_TO_GUESS} = require('./constants');
const constants = require('./constants');
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

        if (answer === "easy") {
            randomWords= EASY_WORDS_TO_GUESS[Math.floor(Math.random() * EASY_WORDS_TO_GUESS.length)];
            //lives = 6;
        } else if (answer === "hard") {
            randomWords = HARD_WORDS_TO_GUESS[Math.floor(Math.random() * HARD_WORDS_TO_GUESS.length)];
            //lives = 3;
        } 

let word = randomWords;
let lives = 6;
let gameStatus = [];

//display missing letters
for (let i = 0; i < word.length; i++) {
    gameStatus[i] = '_';
}
console.log(gameStatus.join(' '));


let wrongGuessed = [];
let alreadyGuessed = [];
let correctLetters = [];


//              *** Game Flow ***

while (lives > 0) {
    let guess = prompt("Type in a letter: ").toLocalCase();
    let guessedMatch = true;
    let wordIndex = 0;
    //let repeatedLetters = 0;
    if (guess == 'quit') {
        break;
    } else if (guess.length !== 1) {
        console.log("Please enter a single letter.");
    } else {
        // checking for repeated letters
        for (let k=0; k <= alreadyGuessed.length; k++ ) {
            if(alreadyGuessed[k] === guess) {
                console.log("You already tried that!");
                repeatedLetters = k;
                lives++;
                break;
            } 
        }
       
        //checking if input letter matches any letters of the word
        for (let j = 0; j < word.length; j++){
            if(word[j] === guess){
               guessedMatch = true;
               wordIndex = j;
                break;
            } else if(word[j] !== guess) {
                guessedMatch = false;
            } 
        
        }  if(guessedMatch === true) {
            gameStatus[wordIndex] = guess;
            console.log("You've guessed right! Go on!");
            console.log("Lives left: "+lives);
            correctLetters.push(guess);
         
        } else if (guessedMatch === false){
            lives = lives - 1;
            console.log("Lives left: "+lives);
            wrongGuessed.push(guess);
            console.log("Wrong guesses: "+wrongGuessed);
        }
        alreadyGuessed.push(guess);
    } 

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




    
















