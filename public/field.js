import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Field {
    // Field's Behaviour
    constructor() {
        // Field's State
        this._width = 40;
        this._height = 40;
        this._color = 'white';
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    areCoordsInside(x, y) {
        return x >= 0 && x < this._width &&
               y >= 0 && y < this._height;
    }

    draw(ctx) {
        ctx.fillStyle = this._color;
        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                const pixelX = centeringShiftX + x * cellSize;
                const pixelY = centeringShiftY + y * cellSize;

                ctx.beginPath();
                ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
                ctx.fill();
            }
        }
    }
}
