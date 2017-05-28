/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 *
 * Crypto_renderer.js represents the VIEW.
 */


/** Set up menu and game canvas layers **/
// create canvas
var main_canvas = document.getElementById("menu");
var str_canvas = document.getElementById("str_canvas");
var gameOver_canvas = document.getElementById("game_over");
// create canvas ctx
var context = main_canvas.getContext("2d");
var str_context = str_canvas.getContext("2d");
var over_context = gameOver_canvas.getContext("2d");

// load image files
mainImage = new Image();
textImage = new Image();
mainImage.ready = false;
textImage.ready = false;
mainImage.onload = checkReady;  // .onload executes a script after page loads
textImage.onload = checkReady;
mainImage.src = "/CryptoBase/images/canvas1.png";
textImage.src = "/CryptoBase/images/canvasText.png";

/** Performs ready check for image assets then runs main render loop */
function checkReady() {
    console.log("1. Images ready");
    this.ready = true;
    renderMenu();
}

/** Main render loop **/
function render() {
    console.log("Main render loop");

    // set string canvas as top layer
    document.getElementById('game_over').style.zIndex = -1;
    document.getElementById('menu').style.zIndex = 0;
    document.getElementById('str_canvas').style.zIndex = 1;

    // perform string encryption, rendering and initialise box array
    if (!encryptComplete) {
        console.log("Initialising question bank");
        initQuestions();
        console.log("5. Encrypt string");
        encrypted = setEncryptedStr();
        console.log("6. Render encrypted string");
        renderString(encrypted);
        console.log("7. Initialise box array");
        initBoxArray(selectedPlaintext.length);
        initUserString();
    }

    // render time remaining bar
    renderTimeRemaining();
    // render game layer objects
    renderGame();
    // draw string layer
    str_context.drawImage(str_canvas, 0, 0);

    // trigger game over
    timeLimit -= 0.2;
    startTime += 0.2;
    if (timeLimit < 0) {
        console.log("8. Game over");
        cancelAnimationFrame(render);
        // set gameState = menu
        gameState = 3;
        // set menu canvas as top layer
        document.getElementById('game_over').style.zIndex = 2;
        document.getElementById('menu').style.zIndex = 1;
        document.getElementById('str_canvas').style.zIndex = 0;
        // clear previous render
        console.log("9. Clear canvas, boxArray and reset game data");
        clearCanvas();
        // clear boxArray
        boxArray = [];
        // reset values from prev game instances
        resetData();
        // render game over canvas
        renderGameOver();
    } else {
        requestAnimationFrame(render);
    }
}

/**
 * MENU RENDER
 *
 * Renders the main menu objects.
 */
function renderMenu() {
    console.log("2. Render main menu");
    gameState = 0;

    // draw background layer
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render menu text
    context.fillText("SYSTEM ALERT:", 335, 170);
    context.fillText("You are being hacked!", 310, 260);
    context.fillText("Decrypt the string into plaintext before your system is broken into.", 140, 320);

    // render start btn
    context.fillStyle = "red";
    context.fillRect(startBtn.x, startBtn.y, startBtn.width, startBtn.height);
    context.lineWidth = 2;

    // render start btn text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("START", 372, 425)
}

/**
 * PLAY GAME LOOP
 *
 * Renders static objects on the in-game canvas.
 */
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

/** renders a pre-encrypted text to the canvas */
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

/** Renders remaining time graphic */
function renderTimeRemaining() {
    // render remaining time graphic
    if (timeLimit < 700 && (timeLimit%2 == 0.1)) {
        str_context.fillStyle = "red";
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

/**
 * GAME OVER RENDER
 *
 * Renders the game over canvas.
 */
function renderGameOver() {
    console.log("<< RENDER GAME OVER LAYER >>");

    // draw background layer
    over_context.drawImage(mainImage, 0, 0, 800, 600);

    // render replay game
    over_context.fillStyle = "red";
    over_context.fillRect(replayBtn.x, replayBtn.y, replayBtn.width, replayBtn.height);
    over_context.lineWidth = 2;

    // render game over text
    over_context.fillStyle = "white";
    over_context.font = "lighter 22px Verdana";
    over_context.fillText("YOU HAVE BEEN HACKED.", 250, 250);
    over_context.fillText("GAME OVER.", 320, 330);
    over_context.fillText("PLAY AGAIN", 323, 426);
}

/** Clear all layers and resets paths to prevent overlap **/
function clearCanvas() {
    str_context.clearRect(0, 0, main_canvas.width, main_canvas.height);
    context.clearRect(0, 0, main_canvas.width, main_canvas.height);
    str_context.beginPath();
    context.beginPath();
}

/** Render interactions with game **/
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

// render char
function renderChar(box, keyCode) {
    console.log("!!! RENDERING CHAR !!!");
    // convert keyCode to char
    var keyChar = String.fromCharCode(keyCode);
    console.log(keyChar);
    // clearing prev char
    str_context.clearRect(box.x+1, box.y+1, boxW-2, boxH-2);    // include clearing padding
    //str_context.beginPath();
    // drawing new char
    str_context.fillStyle = "white";
    str_context.font = "16px Verdana";
    str_context.fillText(keyChar, box.x+4.5, box.y+21.5);
}