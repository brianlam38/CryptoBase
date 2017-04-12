/**
 * Caesar Cipher Puzzle
 * @author Brian Lam
 */

/**
 *  Player and data
 */
/* default starting score */
var score = 0;
var gscore = 0;
var ghost = false;

/* player object */
var player = {
    x:50,
    y:100,
    pacmouth:320,
    pacdir:0,
    psize:30,
    speed:10
};

/* enemy object */
var enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,      // countdown to re-evaluate which direction to go once = 0
    dirx: 0,
    diry: 0
};

/**
 * Canvas / image creation
 */
/* Creating canvas */
var canvas = document.createElement("canvas");          // Doing same as above except hooking it on DOM
var context = canvas.getContext("2d");                  // to manipulate with ctx
//context.fillText("helloworld", 10, 150);                // ??? possibly remove
document.body.appendChild(canvas);                      // append canvas object to body
canvas.width = 800;
canvas.height = 500;

/* Image load */
mainImage = new Image();            // main img object
mainImage.ready = false;            // default = false
mainImage.onload = checkReady;      // image loads -> does rdy check -> sets rdy = true -> launch game rendering fn
mainImage.src = "/CryptoBase/images/pac.png";

/**
 * Interactions
 */
/* setup event listener: press a key, return an ascii value for the char key */
var keyclick = {};
document.addEventListener("keydown", function(event) { // pulling in DOM, adding different events
    keyclick[event.keyCode] = true;                    // whenever we press a key, it will return ascii char for key
    console.log(keyclick);
    move(keyclick);
}, false);

/* setup event listener: lift up key, lose the value */
document.addEventListener("keyup", function(event) {
    delete keyclick[event.keyCode];
}, false);

/* moving things around the screen */
function move(keyclick) {
    if (37 in keyclick) {player.x -= player.speed; player.pacdir = 64;}   // left
    if (38 in keyclick) {player.y -= player.speed; player.pacdir = 96;}   // up
    if (39 in keyclick) {player.x += player.speed; player.pacdir = 0;}    // right
    if (40 in keyclick) {player.y += player.speed; player.pacdir = 32;}   // down

    // allowing player to wrap around to other side if they cross border
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = (canvas.width - 32);
    }
    if (player.y < 0) {
        player.y = (canvas.height - 32);
    }
    // everytime pacman moves, mouth opens and closes (uses 352/320 spot on pac.png)
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    }

    render();
}

/* ready check for images being loaded */
function checkReady() {
    this.ready = true;
    playGame();
}

// returning a rand number (set for a random ghost)
function myNum(n) {
    return Math.floor(Math.random() * n);
}

/**
 * Game rendering
 *
 * 1. Main render execution
 * 2. Main render function
 *
 * POSSIBLY SEPARATE RENDERING OF DIFFERENT OBJECTS???
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
    context.fillStyle = "black";                               // renders bg colour: can use hex, rbg etc.
    context.fillRect(0, 0, canvas.width, canvas.height);       // rectangle dimensions: x,y,w,h coords

    if (!ghost) {
        enemy.ghostNum = myNum(5) * 64;
        enemy.x = myNum(450);
        enemy.y = myNum(250) + 30;
        ghost = true;
    }
    // render enemy movements -> move towards player
    if (enemy.moving < 0) {
        enemy.moving = (myNum(20) * 3) + 10 + myNum(1);    // rand moving countdown
        enemy.speed = myNum(4) + 1;
        enemy.dirx = 0;                 // set direction X = 0
        enemy.diry = 0;                 // set direction Y = 0
        if (enemy.moving % 2) {         // if remainder exists move left/right
            if (player.x < enemy.x) {   // if remainder doesn't exist, move up/down
                enemy.dirx = -enemy.speed;
            } else {
                enemy.dirx = enemy.speed;
            }
        } else {
            if (player.y < enemy.y) {
                enemy.diry = -enemy.speed;
            } else {
                enemy.diry = enemy.speed;
            }
        }
    }

    enemy.moving--;                     // similar to keyboard for player
    enemy.x = enemy.x + enemy.dirx;     // decreasing moving to reset once in awhile
    enemy.y = enemy.y + enemy.diry;

    // make sure enemy doesn't run off page
    if (enemy.x >= (canvas.width - 32)) { enemy.x = 0; }
    if (enemy.y >= (canvas.height - 32)) { enemy.y = 0; }
    if (enemy.x < 0) { enemy.x = (canvas.width - 32); }
    if (enemy.y < 0) { enemy.y = (canvas.height - 32); }

    // renders score information
    context.font = "20px Verdana";
    context.fillStyle = "white";

    // renders enemy and player
    context.fillText("Pacman: " + score + " vs Ghost:" + gscore, 2, 18);
    context.drawImage(mainImage, enemy.ghostNum, 0, 32, 32, enemy.x, enemy.y, 32, 32);
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32,
        player.x, player.y, player.psize, player.psize);
    // Params (imageObj, x.src, y.src, w.src, h.src, x.dest, y.dest, x.resize, y.resize)
    // (additional params to "crop" image for usage)
}







