import {
    centeringShiftX,
    fieldPixelWidth,
    recalcDrawingSizes,
} from './drawingHelpers.js';

import Field from './field.js';
import Apple from './apple.js';
import Snake from './snake.js';

const field = new Field();
const snake1 = new Snake({
    'x': 0, 'y': 0,
    'dx': 1, 'dy': 0
});
const snake2 = new Snake({
    'x': field.width - 1,
    'y': field.height - 1,
    'dx': -1, 'dy': 0
});
const snakes = [snake1, snake2];
let apple = new Apple(field, snakes);

function setup(ctx, w, h) {
    window.requestAnimationFrame(() => draw(ctx, w, h));
}

function draw(ctx, w, h) {
    if (w != window.innerWidth || h != window.innerHeight) {
        w = canvas.width  = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    recalcDrawingSizes(w, h, field);

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fill();

    const onHaveEatenApple = () => {
        apple = new Apple(field, snakes);
    }
    snake1.move(field, apple, snakes, onHaveEatenApple);
    snake2.move(field, apple, snakes, onHaveEatenApple);

    field.draw(ctx);
    apple.draw(ctx);
    snake1.draw(ctx);
    snake2.draw(ctx);

    const topScoreMargin = h * 0.085;
    const leftScoreMargin = centeringShiftX + w * 0.01;
    const rightScoreMargin = centeringShiftX + fieldPixelWidth - w * 0.01;
    snake1.drawScore(ctx, leftScoreMargin, topScoreMargin);
    snake2.drawScore(ctx, rightScoreMargin, topScoreMargin);

    window.requestAnimationFrame(() => draw(ctx, w, h));
}

function keyDown(key) {
    switch (key) {
        case 'w':
        case 'W':
            snake1.turnUp();
            break;
        case 'a':
        case 'A':
            snake1.turnLeft();
            break;
        case 's':
        case 'S':
            snake1.turnDown();
            break;
        case 'd':
        case 'D':
            snake1.turnRight();
            break;
    }

    switch (key) {
        case 'ArrowUp':
            snake2.turnUp();
            break;
        case 'ArrowLeft':
            snake2.turnLeft();
            break;
        case 'ArrowDown':
            snake2.turnDown();
            break;
        case 'ArrowRight':
            snake2.turnRight();
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
