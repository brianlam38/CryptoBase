/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 *
 * Crypto_engine.js represents the CONTROLLER.
 */

/**
 * ENCRYPTION / DECRYPTION FUNCTIONS
 *
 * caesarEncrypt()
 */

/** Chooses then encrypts random string from dict with a shift cipher. */
function caesarEncrypt() {
    // choose random string from dictionary + grab question from HashMap
    var chooseStr = Math.floor(Math.random() * 10) % 6;
    selectedPlaintext = plaintext[chooseStr];
    selectedQuestion = map[selectedPlaintext];
    console.log("QUESTION = " + selectedQuestion);
    console.log("PLAINTEXT = " + selectedPlaintext);

    // generate random shift value between 1-26
    var shiftVal = Math.floor(Math.random() * 100) % 26;
    console.log("SHIFT VALUE = " + shiftVal);

    var encrypted = "";
    var charCode = 0;
    var len = selectedPlaintext.length;

    // convert plaintext -> encrypted
    for (var i = 0; i < len; i++) {
        // add space to encrypted
        if (selectedPlaintext.charAt(i) == " ") {
            encrypted += selectedPlaintext.charAt(i);
            continue;
        }
        charCode = (selectedPlaintext.charCodeAt(i) + shiftVal) % 26 + 65;
        encrypted += String.fromCharCode(charCode);
    }

    // return encrypted string
    console.log("ENCRYPTED STRING = " + encrypted);
    return encrypted;
}

function vigenereEncrypt() {
    // choose random string from dictionary + grab question from HashMap
    var chooseStr = Math.floor(Math.random() * 10) % 6;
    selectedPlaintext = plaintext[chooseStr];
    selectedQuestion = map[selectedPlaintext];
    console.log("QUESTION = " + selectedQuestion);
    console.log("PLAINTEXT = " + selectedPlaintext);

    var encrypted = "";
    var charCode = 0;
    var len = selectedPlaintext.length;

    // convert plaintext -> encrypted
    for (var i = 0; i < len; i++) {
        // for each char, generate random shift value between 1-26
        var shiftVal = Math.floor(Math.random() * 100) % 26;
        console.log("SHIFT VALUE = " + shiftVal);
        // add space to encrypted
        if (selectedPlaintext.charAt(i) == " ") {
            encrypted += selectedPlaintext.charAt(i);
            continue;
        }
        charCode = (selectedPlaintext.charCodeAt(i) + shiftVal) % 26 + 65;
        encrypted += String.fromCharCode(charCode);
    }
    // return encrypted string
    console.log("ENCRYPTED STRING = " + encrypted);
    return encrypted;
}


/**
 * GAME DATA CHANGING FUNCTIONS
 *
 * resetData()
 * initUserString()
 * replaceChar()
 * storeUserAttempt()
 * initQuestions()
 */

// Resets game data
function resetData() {
    startTime = 0;
    timeLimit = defaultTimeLimit;
    encryptComplete = false;
    encrypted = "";
    boxArray = [];
}

// initialise user attempt string with spaces
function initUserString() {
    var len = selectedPlaintext.length;
    for (var i = 0; i < len; i++) {
        userString += " ";
    }
    console.log("DEFAULT USER ATTEMPT STRING = " + userString + "END");
}

// replace char at index in string
function replaceChar(index, char) {
    if (index > userString.length-1) {
        return userString;
    }
    return userString.substr(0,index) + char + userString.substr(index+1);
}

// store's users attempts into a string
function storeUserAttempt(keyCode) {
    // convert keyCode to char
    var char = String.fromCharCode(keyCode);
    var len = boxArray.length;
    for (var i = 0; i < len; i++) {
        // Find appropriate box pos, insert char into box
        if (boxArray[i].x == targetedBox.x && boxArray[i].y == targetedBox.y) {
            userString = replaceChar(i, char);
            break;
        }
    }
    console.log("++++++++++++++++++++++++++++++++++++++++++");
    console.log("CURRENT ATTEMPT = " + userString + " END");
    console.log("++++++++++++++++++++++++++++++++++++++++++");
}

// initialise HashMap for questions / answers
function initQuestions() {
    map[plaintext[0]] = questions[0];
    map[plaintext[1]] = questions[1];
    map[plaintext[2]] = questions[2];
    map[plaintext[3]] = questions[3];
    map[plaintext[4]] = questions[4];
    map[plaintext[5]] = questions[5];
}

/**
 * GAME INTERACTION / EVENT FUNCTIONS
 *
 * getMousePos(canvas, event)
 * isInside(pos, object)
 * main_canvas.addEventListener('click',function())
 * str_canvas.addEventListener('click', function())
 * gameOver_canvas.addEventListener('click', function())
 * checkAnswer()
 */

/// Get mouse xy position on canvas
function getMousePos(canvas, event) {
    var border = canvas.getBoundingClientRect();
    return {
        x: event.clientX - border.left,
        y: event.clientY - border.top
    };
}

// Check if mouse is inside object
function isInside(pos, object) {
    return pos.x > object.x && pos.x < object.x+object.width
        && pos.y < object.y+object.height && pos.y > object.y;
}

// Check if mouse is inside any box
function isInsideBoxes(pos) {
    var len = boxArray.length;
    for (var i = 0; i < len; i++) {
        //console.log("Checking boxArray = " + boxArray[i]);
        //console.log("BOX_X = " + boxArray[i].x + " // BOX_Y = " + boxArray[i].y + " // WIDTH = " + boxArray[i].width + " // HEIGHT = " + boxArray[i].height);
        if (isInside(pos, boxArray[i])) {
            console.log("BOX FOUND");
            return boxArray[i];
        }
    }
    return false;
}

// Initialise array with box objects for event interactions
function initBoxArray(numBoxes) {
    console.log("ARRAY LENGTH = " + numBoxes);
    var row = 0;
    for (var i = 0; i < numBoxes; i++) {
        if (selectedPlaintext.charAt(i) == " ") continue;
        // create box obj
        var box = {
            x: bPos_x[i%22], y: bPos_y[row], width: boxW, height: boxH
        };
        // add box obj to array
        boxArray.push(box);
        // new row
        if (i == 21) {
            row++;
        }
    }
}

// Main menu layer event listeners
main_canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(main_canvas, event);
    // clicked start game button
    if (isInside(mousePos, easyBtn) && (gameState == 0)) {
        console.log("3. Clicked start game");
        clickedMainMenu = false;
        gameState = 1;
        render();
    } else {
        console.log('clicked outside start game');
    }
}, false);

// String layer event listeners
var targetedBox;
var prevBox;
str_canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(str_canvas, event);
    targetedBox = isInsideBoxes(mousePos);
    // activate clicked box
    if (isInsideBoxes(mousePos) && (gameState == 1)) {
        console.log('== clicked inside a box ==');
        gameState = 2;  // go to selected state
        prevBox = targetedBox;
        boxSelect(targetedBox);
    }
    // activate clicked box + deactivate prev box
    if (isInsideBoxes(mousePos) && !isInside(mousePos, prevBox) && gameState == 2){
        console.log('== clicked inside ANOTHER box ==');
        gameState = 2;  // keep selected state
        prevBox = targetedBox;
        boxDeselect(prevBox);
        boxSelect(targetedBox);
    }
    // deactivate clicked box
    if ((!isInside(mousePos, targetedBox)) && (gameState == 2)) {
        console.log('BOX SELECTED -> Clicking outside to deactivate');
        gameState = 1; // go back to unselected state
        boxDeselect(targetedBox);
    }
    // clicked on main menu button
    if (isInside(mousePos, menuBtn) && (gameState == 1)) {
        console.log('clicked main menu button');
        clickedMainMenu = true;
    } else {
        console.log('clicked outside main menu button');
    }
    // clicked submit button
    if (isInside(mousePos, submitBtn) && (gameState != 0)) {
        console.log("Clicked decryption button");
        if(checkAnswer()) {
            // show that the anwer is correct
            console.log("YOU WIN THE GAME!!!");
            gameWon = true;
        } else {
            // show that the answer is incorrect
            console.log("WRONG ANSWER LOL!!!");
        }
    }
}, false);

// Keyboard event listeners
var keyclick = {};
document.addEventListener("keypress", function(event) {
    // only works inside game
    if (gameState == 2) {
        keyclick[event.keyCode] = true;
        console.log(event.keyCode);
        // render char inside box
        renderChar(targetedBox, event.keyCode);
        storeUserAttempt(event.keyCode);
    }
}, false);

// Game over layer event listeners
gameOver_canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(gameOver_canvas, event);
    // clicked replay game button
    if (isInside(mousePos, replayBtn)) {
        console.log("<< CLICKED REPLAY GAME >>");
        gameState = 1;
        render();
    } else {
        console.log('clicked outside replay game');
    }
}, false);

// Check if user input matches plaintext
function checkAnswer() {
    var pLen = selectedPlaintext.length;
    var uLen = userString.length;

    var finalPlaintext = "";
    var finalSubmit = "";

    // recreate string without extra spaces
    for (var i = 0; i < pLen; i++) {
        var pChar = selectedPlaintext.charAt(i);
        if (pChar != ' ') {
            finalPlaintext += selectedPlaintext.charAt(i);
        }
    }
    // recreate string without extra spaces
    for (var i = 0; i < uLen; i++) {
        var uChar = userString.charAt(i);
        if (uChar != ' ') {
            finalSubmit += userString.charAt(i);
        }
    }

    finalSubmit = finalSubmit.toUpperCase();
    console.log("PLAINTEXT = " + finalPlaintext);
    console.log("USERSTRING = " + finalSubmit);
    if (finalSubmit.localeCompare(finalPlaintext) == 0) return true;
    return false;
}