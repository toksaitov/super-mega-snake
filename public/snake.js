import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

import {
    areCoordsInsideField
} from './field.js';

import {
    constructApple,
    isCollidingWithApple
} from './apple.js';

// Snake's State
const snakeStartX = 0;
const snakeStartY = 0;
const snakeNormalColor = 'blue';
const snakeDeadColor = 'gray';

const snakeBody = [];
let snakeLength = 5;
let snakeHead = snakeLength - 1;
let snakeDX = 1;
let snakeDY = 0;
let snakeDead = false;
let snakeScore = 0;
let snakeSpeed = 55; // [1..60]
let snakeMoveRequest = 0;
let snakeMoveRequestDiv = Math.max(60 - snakeSpeed, 1);
let snakeColor = snakeNormalColor;
let snakeScoreFont = 'sans-serif';
let snakeScoreColor = 'white';

// Snake's Behaviour
export function constructSnake() {
    for (let i = 0; i < snakeLength; i++) {
        const nextSnakeSegment = {
            x: snakeStartX,
            y: snakeStartY,
        };
        snakeBody.push(nextSnakeSegment);
    }
}

export function turnSnakeUp() {
    if (snakeDY !== 1) {
        snakeDX = 0;
        snakeDY = -1;
    }
}

export function turnSnakeDown() {
    if (snakeDY !== -1) {
        snakeDX = 0;
        snakeDY = 1;
    }
}

export function turnSnakeLeft() {
    if (snakeDX !== 1) {
        snakeDX = -1;
        snakeDY = 0;
    }
}

export function turnSnakeRight() {
    if (snakeDX !== -1) {
        snakeDX = 1;
        snakeDY = 0;
    }
}

export function isCollidingWithSnake(x, y) {
    for (const segment of snakeBody) {
        if (segment.x === x && segment.y === y) {
            return true;
        } 
    }
    return false;
}

export function moveSnake() {
    if (snakeDead) { return; }
    if (snakeMoveRequest++ % snakeMoveRequestDiv !== 0) { return; }

    const headSegment = snakeBody[snakeHead];

    const nextX = headSegment.x + snakeDX;
    const nextY = headSegment.y + snakeDY;

    if (!areCoordsInsideField(nextX, nextY) ||
         isCollidingWithSnake(nextX, nextY)) {
        snakeDead = true;
        snakeColor = snakeDeadColor;
        return;
    }

    snakeHead = (snakeHead + 1) % snakeLength;
    const nextHeadSegment = snakeBody[snakeHead];

    if (isCollidingWithApple(nextX, nextY))  {
        snakeScore++;
        snakeLength++;
        const newHead = {
            x: nextX,
            y: nextY
        }
        snakeBody.splice(snakeHead, 0, newHead);

        constructApple();
    } else {
        nextHeadSegment.x = nextX;
        nextHeadSegment.y = nextY;
    }
}

export function drawSnake(ctx, w, h) {
    ctx.fillStyle = snakeColor;
    for (const segment of snakeBody) {
        const pixelX = centeringShiftX + segment.x * cellSize;
        const pixelY = centeringShiftY + segment.y * cellSize;

        ctx.beginPath();
        ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
        ctx.fill();
    }
}

export function drawSnakeScore(ctx, w, h) {
    ctx.fillStyle = snakeScoreColor;
    ctx.textAlign = 'center';
    ctx.font = `${cellSize * 3.4}px ${snakeScoreFont}`;
    ctx.fillText(snakeScore, w / 2, h * 0.085);
}
