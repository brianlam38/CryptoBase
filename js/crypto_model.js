/**
 * Caesar Cipher Tug-O-War
 * @author Brian Lam
 *
 * Crypto_model.js represents the MODEL.
 */

/** Plaintext data */
var plaintext = ["THIS IS A TEST MESSAGE LOL",
                 "SUBSTITUTION CIPHERS ARE COOL",
                 "STEALING COMPANY INFORMATION"];
var selectedPlaintext = "";

/** Game data */
// 0 = main menu, 1 = game running
var gameState = 0;
var defaultScore = 0;
var defaultTimeLimit = 300;
var score = defaultScore;
var timeLimit = defaultTimeLimit;
// resulting encrypted string
var encrypted = "";
// render states
var selectedBox = false;

/** Button objects */
// Start button pos + sizing
var startBtn = {
    x: 350,
    y: 400,
    width: 100,
    height: 40
};
// Menu button pos + sizing
var menuBtn = {
    x: 640,
    y: 16,
    width: 110,
    height: 40
};

/** Char + box positioning */
// Char x pos
var cPos_x = [53, 83, 113, 143, 173, 203, 233, 263, 293, 323, 353,
        383, 413, 443, 473, 503, 533, 563, 593, 623, 653, 683];

// Char y pos
var cPos_y = [235, 335, 435];

// Box x pos
var bPos_x = [50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350,
        380, 410, 440, 470, 500, 530, 560, 590, 620, 650, 680];

// Box y pos
var bPos_y = [250, 350, 450];

/** Box objects for interaction */
var boxW = 20;
var boxH = 35;
var boxArray = [];





