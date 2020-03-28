import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Apple {
    // Apple's Behaviour
    constructor(field, snakes) {
        // Apple's State
        this._color = 'red';

        const isCollidingWithSnakes = (x, y, snakes) => {
            for (const snake of snakes) {
                if (snake.isCollidingWith(x, y)) {
                    return true;
                }
            }
            return false;
        }
        do {
            this._x = Math.trunc(Math.random() * field.width);
            this._y = Math.trunc(Math.random() * field.height);
        } while (isCollidingWithSnakes(this._x, this._y, snakes));
    }

    isCollidingWith(x, y) {
        return x === this._x && y === this._y;
    }

    draw(ctx) {
        ctx.fillStyle = this._color;
        const pixelX = centeringShiftX + this._x * cellSize;
        const pixelY = centeringShiftY + this._y * cellSize;

        ctx.beginPath();
        ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
        ctx.fill();
    }
}