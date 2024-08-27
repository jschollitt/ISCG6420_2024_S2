// global variables for the gradient slider demo
let canvas3;
let context3;
let mygradient = null;
let gradientDirection = 1;

// global variables for the mouse click demo
let canvas9;
let context9;

window.onload = () => {

    const canvas1 = document.getElementById('canvas1');
    const context1 = canvas1.getContext("2d");
    drawShapes(context1, false);

    const canvas2 = document.getElementById('canvas2');
    const context2 = canvas2.getContext("2d");
    drawShapes(context2, true);

    canvas3 = document.getElementById('canvas3');
    context3 = canvas3.getContext("2d");
    DrawGradients(0.5);

    const canvas4 = document.getElementById('canvas4');
    const context4 = canvas4.getContext("2d");
    slindingSquare(canvas4, context4);

    const canvas5 = document.getElementById('canvas5');
    const context5 = canvas5.getContext("2d");
    animateGradient(canvas5, context5);

    const canvas6 = document.getElementById('canvas6');
    const context6 = canvas6.getContext("2d");
    animateImage(canvas6, context6);

    const canvas7 = document.getElementById('canvas7');
    const context7 = canvas7.getContext("2d");
    drawSpiral(context7);

    const canvas8 = document.getElementById('canvas8');
    const context8 = canvas8.getContext("2d");
    face(context8);

    canvas9 = document.getElementById('canvas9');
    context9 = canvas9.getContext("2d");
    canvas9.addEventListener("mousedown", click);

    const canvas10 = document.getElementById('canvas10');
    const context10 = canvas10.getContext("2d");
    bouncingBall(canvas10, context10);
}

function drawShapes(context, drawFilled) {
    // Draw a line
    context.beginPath();
    context.moveTo(10, 10);
    context.lineTo(390, 10);
    context.lineWidth = 3;
    context.stroke();

    // Draw a square
    context.strokeStyle = context.fillStyle = "red";
    context.beginPath();
    context.rect(10, 20, 50, 100);
    drawFilled ? context.fill() : context.stroke();

    // Draw a triangle
    context.strokeStyle = context.fillStyle = "green";
    context.beginPath();
    context.moveTo(100, 20);
    context.lineTo(250, 20);
    context.lineTo(175, 100);
    context.lineTo(100, 20);
    drawFilled ? context.fill() : context.stroke();

    // Draw a circle
    context.strokeStyle = context.fillStyle = "blue";
    context.beginPath();
    context.arc(300, 100, 50, 0, 2 * Math.PI, true);
    context.closePath();
    drawFilled ? context.fill() : context.stroke();

    // Draw Pacman
    context.strokeStyle = context.fillStyle = "yellow";
    context.beginPath();
    context.arc(350, 225, 50, -1, 1, true);
    context.lineTo(350, 225);
    context.closePath();
    drawFilled ? context.fill() : context.stroke();

    // Draw a checkmark
    context.strokeStyle = context.fillStyle = "orange";
    context.beginPath();
    context.moveTo(20, 200);
    context.quadraticCurveTo(0, 300, 200, 200);
    context.quadraticCurveTo(-50, 360, 20, 200);
    drawFilled ? context.fill() : context.stroke();
}

function DrawGradients(value) {
    RecalcGradient(value)
    context3.clearRect(0, 0, canvas3.clientWidth, canvas3.clientHeight);
    context3.fillStyle = mygradient;
    context3.fillRect(0, 0, canvas3.clientWidth, canvas3.clientHeight);
}

function RecalcGradient(value) {

    switch (gradientDirection) {
        case 2:
            mygradient = context3.createLinearGradient(0, 0, canvas3.clientWidth, 0);
            break;
        case 3:
            mygradient = context3.createLinearGradient(0, 0, canvas3.clientWidth, canvas3.clientHeight);
            break;
        case 4:
            mygradient = context3.createLinearGradient(0, canvas3.clientHeight, canvas3.clientWidth, 0);
            break;
        default:
            mygradient = context3.createLinearGradient(0, 0, 0, canvas3.clientWidth);
            break;
    }

    mygradient.addColorStop(0, "#ffffff");
    mygradient.addColorStop(value, "#111111");
    mygradient.addColorStop(1, "#000000");
}

function SliderUpdate(slider) {
    DrawGradients((isNaN(slider.value) ? 50 : slider.value) / 100);
}

function SetGradientDir(option) {
    gradientDirection = option;
    SliderUpdate(document.getElementById("myRange"));
}

function slindingSquare(canvas, context) {
    let x = -50;
    let y = 0;


    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = "red";
        context.rect(x, y, 50, 50);
        context.fill();
        x++;

        if (x > canvas.width) {
            x = -50;
        }
    }

    setInterval(draw, 16);
}

function animateGradient(canvas, context) {

    let halfWidth = 0.5 * canvas.width;
    let halfHeight = 0.5 * canvas.height;
    let radii = [
        10,
        halfHeight / 2,
        halfHeight
    ]
    let grow = true;

    let animation = setInterval(animate, 20);

    function animate() {
        update();
        draw();
    }

    function update() {
        if (grow) {
            radii[1]++;
        }
        else {
            radii[1]--;
        }

        if (radii[1] >= radii[2] - 1 || radii[1] <= radii[0] + 1) {
            grow = !grow;
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        let gradient = context.createRadialGradient(
            halfWidth, halfHeight, radii[0],
            halfWidth, halfHeight, radii[1]
        );
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "blue");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function animateImage(canvas, context) {
    const img1 = document.getElementById("canvas4Img1");

    let x = 0;
    let y = 0;

    let animation = setInterval(animate, 20);

    function animate() {
        update();
        draw();
    }

    function update() {
        if (x + img1.width > canvas.width) {
            x--;
        }
        else {
            x = 0;
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(img1, x, y);
    }
}

function drawSpiral(context) {
    let x = 0;
    let y = 0;
    let radius = 10;
    let radiusOffset = 0.2;
    let arcStart = 0;
    let arcFinish = 0.05 * Math.PI;
    let arcOffset = 0.05;

    let spiral = setInterval(draw, 20);

    function draw() {
        context.beginPath();
        context.lineWidth = 5;
        context.strokeStyle = "magenta";
        context.arc(400, 200, radius, arcStart, arcFinish, false);
        context.stroke();

        radius = radius + radiusOffset;
        arcStart = arcStart + arcOffset;
        arcFinish = arcFinish + arcOffset;

        if (radius > 600) {
            clearInterval(spiral);
        }
    }
}

function face(context) {

    let x = 15;
    let y = 15;
    let xAdd = 3;
    let yAdd = 1;

    // Grey background
    context.fillStyle = "rgb(200, 200, 200)";
    context.fillRect(50, 50, 400, 400);

    // Head
    context.beginPath();
    context.arc(250, 250, 100, 0, Math.PI * 2, true);
    context.fillStyle = "rgb(255, 154, 145";
    context.fill();
    context.closePath();
    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.stroke();

    // Left eye
    context.beginPath();
    context.arc(220, 240, 40, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // Right eye
    context.beginPath();
    context.arc(290, 240, 40, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fill();

    // Left iris
    context.beginPath();
    context.arc(225, 240, 5, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "blue";
    context.stroke();

    // Right iris
    context.beginPath();
    context.arc(285, 240, 5, 30, Math.PI * 2, true);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = "blue";
    context.stroke();

    context.beginPath();
    context.arc(250, 310, 20, Math.PI, 0, true);
    context.closePath();
    context.lineWidth = 10;
    context.strokeStyle = "red";
    context.stroke();

    function moveEyes() {
        x += xAdd;
        y += yAdd;
        if (x > 20 || x < 0) xAdd = -xAdd;
        if (y > 20 || x < 0) yAdd = -yAdd;
        x += xAdd;
        y += yAdd;
        doEyes(x, y);
    }

    function doEyes(x, y) {

        // draw 2 black circles
        context.beginPath();
        context.arc(220, 240, 40, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();
        context.fillStyle = 'rgb(255,255,255)';
        context.fill();

        context.beginPath();
        context.arc(290, 240, 40, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();
        context.fillStyle = 'rgb(255,255,255)';
        context.fill();

        // draw 2 blue circles
        context.beginPath();
        context.arc(225 + x, 240 + y, 5, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "blue";
        context.stroke();

        context.beginPath();
        context.arc(285 + x, 240 + y, 5, 30, Math.PI * 2, true);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = "blue";
        context.stroke();
    }
    setInterval(moveEyes, 200);
}

function click(event) {
    let rect = canvas9.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    context9.beginPath();
    context9.arc(x, y, 20, 0, 2 * Math.PI, true);
    context9.closePath();
    context9.fillStyle = "#ff8080";
    context9.fill();
}

function bouncingBall(canvas, context) {
    let raf;

    const ball = {
        x: 100,
        y: 100,
        vx: 5,
        vy: 1,
        radius: 25,
        color: "blue",
        draw() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
        },
    };

    function clear() {
        context.fillStyle = "rgb(255 255 255 / 30%)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        clear();
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (
            ball.y + ball.vy > canvas.height - ball.radius ||
            ball.y + ball.vy < ball.radius
        ) {
            ball.vy = -ball.vy;
        }
        if (
            ball.x + ball.vx > canvas.width - ball.radius ||
            ball.x + ball.vx < ball.radius
        ) {
            ball.vx = -ball.vx;
        }

        raf = window.requestAnimationFrame(draw);
    }

    draw();

}