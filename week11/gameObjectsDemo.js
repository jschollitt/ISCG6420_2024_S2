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

    balls.push(new Ball(-20, -20, 20, "green"));
    balls.push(new Ball(250, -20, 20, "red"));
    balls.push(new Ball(550, -20, 20, "blue"));
    balls.push(new Ball(820, -20, 20, "yellow"));
    balls.push(new Ball(-20, 300, 20, "orange"));
    balls.push(new Ball(820, 300, 20, "white"));
    balls.push(new Ball(-20, 620, 20, "black"));
    balls.push(new Ball(250, 620, 20, "purple"));
    balls.push(new Ball(550, 620, 20, "pink"));
    balls.push(new Ball(820, 620, 20, "gray"));
    console.log("balls loaded", balls);

    canvas.addEventListener("click", doClick)
    window.requestAnimationFrame(run);
}

// Game loop function
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
    let bounds = canvas.getBoundingClientRect();
    inCanvasX = Math.floor(event.clientX - bounds.left);
    inCanvasY = Math.floor(event.clientY - bounds.top);
    balls[index].launch(inCanvasX, inCanvasY);
    index = (index + 1 + balls.length) % balls.length;
}

function Ball(X, Y, radius, colour) {
    return {
        position: { x: X,y: Y },
        radius: radius,
        colour: colour,

        // beginning and end of travel
        origin: {x: X, y: Y},
        target: null,
        
        // time of each phase in ms. Must be above 0
        launchTime: 1000,
        stayTime: 5000,
        returnTime: 5000,
        
        // keep track of progress during each moving phase
        launchTimeDelta: 0,
        stayTimeDelta: 0,
        returnTimeDelta: 0,
        
        state: "ready",
        update: function(tick) {
            switch(this.state) {
                case "launch":
                    if (this.position.x == this.target.x && this.position.y == this.target.y) {
                        this.state = "stay";
                        this.launchTimeDelta = 0;
                        break;
                    }
                    this.launchTimeDelta = clamp(this.launchTimeDelta + tick, 0, this.launchTime);
                    this.position = lerpVector(this.origin, this.target, easeOut(this.launchTimeDelta / this.launchTime));
                    this.radius
                    break;
                case "stay":
                    console.log("stay", this.stayTimeDelta, this.stayTime);
                    if (this.stayTimeDelta >= this.stayTime) {
                        this.state = "return";
                        this.stayTimeDelta = 0;
                        break;
                    }
                    this.stayTimeDelta = clamp(this.stayTimeDelta + tick, 0, this.stayTime);
                    break;
                case "return":
                    if (this.position.x == this.origin.x && this.position.y == this.origin.y) {
                        this.state = "ready";
                        this.origin = Object(this.position);
                        this.returnTimeDelta = 0;
                        break;
                    }
                    this.returnTimeDelta = clamp(this.returnTimeDelta + tick, 0, this.returnTime);
                    this.position = lerpVector(this.target, this.origin, easeIn(this.returnTimeDelta / this.returnTime));
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
        launch: function(destinationX, destinationY) {
            this.target = {x: destinationX, y: destinationY};
            this.state = "launch";
        },

    }
}

function lerp(origin, destination, time) {
    return origin + (destination - origin) * time;
}

function lerpVector(origin, destination, time) {
    let position = {
        x: lerp(origin.x, destination.x, time),
        y: lerp(origin.y, destination.y, time)
    };
    return position;
}

// Easing functions. See here: https://easings.net/
function easeOut(time) {
    return 1 - Math.pow(1 - time, 3);
}

function easeIn(time) {
    return Math.pow(time, 3);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}