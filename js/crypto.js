/**
 * Caesar Cipher Puzzle
 * @author Brian Lam
 */

/**
 * IDEAS
 *
 * Player can fill in text box below each char object.
 * They have an X amount of chances to check their answer.
 * - Incorrect text boxes will have a red border
 * - Correct text boxes will have a green border
 * - Unfilled text boxes will remain neutral coloured
 * If changes go to zero, they cannot check their answer anymore.
 * Once they click the SUBMIT button, they should have the correct decrypted key
 * or else the alarm will be triggered and they get caught.
 *
 * If text-input is too difficult, treat each char .png as an object.
 * The player may click on each char of the encrypted text, then press a keyboard
 * letter to enter in what they think is the decrypted char.
 * Once pressed, the game engine will render their choice directly below the
 * encrypted char.
 */

/**
 * Canvas
 */
/* Creating canvas */
var canvas = document.createElement("canvas");          // Doing same as above except hooking it on DOM
var context = canvas.getContext("2d");                  // to manipulate with ctx
document.body.appendChild(canvas);                      // append canvas object to body
canvas.width = 800;
canvas.height = 600;

/**
 *  Objects and data
 *
 *  Instead of using PICTURES OF CHARACTERS, you should use the canvas.fillText(text,x,y,maxWidth) function
 *  Change text colour = light green
 */

var score = 0;          // player score
var gameOverCount = 0;  // countdown timer

//var inputString = "nothing";  // String input that will be parsed by fillText() on canvas
                                // Need to write function to:
                                //      Separate string by char
                                //      Parse the chars as output into canvas
                                // While !endOfString
                                //      encryptChar(inputString);       // Encrypt char-by-char
                                //      render char onto screen         // fillText(char,x,y,width)

/**
 * Alphabet positioning
 *
 * Possibly set locations for each char using XY Coords
 * X = row #
 * Y = column #
 *
 * Example:
 *    Y1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
 * X1  T H I S   I S   A N     E N C R Y P T E D
 * X2  M E S S A G E .
 * X3
 */

// USED FOR POSITIONING A-Z OBJECTS
// var column = 0;
// var row = 0;

/* alphabet object: may be redundant as you can just use canvas.fillText() */
var A = {
    x:50,
    y:100,
};

/**
 * Load image files
 */
// Main computer terminal background
mainImage = new Image();            // main img object
//mainImage.ready = false;            // default = false
mainImage.onload = checkReady;      // image loads
                                    // -> does rdy check
                                    // -> sets rdy = true
                                    // -> launch game rendering fn
mainImage.src = "/CryptoBase/images/canvas1.png";

// A-Z alphabet chars
//alphabet = new Image();
//alphabet.ready = false;
//alphabet.onload = checkReady;

/* ready check for images being loaded */
function checkReady() {
    this.ready = true;
    playGame();     //playGame fn executes the image rendering.
                    // !!! Render fn is currently incorrect, need to fix this !!!s
}

/**
 * Game rendering
 *
 * POSSIBLE SEPARATE RENDERING DEPENDING ON GAMESTATE
 * STATE 1: Before start game
 * STATE 2: Instructions rendering
 * STATE 3: Game start
 *
 * OTHER STATES
 * Game -> Restart / replay = STATE 3
 * Game -> Home = STATE 1
 * Instructions -> Home screen = STATE 1
 */
function playGame() {
    render();
    console.log();
    requestAnimationFrame(playGame);            // continuously render the game
                                                // need to continually loop functions to run games
}

/* renders game, where we output content in canvas */
function render() {
    // renders canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    context.font = "normal 16px Verdana";
    context.fillText("Score: " + score, 280, 40);
    context.fillText("Time remaining: " + gameOverCount, 400, 40);
}

/**
 * Interactions
 */
/* CAESAR CIPHER EVENT LISTENERS */

