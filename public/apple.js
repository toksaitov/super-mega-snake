import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Apple {
    // Apple's Behaviour
    constructor(field, snakes) {
        // Apple's State
        this.color = 'red';

        const isCollidingWithSnakes = (x, y, snakes) => {
            for (const snake of snakes) {
                if (snake.isCollidingWith(x, y)) {
                    return true;
                }
            }
            return false;
        }
        do {
            this.x = Math.trunc(Math.random() * field.width);
            this.y = Math.trunc(Math.random() * field.height);
        } while (isCollidingWithSnakes(this.x, this.y, snakes));
    }

    isCollidingWith(x, y) {
        return x === this.x && y === this.y;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        const pixelX = centeringShiftX + this.x * cellSize;
        const pixelY = centeringShiftY + this.y * cellSize;

        ctx.beginPath();
        ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
        ctx.fill();
    }
}