/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 */

/**
 * OTHER VARIABLES
 */
// score
var score = 0;          // player score
var gameOverCount = 0;  // countdown timer

// mouse positions
var mouseX = 0;
var mouseY = 0;

// Button object with boundaries
var btnPlay = new Button(340, 440, 530, 570);
function Button(xL, xR, yT, yB) {
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
    if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) {
        alert("CLICKED INSIDE THE BUTTON");
        return true;
    } else {
        alert("CLICKED OUTSIDE THE BUTTON");
        return false;
    }
}

/**
 * GAME CANVAS
 *
 * Create canvas, append to HTML body, set width / height.
 */
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

/**
 * LOAD IMAGES
 */
mainImage = new Image();            // main img object
textImage = new Image();            // A-Z img object
mainImage.ready = false;            // default = false
textImage.ready = false;
mainImage.onload = checkReady;      // image loads
                                    // -> does rdy check
                                    // -> sets rdy = true
                                    // -> launch game rendering fn
textImage.onload = checkReady;
mainImage.src = "/CryptoBase/images/canvas1.png";
textImage.src = "/CryptoBase/images/canvasText.png";

/**
 * READY CHECK
 */
function checkReady() {
    this.ready = true;
    renderStart();
}

/**
 * START MENU RENDER
 */
function renderStart() {
    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // set text style
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";

    // render Score + Time Remaining
    context.fillText("Score: " + score, 280, 40);
    context.fillText("Time remaining: " + gameOverCount, 400, 40);

    // render menu text
    context.fillText("SYSTEM ALERT:", 25, 120);
    context.fillText("You are being hacked! Decrypt the string into " +
        "plaintext before your system is broken into.", 25, 150);

    // render menu instructions
    context.fillText("INSTRUCTIONS", 330, 250);

    // render START GAME BUTTON
    context.fillStyle = "red";
    context.fillRect(340, 530, 100, 40);
    context.lineWidth = 2;

    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("START", 365, 555);
}

/**
 * PLAY GAME LOOP
 *
 * Continually updates the state of
 * the game as the player makes changes.
 */

function renderer() {
    playGame();
    console.log();
    requestAnimationFrame(renderer);    // loop continuously to render the game
}

/**
 * PLAY GAME RENDER
 */
function playGame() {
    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // set text style
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";

    // render Score + Time Remaining
    context.fillText("LOLOL: " + score, 280, 40);
    context.fillText("LOLOL: " + gameOverCount, 400, 40);

    // render menu text
    context.fillText("SYSTEM ALERT:", 25, 120);
    context.fillText("You are being hacked! Decrypt the string into " +
        "plaintext before your system is broken into.", 25, 150);

    // render menu instructions
    context.fillText("INSTRUCTIONS", 330, 250);

    // render START GAME BUTTON
    context.fillStyle = "red";
    context.fillRect(340, 530, 100, 40);
    context.lineWidth = 2;

    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("START", 365, 555);
}

/**
 * INTERACTIONS
 *
 * Event listeners for selecting the game state.
 */
var buttonclick = {};
canvas.addEventListener("click", function(event) { // pulling in DOM, adding different events
    buttonclick[event.keyCode] = true;                    // whenever we press a key, it will return ascii char for key
    console.log(buttonclick);
    mouseClicked(canvas);
}, false);

function mouseClicked(e) {
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
    console.log(mouseX);
    if (btnPlay.checkClicked()) {
        renderer();
    }
}