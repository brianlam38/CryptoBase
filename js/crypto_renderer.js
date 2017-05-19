/**
 * GAME CANVAS SETUP
 *
 * Create canvas, append to HTML body, set width / height.
 */
// create canvas
var canvas = document.getElementById("menu");
var str_canvas = document.getElementById("str_canvas");
// create canvas ctx
var context = canvas.getContext("2d");
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
    this.ready = true;
    renderMenu();
}

/** IMPROVED RENDER FUNCTION -> Upgrade to this later.
 *
 * Canvas order
// 0. Menu
// 1. Game board
// 2. Encrypted string
function render() {

    // render menu
    renderMenu();

    // if start button is clicked
        // render game board
        // render encrypted string
    if (!encryptComplete) {
        encrypted = getEncryptedStr();
    }

    // requestAnimationFrame(render)
}
 **/

/**
 * MENU RENDER
 *
 * Renders the main menu, instruction text and the start game button.
 */
function renderMenu() {
    // reset values from prev game instances
    resetData();

    // render canvas
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

// hardcoded string render positions for faster performance.
var sPos_x = {
    width: [53, 83, 113, 143, 173, 203, 233, 263, 293, 323, 353,
            383, 413, 443, 473, 503, 533, 563, 593, 623, 653, 683]
};

var sPos_y = {
    height: [235, 335, 435]
};

var bPos_x = {
    width: [50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350,
            380, 410, 440, 470, 500, 530, 560, 590, 620, 650, 680]
};

var bPos_y = {
    height: [250, 350, 450]
};

/**
 * renderEncrypted renders a pre-encrypted text to the canvas.
 */

var row = 0;
var encryptComplete = false;
function renderString(encrypted) {
    console.log("first time render");
    // style text
    str_context.fillStyle = "white";
    str_context.font = "16px Verdana";
    // style rect
    str_context.lineWidth = 1;
    str_context.strokeStyle = "#7C7E7B";
    var len = encrypted.length;
    for (var i = 0; i < len; i++) {
        // render char
        str_context.fillText(encrypted.charAt(i), sPos_x.width[i], sPos_y.height[row]);
        // render char box
        str_context.rect(bPos_x.width[i], bPos_y.height[row], 20, 35);
        str_context.stroke();
        if (bPos_x.width == 680) {
            row++;
        }
    }
    encryptComplete = true;
}

/**
 * playGame is the game engine that calls the rendering.
 */
var encrypted = "";
function playGame() {
    // generate encrypted string and render
    if (!encryptComplete) {
        console.log("generated encrypted string");
        encrypted = getEncryptedStr();
        console.log("pre-rendering string and boxes");
        renderString(encrypted);
    }

    // render encrypted string and input boxes onto board
    console.log("drawing pre-rendered board");
    str_context.drawImage(str_canvas, 0, 0);
    // set string canvas as top layer
    document.getElementById('menu').style.zIndex = 0;
    document.getElementById('str_canvas').style.zIndex = 1;

    // render static board
    renderGame();

    // continue or game over
    timeLimit--;
    if (timeLimit == -1) {
        cancelAnimationFrame(playGame);
        // set gameState = menu
        gameState = 0;
        // set menu canvas as top layer
        document.getElementById('menu').style.zIndex = 1;
        document.getElementById('str_canvas').style.zIndex = 0;
        // clear previous render
        clearCanvas();
        renderMenu();
    } else {
        requestAnimationFrame(playGame);
    }
}

/** Clears all canvases to prevent overlaps **/
function clearCanvas() {
    str_context.clearRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
}