const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const restartButton = document.getElementById('restartButton');

const TAMANHO_BLOCO = 10;
const LARGURA_CANVAS = 600;
const ALTURA_CANVAS = 400;
const VELOCIDADE_INICIAL = 100;

let paddleHeight = 100;
let paddleWidth = 10;
let leftPaddleY = (ALTURA_CANVAS - paddleHeight) / 2;
let rightPaddleY = (ALTURA_CANVAS - paddleHeight) / 2;
let ballX = LARGURA_CANVAS / 2;
let ballY = ALTURA_CANVAS / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;
let score = 0;
let ballRadius = 10;
let gameOver = false;
let gameSpeed = VELOCIDADE_INICIAL;

function desenharPaddles() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(LARGURA_CANVAS - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

function desenharBola() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

function moverBola() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > ALTURA_CANVAS || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballRadius > LARGURA_CANVAS - paddleWidth) {
        if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            score++;
            atualizarScore();
            aumentarVelocidade();
        } else {
            gameOver = true;
        }
    }

    if (ballX - ballRadius < paddleWidth) {
        if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            gameOver = true;
        }
    }
}

function moverPaddles() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && rightPaddleY > 0) rightPaddleY -= 10;
        if (e.key === 'ArrowDown' && rightPaddleY < ALTURA_CANVAS - paddleHeight) rightPaddleY += 10;
        if (e.key === 'w' && leftPaddleY > 0) leftPaddleY -= 10;
        if (e.key === 's' && leftPaddleY < ALTURA_CANVAS - paddleHeight) leftPaddleY += 10;
    });
}

function atualizarScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function aumentarVelocidade() {
    if (score % 5 === 0) {
        ballSpeedX *= 1.1;
        ballSpeedY *= 1.1;
        gameSpeed -= 10; // Aumenta a velocidade do jogo
    }
}

function gameOverScreen() {
    gameOverElement.style.display = 'block';
}

function reiniciarJogo() {
    score = 0;
    ballSpeedX = 2;
    ballSpeedY = 2;
    gameSpeed = VELOCIDADE_INICIAL;
    leftPaddleY = (ALTURA_CANVAS - paddleHeight) / 2;
    rightPaddleY = (ALTURA_CANVAS - paddleHeight) / 2;
    ballX = LARGURA_CANVAS / 2;
    ballY = ALTURA_CANVAS / 2;
    gameOver = false;
    gameOverElement.style.display = 'none';
    atualizarScore();
    gameLoop();
}

restartButton.addEventListener('click', reiniciarJogo);

function gameLoop() {
    if (gameOver) {
        gameOverScreen();
        return;
    }

    ctx.clearRect(0, 0, LARGURA_CANVAS, ALTURA_CANVAS);
    desenharPaddles();
    desenharBola();
    moverBola();
    moverPaddles();

    setTimeout(gameLoop, gameSpeed);
}

gameLoop();
