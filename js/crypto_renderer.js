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
// create canvas ctx
var context = main_canvas.getContext("2d");
var str_context = str_canvas.getContext("2d");

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
    document.getElementById('menu').style.zIndex = 0;
    document.getElementById('str_canvas').style.zIndex = 1;

    // perform string encryption, rendering and initialise box array
    if (!encryptComplete) {
        console.log("5. Encrypt string");
        encrypted = setEncryptedStr();
        console.log("6. Render encrypted string");
        renderString(encrypted);
        console.log("7. Initialise box array");
        initBoxArray(selectedPlaintext.length);
    }

    // render game layer objects
    renderGame();

    // draw string layer
    str_context.drawImage(str_canvas, 0, 0);

    // trigger game over
    timeLimit--;
    if (timeLimit == -1) {
        console.log("8. Game over");
        /**
        cancelAnimationFrame(render);
        // set gameState = menu
        gameState = 0;
        // set menu canvas as top layer
        document.getElementById('menu').style.zIndex = 1;
        document.getElementById('str_canvas').style.zIndex = 0;
        // clear previous render
        console.log("9. Clear canvas, boxArray and reset game data");
        clearCanvas();
        // clear boxArray
        boxArray = [];
        // reset values from prev game instances
        resetData();
        // render menus
        renderMenu();
         **/
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
 * Continually updates the state of the game as the player makes changes.
 */
function renderGame() {
    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render Score + Time Remaining
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("Score: " + score, 180, 40);
    context.fillText("Time Remaining: " + timeLimit, 350, 40);

    // render go back to main menu button
    context.fillStyle = "red";
    context.fillRect(menuBtn.x, menuBtn.y, menuBtn.width, menuBtn.height);
    context.lineWidth = 2;
    context.stroke();

    // render start button text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("Main Menu", 650, 40);
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
        console.log("CHAR = " + encrypted.charAt(i));
        // render char
        str_context.fillText(encrypted.charAt(i), cPos_x[i%22], cPos_y[row]);
        // render char box
        str_context.rect(bPos_x[i%22], bPos_y[row], boxW, boxH);
        str_context.stroke();
        if (bPos_x[i%22] == 680) {
            console.log(bPos_x[i%22]);
            row++;
        }
    }

    // mark as completed
    encryptComplete = true;
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
function inputChar() {

}