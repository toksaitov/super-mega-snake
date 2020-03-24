import {
    recalcDrawingSizes
} from './drawingHelpers.js';

import {
    drawField
} from './field.js';

import {
    constructApple,
    drawApple
} from './apple.js';

import {
    constructSnake,
    turnSnakeUp,
    turnSnakeDown,
    turnSnakeLeft,
    turnSnakeRight,
    moveSnake,
    drawSnake,
    drawSnakeScore
} from './snake.js'

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const w = canvas.width  = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    setup(canvas.getContext('2d'), w, h);
    document.addEventListener('keydown', e => keyDown(e.key))
});

function setup(ctx, w, h) {
    constructSnake();
    constructApple();

    window.requestAnimationFrame(timestamp => draw(ctx, w, h, timestamp));
}

function draw(ctx, w, h, timestamp) {
    if (w != window.innerWidth || h != window.innerHeight) {
        w = canvas.width  = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fill();

    recalcDrawingSizes(w, h);
    drawField(ctx, w, h);
    drawApple(ctx, w, h);
    drawSnake(ctx, w, h);
    drawSnakeScore(ctx, w, h);

    moveSnake();

    window.requestAnimationFrame(timestamp => draw(ctx, w, h, timestamp));
}

function keyDown(key) {
    switch (key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            turnSnakeUp();
            break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
            turnSnakeLeft();
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            turnSnakeDown();
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            turnSnakeRight();
            break;
    }
}