/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 *
 * Crypto_renderer.js represents the VIEW.
 */

/**
 *  Image / DOM loading
 */

// create canvas
var main_canvas = document.getElementById("menu");
var str_canvas = document.getElementById("str_canvas");
var gameOver_canvas = document.getElementById("game_over");
var instr_canvas = document.getElementById("instructions");


// create canvas ctx
var context = main_canvas.getContext("2d");
var str_context = str_canvas.getContext("2d");
var over_context = gameOver_canvas.getContext("2d");
var instr_context = instr_canvas.getContext("2d");

// load image files
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;  // .onload executes a script after page loads
mainImage.src = "/CryptoBase/images/canvas1.png";

base_image = new Image();
base_image.ready = false;
base_image.onload = checkReady;
base_image.src = '/CryptoBase/images/instr.png';

// Performs ready check for image assets then runs main render loop
function checkReady() {
    console.log("1. Images ready");
    this.ready = true;
    renderMenu();
}

/**
 * MAIN WRAPPER FUNCTION
 */
function render() {
    console.log("=================== WRAPPER FUNCTION =================== ");

    // set string canvas as top layer
    document.getElementById('game_over').style.zIndex = 0;
    document.getElementById('menu').style.zIndex = 0;
    document.getElementById('str_canvas').style.zIndex = 1;
    document.getElementById('instructions').style.zIndex = 0;

    // track if main menu btn has been clicked
    if (clickedMainMenu == true) {
        cancelAnimationFrame(render);
        goToMenu();
    } else {
        // perform string encryption, rendering and initialise box array
        if (!encryptComplete && gameMode == "EASY") {
            console.log("=================== CAESAR ENCRYPTION =================== ");
            initQuestions();
            encrypted = caesarEncrypt();
            renderString(encrypted);
            initBoxArray(selectedPlaintext.length);
            initUserString();
        } else if (!encryptComplete && gameMode == "HARD") {
            console.log("=================== POLYALPHABETIC ENCRYPTION =================== ");
            initQuestions();
            encrypted = vigenereEncrypt();
            renderString(encrypted);
            initBoxArray(selectedPlaintext.length);
            initUserString();
        }

        // render time remaining bar, string layer objects
        renderTimeRemaining();
        renderGame();
        str_context.drawImage(str_canvas, 0, 0);

        // update time limit
        timeLimit -= 0.2;
        startTime += 0.2;

        // game over
        if (timeLimit < 0 || gameWon) {
            console.log("=================== GAME OVER =================== ");
            // cancel main render
            cancelAnimationFrame(render);
            // set gameState = game over
            gameState = 3;
            // set game over canvas as top layer
            document.getElementById('game_over').style.zIndex = 1;
            document.getElementById('instructions').style.zIndex = 0;
            document.getElementById('menu').style.zIndex = 0;
            document.getElementById('str_canvas').style.zIndex = 0;
            // clear data
            clearCanvas();
            resetData();
            renderGameOver();
            // continue
        } else {
            requestAnimationFrame(render);
        }
    }
}

/**
 * MENU RENDER FUNCTIONS
 *
 * renderMenu()
 * goToMenu()
 *
 */
// Renders the main menu text / objects
function renderMenu() {
    console.log("=================== MAIN MENU =================== ");

    // set menu canvas as top layer
    document.getElementById('instructions').style.zIndex = 0;
    document.getElementById('menu').style.zIndex = 1;
    document.getElementById('str_canvas').style.zIndex = 0;
    document.getElementById('game_over').style.zIndex = 0;

    // draw background layer
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render menu text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("SYSTEM ALERT:", 335, 170);
    context.fillText("You are being hacked!", 310, 260);
    context.fillText("Decrypt the string into plaintext before your system is broken into.", 140, 320);

    // render easy start btn
    context.fillStyle = "green";
    context.fillRect(easyBtn.x, easyBtn.y, easyBtn.width, easyBtn.height);
    context.lineWidth = 2;
    // render easy start btn text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("EASY", easyBtn.x+28, 425);

    // render hard start btn
    context.fillStyle = "orange";
    context.fillRect(hardBtn.x, hardBtn.y, hardBtn.width, hardBtn.height);
    context.lineWidth = 2;
    // render hard start btn text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("HARD", hardBtn.x+28, 425);

    // render instructions btn
    context.fillStyle = "red";
    context.fillRect(instructionsBtn.x, instructionsBtn.y, instructionsBtn.width, instructionsBtn.height);
    context.lineWidth = 2;
    // render instructions btn text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("INSTRUCTIONS", instructionsBtn.x+15, instructionsBtn.y+25);
}

// Resets data and re-arrange canvas layers so menu is the top layer
function goToMenu() {
    console.log("<<<<<<<<<<<<<<<<<< GOING BACK TO MENU >>>>>>>>>>>>>>>>>>>>");
    // set gameState = menu
    gameState = 0;
    // set menu canvas as top layer
    document.getElementById('instructions').style.zIndex = 0;
    document.getElementById('menu').style.zIndex = 1;
    document.getElementById('str_canvas').style.zIndex = 0;
    document.getElementById('game_over').style.zIndex = 0;

    // clear previous render
    clearCanvas();
    // reset values from prev game instances
    resetData();
    // render game over canvas
    renderMenu();
}

/**
 * INSTRUCTION RENDER FUNCTIONS
 *
 */

function renderInstructions() {
    console.log("=================== INSTRUCTIONS MENU =================== ");

    var exampleQn = "A _____ is a secret or disguised way of writing.";
    var exampleAns = "CIPHER";
    var exampleEncr = "DJQIFS";

    // set instructions canvas as top
    document.getElementById('instructions').style.zIndex = 1;
    document.getElementById('menu').style.zIndex = 0;
    document.getElementById('str_canvas').style.zIndex = 0;
    document.getElementById('game_over').style.zIndex = 0;

    // draw background layer
    instr_context.drawImage(mainImage, 0, 0, 800, 600);

    // render instructions text
    instr_context.fillStyle = "white";
    instr_context.font = "lighter 15px Verdana";
    instr_context.fillText("INSTRUCTIONS:", 335, 110);

    // render question
    instr_context.fillText("1. Read the question:", 120, 165);
    // render question rect
    instr_context.fillStyle = "#2A5DB0";
    instr_context.fillRect(120, 185, 420, 40);
    instr_context.lineWidth = 2;
    instr_context.stroke();
    // render question text
    instr_context.fillStyle = "white";
    instr_context.font = "lighter 15px Verdana";
    instr_context.fillText(exampleQn, 150, 210);

    // render question instruction
    instr_context.fillText("2. Look at the                     text", 120, 270);
    instr_context.fillStyle = "red";
    instr_context.font = "bold 15px Verdana";
    instr_context.fillText("enciphered", 235, 270);
    // render decryption
    instr_context.lineWidth = 1;
    instr_context.strokeStyle = "#7C7E7B";
    instr_context.fillStyle = "red";
    instr_context.font = "bold 15px Verdana";
    var len = exampleEncr.length;
    var rectX = 125, rectY = 310;
    var charX = 130, charY = 300;
    for (var i = 0; i < len; i++) {
        // render encrypted text
        instr_context.fillText(exampleEncr.charAt(i), charX, charY);
        // render char box
        instr_context.rect(rectX, rectY, boxW, boxH);
        instr_context.stroke();
        rectX += 30;
        charX += 30;
    }

    // render answer
    instr_context.fillStyle = "white";
    instr_context.font = "lighter 15px Verdana";
    instr_context.fillText("3. Click to select a box + press a key to enter a character in the box", 120, 390);

    instr_context.drawImage(base_image, 113, 410, 198, 80);

    // render back to menu btn
    instr_context.fillStyle = "red";
    instr_context.fillRect(instructStartBtn.x, instructStartBtn.y, instructStartBtn.width, instructStartBtn.height);
    instr_context.lineWidth = 2;
    // render back to menu btn text
    instr_context.fillStyle = "white";
    instr_context.font = "lighter 16px Verdana";
    instr_context.fillText("BACK TO MENU", instructStartBtn.x+12, 565);
}

/**
 * IN-GAME RENDER FUNCTIONS
 *
 * renderGame() -> Main in-game render function
 * renderString() -> Render encrypted string to canvas
 * renderTimeRemaining() -> Render time remaining bar
 *
 * boxSelect() -> activate selected box / yellow border
 * boxDeselect() -> de-activate selected box / grey border
 * renderChar() -> renders user's char-by-char decryption attempt
 */
// Renders all in-game static text / objects
function renderGame() {
    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render go back to main menu button
    str_context.fillStyle = "#262626";
    str_context.fillRect(270, 110, 300, 40);
    str_context.lineWidth = 2;
    str_context.stroke();
    // render time remaining text
    str_context.fillStyle = "white";
    str_context.font = "lighter 16px Verdana";
    str_context.fillText("TIME REMAINING", 330, 140);

    // render go back to main menu button
    str_context.fillStyle = "red";
    str_context.fillRect(menuBtn.x, menuBtn.y, menuBtn.width, menuBtn.height);
    str_context.lineWidth = 2;
    str_context.stroke();

    // render menu button text
    str_context.fillStyle = "white";
    str_context.font = "lighter 16px Verdana";
    str_context.fillText("Main Menu", 650, 40);

    // render questions background colour
    str_context.fillStyle = "#2A5DB0";
    str_context.fillRect(40, 285, 700, 40);
    str_context.lineWidth = 2;
    str_context.stroke();
    // render questions text
    str_context.fillStyle = "white";
    str_context.font = "lighter 15px Verdana";
    str_context.fillText(selectedQuestion, 50, 312);

    // render decrypt button
    str_context.fillStyle = "red";
    str_context.fillRect(submitBtn.x, submitBtn.y, submitBtn.width, submitBtn.height);
    str_context.lineWidth = 2;
    str_context.stroke();
    // render decrypt button text
    str_context.fillStyle = "white";
    str_context.font = "lighter 16px Verdana";
    str_context.fillText("DECRYPT", 360, 525);
}

// Renders pre-encrypted text to the canvas
var encryptComplete = false;
function renderString(encrypted) {
    var row = 0;
    // style text
    str_context.fillStyle = "white";
    str_context.font = "16px Verdana";
    // style rect
    str_context.lineWidth = 1;
    str_context.strokeStyle = "#7C7E7B";
    var len = encrypted.length;
    for (var i = 0; i < len; i++) {
        if (encrypted.charAt(i) == " ") continue;
        console.log("CHAR = " + encrypted.charAt(i));
        // render char
        str_context.fillText(encrypted.charAt(i), cPos_x[i%22], cPos_y[row]);
        // render char box
        str_context.rect(bPos_x[i%22], bPos_y[row], boxW, boxH);
        str_context.stroke();
        // go to next row
        if (bPos_x[i%22] == 680) {
            console.log(bPos_x[i%22]);
            row++;
        }
    }
    // mark as completed
    encryptComplete = true;
}

// Renders remaining time graphic
function renderTimeRemaining() {
    // render remaining time graphic
    if (gameMode == "EASY" && timeLimit < 700) {
        str_context.fillStyle = "green";
        str_context.fillRect(40, 170, timeLimit, 80);
        str_context.lineWidth = 2;
        str_context.stroke();
    } else {
        str_context.fillStyle = "orange";
        str_context.fillRect(40, 170, timeLimit, 80);
        str_context.lineWidth = 2;
        str_context.stroke();
    }

    // clear previous render
    str_context.clearRect(40, 170, startTime, 80);
    str_context.beginPath();
}

// activate selected box
function boxSelect(box) {
    // drawing box selected
    str_context.beginPath();
    str_context.lineWidth = 1;
    str_context.strokeStyle = "#ffff00";
    str_context.rect(box.x, box.y, boxW, boxH);
    str_context.stroke();
}
// deactivate selected box
function boxDeselect(box) {
    // clearing box selected
    str_context.clearRect(box.x-1, box.y-1, boxW+2, boxH+2);    // include clearing padding
    // re-drawing default
    str_context.lineWidth = 2;
    str_context.strokeStyle = "#7C7E7B";
    str_context.rect(box.x, box.y, boxW, boxH);
    str_context.stroke();
}

// render user's char-by-char decryption attempt
function renderChar(box, keyCode) {
    // convert keyCode to char
    var keyChar = String.fromCharCode(keyCode);
    console.log("<<<<<<< CHAR = " + keyChar + " >>>>>>>>");
    // clearing prev char
    str_context.clearRect(box.x+1, box.y+1, boxW-2, boxH-2);    // include clearing padding
    //str_context.beginPath();
    // drawing new char
    str_context.fillStyle = "white";
    str_context.font = "16px Verdana";
    str_context.fillText(keyChar, box.x+4.5, box.y+21.5);
}

/**
 * GAME OVER RENDER FUNCTIONS
 *
 * renderGameOver() -> Renders game over canvas
 */
// Renders game over canvas
function renderGameOver() {
    console.log("===================  GAME OVER =================== ");

    // draw background layer
    over_context.drawImage(mainImage, 0, 0, 800, 600);

    // render replay game button
    over_context.fillStyle = "red";
    over_context.fillRect(replayBtn.x, replayBtn.y, replayBtn.width, replayBtn.height);
    over_context.lineWidth = 2;

    // game lost = render LOSE GAME text
    if (!gameWon) {
        over_context.fillStyle = "white";
        over_context.font = "lighter 22px Verdana";
        over_context.fillText("YOU HAVE BEEN HACKED.", 250, 250);
        over_context.fillText("GAME OVER.", 320, 330);
        over_context.fillText("PLAY AGAIN", 323, 426);
    // game won = render WIN GAME text
    } else {
        over_context.fillStyle = "white";
        over_context.font = "lighter 22px Verdana";
        over_context.fillText("YOU WIN!", 330, 250);
        over_context.fillText("DECRYPTION SUCCESSFUL.", 240, 330);
        over_context.fillText("PLAY AGAIN", 323, 427);
    }
}

/**
 * UNIVERSAL RENDER FUNCTIONS
 *
 * clearCanvas()
 */

// Clear all layers and resets paths to prevent overlap
function clearCanvas() {
    context.clearRect(0, 0, main_canvas.width, main_canvas.height);
    instr_context.clearRect(0, 0, main_canvas.width, main_canvas.height);
    str_context.clearRect(0, 0, main_canvas.width, main_canvas.height);
    over_context.clearRect(0, 0, main_canvas.width, main_canvas.height);

    context.beginPath();
    instr_context.beginPath();
    str_context.beginPath();
    over_context.beginPath();
}

