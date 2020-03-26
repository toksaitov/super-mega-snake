import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Apple {
    // Apple's Behaviour
    constructor(field, snakes) {
        // Apple's State
        this.appleColor = 'red';

        //do {
            this.appleX = Math.trunc(Math.random() * field.fieldWidth);
            this.appleY = Math.trunc(Math.random() * field.fieldHeight);
        //} while (snake.isCollidingWithSnake(this.appleX, this.appleY));
    }

    isCollidingWithApple(x, y) {
        return x === this.appleX && y === this.appleY;
    }

    drawApple(ctx, w, h) {
        ctx.fillStyle = this.appleColor;
        const pixelX = centeringShiftX + this.appleX * cellSize;
        const pixelY = centeringShiftY + this.appleY * cellSize;

        ctx.beginPath();
        ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
        ctx.fill();
    }
}