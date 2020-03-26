import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Field {
    // Field's Behaviour
    constructor() {
        // Field's State
        this.width = 40;
        this.height = 40;
        this.color = 'white';
    }

    areCoordsInside(x, y) {
        return x >= 0 && x < this.width &&
               y >= 0 && y < this.height;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                const pixelX = centeringShiftX + x * cellSize;
                const pixelY = centeringShiftY + y * cellSize;

                ctx.beginPath();
                ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
                ctx.fill();
            }
        }
    }
}
