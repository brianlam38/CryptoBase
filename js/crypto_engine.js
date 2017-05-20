/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 *
 * Crypto_engine.js represents the CONTROLLER.
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
 * ENCRYPTION / DECRYPTION FUNCTIONS
 *
 * setEncryptedStr()
 */

/** Chooses then encrypts random string from dict with a shift cipher. */
function setEncryptedStr() {
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

/**
 * GAME DATA FUNCTIONS
 *
 * resetData()
 */

// Resets game data
function resetData() {
    score = defaultScore;
    timeLimit = defaultTimeLimit;
    encryptComplete = false;
    gameState = 0;
    encrypted = "";
}


/**
 * GAME INTERACTION / EVENT FUNCTIONS
 *
 * getMousePos(canvas, event)
 * isInside(pos, object)
 * main_canvas.addEventListener('click',function())
 * str_canvas.addEventListener('click',function())
 */

/// Get mouse xy position on canvas
function getMousePos(canvas, event) {
    var startButton = canvas.getBoundingClientRect();
    return {
        x: event.clientX - startButton.left,
        y: event.clientY - startButton.top
    };
}

// Check if mouse is inside object
function isInside(pos, object) {
    return pos.x > object.x && pos.x < object.x+object.width
        && pos.y < object.y+object.height && pos.y > object.y
}

// Main menu layer event listeners
main_canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(main_canvas, event);
    // start game button
    if (isInside(mousePos, startBtn) && (gameState == 0)) {
        console.log("3. Clicked start game");
        render();
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

// String interaction layer event listeners
str_canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(str_canvas, event);
    // check if player clicked in char box
    if (isInside(mousePos, startBtn) && (gameState == 0)) {
        // do stuff
    }
}, false);