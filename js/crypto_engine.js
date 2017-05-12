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

/**
 * ENCRYPTION
 */

// store an array of plaintext strings
var plaintext = ["This is a test message lol",
                 "What is a substitution cipher",
                 "Stealing company information"];


/**
 * Takes in a string value, encrypts it with a shift cipher
 * then adds it to the encrypted variable to be used in-game.
 * @param str is plaintext string
 */
function getEncryptedStr() {
    // choose random string from dictionary
    var chooseStr = Math.floor(Math.random() * 100) % 3;
    var plaintextStr = plaintext[chooseStr];

    // generate random shift value between 1-26
    var shiftVal = (Math.floor(Math.random() * 100) + 1) % 26;
    console.log(shiftVal);

    var encrypted = "";
    var charCode = 0;
    var len = plaintextStr.length;

    // convert plaintext -> encrypted
    for (var i = 0; i < len; i++) {
        charCode = plaintextStr.charCodeAt(i) + shiftVal;
        encrypted += String.fromCharCode(charCode);
    }

    // mark as completed
    completed = true;

    // return encrypted string
    console.log(encrypted);
    return encrypted;
}


// string encryption variables
// var encrypted = "HELLO";
// var strlen = encrypted.length;

/**
 * OTHER VARIABLES
 */
var gameState = 0;                   // 0 = main menu, 1 = game running
var defaultScore = 0;                // score
var defaultTimeLimit = 300;          // 5*60 = 300 seconds countdown timer
var score = defaultScore;
var timeLimit = defaultTimeLimit;
var startButton = {                  // Button object with boundaries
    x:340,
    y:530,
    width:100,
    height:40
};

/**
 * GAME CANVAS SETUP
 *
 * Create canvas, append to HTML body, set width / height.
 */
// create canvas, attach to DOM
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

// load image files
mainImage = new Image();
textImage = new Image();
mainImage.ready = false;
textImage.ready = false;
mainImage.onload = checkReady;  // .onload executes a script after page loads
textImage.onload = checkReady;
mainImage.src = "/CryptoBase/images/canvas1.png";
textImage.src = "/CryptoBase/images/canvasText.png";

/**
 * READY CHECK
 *
 * Performs ready check for image assets then loads game menu.
 */
function checkReady() {
    this.ready = true;
    menu();
}

/**
 * START MENU RENDER
 *
 * Renders start menu intro, instructions and start game button.
 */
function resetData() {
    score = defaultScore;
    timeLimit = defaultTimeLimit;
}

function menu() {
    // reset values from prev game instances
    resetData();

    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render menu text
    context.fillText("SYSTEM ALERT:", 25, 120);
    context.fillText("You are being hacked! Decrypt the string into " +
        "plaintext before your system is broken into.", 25, 150);
    context.fillText("INSTRUCTIONS", 330, 250);

    // render start btn
    context.fillStyle = "red";
    context.fillRect(340, 530, 100, 40);
    context.lineWidth = 2;

    // render start btn text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("START", 365, 555)
}

/**
 * PLAY GAME LOOP
 *
 * Continually updates the state of the game as the player makes changes.
 */
function renderBoard() {
    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render Score + Time Remaining
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("Score: " + score, 180, 40);
    context.fillText("Time Remaining: " + timeLimit, 350, 40);

    // render go back to main menu button
    context.fillStyle = "red";
    context.fillRect(640, 15, 120, 40);
    context.lineWidth = 2;
    context.stroke();

    // render start button text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("MAIN MENU", 650, 40);
}

var completed = false;
// #66C88F = colour of CORRECTLY decrypted char
function renderEncrypted(encrypted) {
    var box_x = 50;
    var box_y = 150;
    var char_x = 53;
    var char_y = 175;

    // render encrypted string
    var len = encrypted.length;
    for (var i = 0; i < len; i++) {
        console.log(encrypted.charAt(i));
        // render char
        context.fillStyle = "white";
        context.font = "16px Verdana";
        context.fillText(encrypted.charAt(i), char_x, char_y);
        // render char box
        context.rect(box_x, box_y, 20, 35);
        context.lineWidth = 1;
        context.strokeStyle = "#7C7E7B";
        context.stroke();
        // spread out the chars rightwards
        box_x += 30;
        char_x += 30;
        // newline if over canvas bounds
        if (box_x > 700) {
            box_y += 50;
            char_y += 50;
            box_x = 50;
            char_x = 50;
        }
    }
}

var encrypted = "";
function playGame() {
    // render static board
    renderBoard();

    // get encrypted string
    if (!completed) {
        encrypted = getEncryptedStr();
    }

    // render encrypted string
    renderEncrypted(encrypted);

    // continue or game over
    timeLimit--;
    if (timeLimit == -1) {
        cancelAnimationFrame(playGame);
        gameState = 0;
        //menu();
    } else {
        gameState = 1;
        requestAnimationFrame(playGame);
    }
}


/**
 * MOUSE INTERACTIONS
 */

// get mouse positions
function getMousePos(canvas, event) {
    var startButton = canvas.getBoundingClientRect();
    return {
        x: event.clientX - startButton.left,
        y: event.clientY - startButton.top
    };
}

// check if mouse is inside button
function isInside(pos, startButton){
    return pos.x > startButton.x && pos.x < startButton.x+startButton.width
        && pos.y < startButton.y+startButton.height && pos.y > startButton.y
}

// start game button event listener
canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(canvas, event);
    // start game button
    if (isInside(mousePos, startButton) && (gameState == 0)) {
        console.log('clicked start game');
        playGame();
    } else {
        console.log('clicked outside start game');
    }
    /* main menu button
    if (isInside(mousePos, mainMenuButton) && (gameState == 1)) {
        console.log('clicked main menu button');
        gameState = 1;
        menu();
    } else {
        console.log('clicked outside main menu button');
    }*/
}, false);