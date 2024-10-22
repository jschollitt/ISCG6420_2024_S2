// time tracking
let lastTimeStamp = 0;
let tick = 0;

// canvas and context, not const as we don't set the value until document ready
let canvas;
let context;

// game objects
let balls = [];
let index = 0;

// run when the website has finished loading
window.addEventListener("load", () => {
    console.log("ready");
    init();
});

// initialise canvas and game elements
function init() {
    console.log("init");
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    let leftBoundary = 15;
    let rightBoundary = canvas.width - 15;
    // create ball objects
    balls.push(new Ball(randomInRange(leftBoundary, rightBoundary) , -20, 20, "green", canvas.width, canvas.height));
    balls.push(new Ball(randomInRange(leftBoundary, rightBoundary) , -20, 20, "yellow", canvas.width, canvas.height));
    balls.push(new Ball(randomInRange(leftBoundary, rightBoundary) , -20, 20, "orange", canvas.width, canvas.height));
    balls.push(new Ball(randomInRange(leftBoundary, rightBoundary) , -20, 20, "red", canvas.width, canvas.height));
    balls.push(new Ball(randomInRange(leftBoundary, rightBoundary) , -20, 20, "blue", canvas.width, canvas.height));
    balls.push(new Ball(randomInRange(leftBoundary, rightBoundary) , -20, 20, "purple", canvas.width, canvas.height));
    console.log("balls loaded", balls);

    canvas.addEventListener("click", doClick)
    window.requestAnimationFrame(run);
}

function run(timeStamp) {
    tick = (timeStamp - lastTimeStamp);
    lastTimeStamp = timeStamp;

    update();
    draw();

    window.requestAnimationFrame(run);
}

function update() {
    balls.forEach((ball) => {
        ball.update(tick);
    });
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
        ball.draw(context);
    });
}

function doClick(event) {
    if (balls[index].state !== "ready") {
        return;
    }
    balls[index].launch();
    index = (index + 1 + balls.length) % balls.length;
}

function Ball(X, Y, radius, colour, width, height) {
    return {
        position: { x: X,y: Y },
        radius: radius,
        colour: colour,

        // keep hold of the canvas size for spawning purposes
        canvasWidth: width,
        canvasHeight: height,

        /*
            Project requirement, travel to pool, wait 5 seconds, return over 5 seconds.
            Distance to travel = height of canvas.
            Time to travel = 5000ms or 5s
            Updates per second (assuming 60Hz monitor) = 1000 / 16.67 = 60
            Distance per update = distance to travel / time to travel / updates per second
            step = 600 / 5 / 60 = 2
        */
        // how far to move each update
        step: 2,
        
        state: "ready",

        update: function (tick) {
            switch(this.state) {
                case "launch":
                    this.position.y += this.step;
                    break;

                case "return":
                    this.position.y -= this.step;
                    break;
            }
        },
        draw: function (context) {
            context.fillStyle = this.colour;
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        },
        launch: function () {
            // get a random X value across the canvas width
            let x = randomInRange(0, this.canvasWidth);
            // get a random Y value above the canvas, with offset of -100 for imperfect timing issues
            let y = randomInRange(this.canvasHeight * -1, -100);
            this.position = {x, y};
            this.state = "launch";
            // update state based on time since launch
            setTimeout(() => {this.state = "stay";}, 5000);
            setTimeout(() => {this.state = "return";}, 10000);
            setTimeout(() => {this.state = "ready";}, 15000);
        }

    }
}

// get a random number, rounded, between the min and max parameter values
function randomInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}