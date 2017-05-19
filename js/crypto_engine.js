/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 */

// TO DO
// Encrypted char objects
// - Write a function, so that for each 26 ascii/key char is pressed, it will render the certain fillText
// Create the encrypted string canvas
// - Set the rectangular box areas for each character that needs to be decrypted
// - Possibly each word will be represented on a new row
// - Row width > 15 characters (should be more than length of most words)
// Store a dictionary of plaintext string
// Possibly hashmap decrypted string to see if it matches plaintext strings.
// OR
// If too difficult to hashmap whole string, hashmap each individual char. If all chars hashmap != null
// then initiate end game state.

/** Hardcoded plaintext */
// store an array of plaintext strings
var plaintext = ["THIS IS A TEST MESSAGE LOL",
                 "SUBSTITUTION CIPHERS ARE COOL",
                 "STEALING COMPANY INFORMATION"];


/**
 * Takes in a string value, encrypts it with a shift cipher
 * then adds it to the encrypted variable to be used in-game.
 */
function getEncryptedStr() {
    // choose random string from dictionary
    var chooseStr = Math.floor(Math.random() * 100) % 3;
    var plaintextStr = plaintext[chooseStr];
    console.log("PLAINTEXT = " + plaintextStr);

    // generate random shift value between 1-26
    var shiftVal = (Math.floor(Math.random() * 100) + 1) % 26;
    console.log("SHIFT VALUE = " + shiftVal);

    var encrypted = "";
    var charCode = 0;
    var len = plaintextStr.length;

    // convert plaintext -> encrypted
    for (var i = 0; i < len; i++) {
        // add space to encrypted
        if (plaintextStr.charAt(i) == " ") {
            encrypted += plaintextStr.charAt(i);
            continue;
        }
        charCode = (plaintextStr.charCodeAt(i) + shiftVal) % 26 + 65;
        encrypted += String.fromCharCode(charCode);
    }

    // return encrypted string
    console.log("ENCRYPTED STRING = " + encrypted);
    return encrypted;
}

/** Game variables */
var gameState = 0;                   // 0 = main menu, 1 = game running
var defaultScore = 0;                // score
var defaultTimeLimit = 300;          // 5*60 = 300 seconds countdown timer
var score = defaultScore;
var timeLimit = defaultTimeLimit;

var startBtn = {                  // Button object with boundaries
    x: 350,
    y: 400,
    width: 100,
    height: 40
};

var menuBtn = {                  // Button object with boundaries
    x: 640,
    y: 16,
    width: 110,
    height: 40
};

/** Renders start menu intro, instructions and start game button. */
function resetData() {
    score = defaultScore;
    timeLimit = defaultTimeLimit;
    encryptComplete = false;
    gameState = 0;
}

/** Mouse interactions */
// get mouse positions
function getMousePos(canvas, event) {
    var startButton = canvas.getBoundingClientRect();
    return {
        x: event.clientX - startButton.left,
        y: event.clientY - startButton.top
    };
}

/** check if mouse is inside button */
function isInside(pos, button) {
    return pos.x > button.x && pos.x < button.x+button.width
        && pos.y < button.y+button.height && pos.y > button.y
}

/** game button event listeners **/
canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(canvas, event);
    // start game button
    if (isInside(mousePos, startBtn) && (gameState == 0)) {
        console.log('clicked start game');
        encrypted = getEncryptedStr();
        renderString(encrypted);
        playGame();
    } else {
        console.log('clicked outside start game');
    }
    // main menu button
    if (isInside(mousePos, menuBtn) && (gameState == 1)) {
        console.log('clicked main menu button');
        gameState = 1;
        renderMenu();
    } else {
        console.log('clicked outside main menu button');
    }
}, false);

/** string decryption event listeners **/
str_canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(str_canvas, event);
    // check if player clicked in char box
    if (isInside(mousePos, startBtn) && (gameState == 0)) {
        // do suff
    }
}, false);