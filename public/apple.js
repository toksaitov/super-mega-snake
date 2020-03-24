import {
    fieldWidth,
    fieldHeight
} from './field.js';

import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

import {
    isCollidingWithSnake
} from './snake.js';

// Apple's Variables
let appleX;
let appleY;
const appleColor = 'red';

// Apple's Behaviour
export function constructApple(snake) {
    do {
        appleX = Math.trunc(Math.random() * fieldWidth);
        appleY = Math.trunc(Math.random() * fieldHeight);
    } while (isCollidingWithSnake(appleX, appleY));
}

export function isCollidingWithApple(x, y) {
    return x === appleX && y === appleY;
}

export function drawApple(ctx, w, h) {
    ctx.fillStyle = appleColor;
    const pixelX = centeringShiftX + appleX * cellSize;
    const pixelY = centeringShiftY + appleY * cellSize;

    ctx.beginPath();
    ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
    ctx.fill();
}
