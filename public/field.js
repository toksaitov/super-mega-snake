import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

// Field's State
export const fieldWidth = 40;
export const fieldHeight = 40;
const fieldColor = 'white';

// Field's Behaviour
export function areCoordsInsideField(x, y) {
    return x >= 0 && x < fieldWidth &&
           y >= 0 && y < fieldHeight;
}

export function drawField(ctx, w, h) {
    ctx.fillStyle = fieldColor;
    for (let y = 0; y < fieldHeight; ++y) {
        for (let x = 0; x < fieldWidth; ++x) {
            const pixelX = centeringShiftX + x * cellSize;
            const pixelY = centeringShiftY + y * cellSize;

            ctx.beginPath();
            ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
            ctx.fill();
        }
    }
}
