let blocksize = 20;
let rows = 20;
let cols = 20;
let board;
let context;

let snakeX = blocksize * 9;
let snakeY = blocksize * 9;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let lastTime = 0;
let gameSpeed = 100;

window.onload = () => {
    board = document.getElementById("board");
    if (!board) return;
    board.width = cols * blocksize;
    board.height = rows * blocksize;
    context = board.getContext("2d");

    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "black";
    board.style.display = "block";
    board.style.margin = "auto";
    board.style.imageRendering = "pixelated";

    placeFood();
    document.addEventListener("keydown", changeDirection);
    requestAnimationFrame(gameLoop);
};

function gameLoop(timestamp) {
    if (gameOver) return;

    if (timestamp - lastTime > gameSpeed) {
        update();
        lastTime = timestamp;
    }
    requestAnimationFrame(gameLoop);
}

function update() {
    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = [...snakeBody[i - 1]];
    }

    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;

    if (snakeX < 0 || snakeX >= cols * blocksize || snakeY < 0 || snakeY >= rows * blocksize) {
        endGame();
        return;
    }

    for (let segment of snakeBody) {
        if (snakeX === segment[0] && snakeY === segment[1]) {
            endGame();
            return;
        }
    }

    context.fillStyle = "skyblue";
    context.fillRect(snakeX, snakeY, blocksize, blocksize);

    for (let segment of snakeBody) {
        context.fillRect(segment[0], segment[1], blocksize, blocksize);
    }
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}

function endGame() {
    gameOver = true;
    showGameOverMessage();
}

function showGameOverMessage() {
    let msg = document.createElement("div");
    msg.innerText = "Game Over!";
    msg.style.position = "absolute";
    msg.style.top = "50%";
    msg.style.left = "50%";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.color = "white";
    msg.style.fontSize = "32px";
    msg.style.backgroundColor = "rgba(0,0,0,0.6)";
    msg.style.padding = "20px";
    msg.style.borderRadius = "10px";
    document.body.appendChild(msg);
}
