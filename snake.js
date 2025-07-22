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

let score = 0;
let scoreElement;
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

    scoreElement = document.createElement("div");
    scoreElement.style.position = "absolute";
    scoreElement.style.top = "10px";
    scoreElement.style.left = "50%";
    scoreElement.style.transform = "translateX(-50%)";
    scoreElement.style.fontSize = "20px";
    scoreElement.style.color = "white";
    scoreElement.style.fontFamily = "Arial, sans-serif";
    scoreElement.innerText = "Score: 0";
    document.body.appendChild(scoreElement);

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
    context.fillStyle = "#3fa34d"; // Green background
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 1;
        scoreElement.innerText = "Score: " + score;
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
    let container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.color = "white";
    container.style.fontSize = "32px";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    container.style.padding = "20px";
    container.style.borderRadius = "10px";
    container.style.textAlign = "center";

    let message = document.createElement("div");
    message.innerText = "Game Over!";
    container.appendChild(message);

    let finalScore = document.createElement("div");
    finalScore.innerText = "Your Score: " + score;
    finalScore.style.marginTop = "10px";
    finalScore.style.fontSize = "20px";
    container.appendChild(finalScore);

    let retryButton = document.createElement("button");
    retryButton.innerText = "Retry";
    retryButton.style.marginTop = "15px";
    retryButton.style.fontSize = "18px";
    retryButton.style.padding = "10px 20px";
    retryButton.style.cursor = "pointer";
    retryButton.style.border = "none";
    retryButton.style.borderRadius = "6px";
    retryButton.style.backgroundColor = "#00bfff";
    retryButton.style.color = "white";
    retryButton.onclick = () => location.reload();

    container.appendChild(retryButton);
    document.body.appendChild(container);
}
