/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 *
 * Crypto_model.js represents the MODEL.
 */

/** Encryption / Decryption data */
var map = {};
var questions = ["A _______ substitution cipher is a more generalised term for the Caesar Cipher.",
                 "A special and case of the Caesar Cipher is the ___ __________ cipher.",
                 "A method used to break the Caesar Cipher is called ______ ______.",
                 "Five most frequently occurring letters in English text, in order, are _ _ _ _ _.",
                 "Writing out the result of all possible shifts is an example of a ____ ____ ____.",
                 "The Caesar cipher is named after _____ _____."];
var plaintext = ["MONOALPHABETIC",
                 "ROT THIRTEEN",
                 "FREQUENCY ANALYSIS",
                 "E T A O I N",
                 "BRUTE FORCE ATTACK",
                 "JULIUS CAESAR"];
var selectedQuestion = "";
var selectedPlaintext = "";
var userString = "";

/** Global game data */
// 0 = main menu, 1 = game running, 2 = decryption attempt
var gameState = 0;
var startTime = 0;
var defaultTimeLimit = 700;
var timeLimit = defaultTimeLimit;
var clickedMainMenu = false;
var gameMode = "";
var gameWon = false;
// resulting encrypted string
var encrypted = "";

/** Button objects */
// Start button pos + sizing
var easyBtn = {
    x: 280,
    y: 400,
    width: 100,
    height: 40
};
// Difficult mode
var hardBtn = {
    x: 420,
    y: 400,
    width: 100,
    height: 40
};
// Instructions button
var instructionsBtn = {
    x: 330,
    y: 480,
    width: 155,
    height: 40
};
// Instructions start button
var instructStartBtn = {
    x: 335,
    y: 540,
    width: 150,
    height: 40
};

// Menu button pos + sizing
var menuBtn = {
    x: 640,
    y: 16,
    width: 110,
    height: 40
};
// Submit button
var submitBtn = {
    x: 350,
    y: 500,
    width: 100,
    height: 40
};
// Play again button
var replayBtn = {
    x: 310,
    y: 400,
    width: 160,
    height: 40
};

/** Char + box positioning */
// Char x pos
var cPos_x = [53, 83, 113, 143, 173, 203, 233, 263, 293, 323, 353,
        383, 413, 443, 473, 503, 533, 563, 593, 623, 653, 683];

// Char y pos
var cPos_y = [380, 480];

// Box x pos
var bPos_x = [50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350,
        380, 410, 440, 470, 500, 530, 560, 590, 620, 650, 680];

// Box y pos
var bPos_y = [395, 495];

/** Box objects for interaction */
var boxW = 20;
var boxH = 35;
var boxArray = [];





