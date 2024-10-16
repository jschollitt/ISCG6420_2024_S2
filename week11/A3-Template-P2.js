window.addEventListener("load", load);

function load() {
    // 
}

function init() {
    // initialise game data, such as canvas and context.
}

function run() {
    // perform a game loop
    update();
    draw();

    window.requestAnimationFrame(run);
}

function update() {
    // calculate tick (time since last update)

    // perform game updates to object positions, UI text, etc
    
}

function draw() {
    // clear the screen

    // draw all game objects, either manually here or by calling game object draw methods

    // draw UI text if drawn in canvas
}

function doKeyInput(event) {
    // handle user input from a keyboard key press
}

function doMouseInput(event) {
    // handle user input from a mouse (if used)
}