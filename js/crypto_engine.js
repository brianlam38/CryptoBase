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
    selectedPlaintext = plaintext[chooseStr];
    console.log("PLAINTEXT = " + selectedPlaintext);

    // generate random shift value between 1-26
    var shiftVal = (Math.floor(Math.random() * 100) + 1) % 26;
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
/**
 * TO DO: RETURN THE CLICKED BOX OBJECT.
 * ASSIGN THIS OBJECT TO THE EVENT LISTENER, SO RECT CAN BE TARGETED AND CHANGES RENDERED
 */
function isInsideBoxes(pos) {
    var len = boxArray.length;
    for (var i = 0; i < len; i++) {
        //console.log("Checking boxArray = " + boxArray[i]);
        //console.log("BOX_X = " + boxArray[i].x + " // BOX_Y = " + boxArray[i].y + " // WIDTH = " + boxArray[i].width + " // HEIGHT = " + boxArray[i].height);
        if (isInside(pos, boxArray[i])) {
            console.log("BOX FOUND");
            return boxArray[i];
        }
        //return pos.x > boxArray[i].x && pos.x < boxArray[i].x+boxArray[i].width
        //    && pos.y <  boxArray[i].y+boxArray[i].height && pos.y > boxArray[i].y
    }
    //console.log("BOX NOT FOUND");
    return false;
}

// Initialise array with box objects for event interactions
function initBoxArray(numBoxes) {
    console.log("ARRAY LENGTH = " + numBoxes);
    var row = 0;
    for (var i = 0; i < numBoxes; i++) {
        // create box obj
        var box = {
            x: bPos_x[i%22], y: bPos_y[row], width: boxW, height: boxH
        };
        // add box obj to array
        console.log("PUSHING BOX #" + i);
        //console.log("BOX_X = " + box.x + " // BOX_Y = " + box.y + " // WIDTH = " + box.width + " // HEIGHT = " + box.height);
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
    if (isInside(mousePos, startBtn) && (gameState == 0)) {
        console.log("3. Clicked start game");
        gameState = 1;
        render();
    } else {
        console.log('clicked outside start game');
    }
    // clicked main menu button
    if (isInside(mousePos, menuBtn) && (gameState == 1)) {
        console.log('clicked main menu button');
        gameState = 0;
        renderMenu();
    } else {
        console.log('clicked outside main menu button');
    }
}, false);

/**
 * For individual object interactions, possibly use a HASMMAP to determine which
 * box object is selected and then you can perform functions from there.
 */

// String layer event listeners
var prevBox;
str_canvas.addEventListener('click', function(event) {
    var mousePos = getMousePos(str_canvas, event);
    var targetedBox = isInsideBoxes(mousePos);
    // activate clicked box
    if (isInsideBoxes(mousePos) && (gameState == 1)) {
        console.log('== clicked inside a box ==');
        gameState = 2;  // go to selected state
        prevBox = targetedBox;
        boxSelect(targetedBox);
    } else {
        console.log('== clicked outside a box ==');
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
}, false);