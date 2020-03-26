import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Field {
    // Field's Behaviour
    constructor() {
        // Field's State
        this.fieldWidth = 40;
        this.fieldHeight = 40;
        this.fieldColor = 'white';
    }
    
    areCoordsInsideField(x, y) {
        return x >= 0 && x < this.fieldWidth &&
               y >= 0 && y < this.fieldHeight;
    }

    drawField(ctx, w, h) {
        ctx.fillStyle = this.fieldColor;
        for (let y = 0; y < this.fieldHeight; ++y) {
            for (let x = 0; x < this.fieldWidth; ++x) {
                const pixelX = centeringShiftX + x * cellSize;
                const pixelY = centeringShiftY + y * cellSize;

                ctx.beginPath();
                ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
                ctx.fill();
            }
        }
    }
}
