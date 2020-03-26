import {
    recalcDrawingSizes
} from './drawingHelpers.js';

import Field from './field.js';
import Apple from './apple.js';
import Snake from './snake.js';

const field = new Field();
const snake1 = new Snake();
const snake2 = new Snake();
let apple = new Apple(field, [snake1, snake2]);

function setup(ctx, w, h) {
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

    recalcDrawingSizes(w, h, field);

    snake1.moveSnake(field, apple, () => {
        apple = new Apple(field, [snake1, snake2]);
    });
    snake2.moveSnake(field, apple, () => {
        apple = new Apple(field, [snake1, snake2]);
    });

    field.drawField(ctx, w, h);
    apple.drawApple(ctx, w, h);
    snake1.drawSnake(ctx, w, h);
    snake2.drawSnake(ctx, w, h);
    //snake.drawSnakeScore(ctx, w, h);

    window.requestAnimationFrame(timestamp => draw(ctx, w, h, timestamp));
}

function keyDown(key) {
    switch (key) {
        case 'w':
        case 'W':
            snake1.turnSnakeUp();
            break;
        case 'a':
        case 'A':
            snake1.turnSnakeLeft();
            break;
        case 's':
        case 'S':
            snake1.turnSnakeDown();
            break;
        case 'd':
        case 'D':
            snake1.turnSnakeRight();
            break;
        case 'ArrowUp':
            snake2.turnSnakeUp();
            break;
        case 'ArrowLeft':
            snake2.turnSnakeLeft();
            break;
        case 'ArrowDown':
            snake2.turnSnakeDown();
            break;
        case 'ArrowRight':
            snake2.turnSnakeRight();
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const w = canvas.width  = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    setup(canvas.getContext('2d'), w, h);
    document.addEventListener('keydown', e => keyDown(e.key))
});
