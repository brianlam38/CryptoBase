/**
 * Renderer script for the game.
 */

/**
 * MENU RENDER
 *
 * Renders the main menu, instruction text and the start game button.
 */
function menu() {
    // reset values from prev game instances
    resetData();

    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render menu text
    context.fillText("SYSTEM ALERT:", 25, 120);
    context.fillText("You are being hacked! Decrypt the string into " +
        "plaintext before your system is broken into.", 25, 150);
    context.fillText("INSTRUCTIONS", 330, 250);

    // render start btn
    context.fillStyle = "red";
    context.fillRect(340, 530, 100, 40);
    context.lineWidth = 2;

    // render start btn text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("START", 365, 555)
}

/**
 * PLAY GAME LOOP
 *
 * Continually updates the state of the game as the player makes changes.
 */
function renderBoard() {
    // render canvas
    context.drawImage(mainImage, 0, 0, 800, 600);

    // render Score + Time Remaining
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("Score: " + score, 180, 40);
    context.fillText("Time Remaining: " + timeLimit, 350, 40);

    // render go back to main menu button
    context.fillStyle = "red";
    context.fillRect(640, 15, 120, 40);
    context.lineWidth = 2;
    context.stroke();

    // render start button text
    context.fillStyle = "white";
    context.font = "lighter 16px Verdana";
    context.fillText("MAIN MENU", 650, 40);
}

// #66C88F = colour of CORRECTLY decrypted char

/**
 * renderEncrypted renders encrypted text to the canvas.
 */
var encryptComplete = false;
function renderEncrypted(encrypted) {
    var box_x = 50;
    var box_y = 250; //180
    var char_x = 53;
    var char_y = 235;

    // render encrypted string
    var len = encrypted.length;
    for (var i = 0; i < len; i++) {
        console.log("render encrypted string");
        console.log(encrypted.charAt(i));
        // render char
        context.fillStyle = "white";
        context.font = "16px Verdana";
        context.fillText(encrypted.charAt(i), char_x, char_y);
        // render char box
        context.rect(box_x, box_y, 20, 35);
        context.lineWidth = 1;
        context.strokeStyle = "#7C7E7B";
        context.stroke();
        // spread out the chars rightwards
        box_x += 30;
        char_x += 30;
        // newline if over canvas bounds
        if (box_x > 700) {
            box_y += 100;
            char_y += 100;
            box_x = 50;
            char_x = 53;
        }
    }
    // mark as completed
    encryptComplete = true;
}

/**
 * playGame is the game engine that calls the rendering.
 */
var encrypted = "";
function playGame() {
    // render static board
    renderBoard();

    // generate encrypted string and render
    if (!encryptComplete) {
        encrypted = getEncryptedStr();
        requestAnimationFrame(renderEncrypted(encrypted));
    }
    // stop generating encrypted string
    cancelAnimationFrame(renderEncrypted);

    // continue or game over
    timeLimit--;
    if (timeLimit == -1) {
        cancelAnimationFrame(playGame);
        gameState = 0;
        //menu();
    } else {
        gameState = 1;
        requestAnimationFrame(playGame);
    }
}