import {
    fieldWidth,
    fieldHeight
} from './field.js';

const cellScale = 0.75;
export let cellSize;
let fieldPixelWidth;
let fieldPixelHeight;
export let centeringShiftX;
export let centeringShiftY;

export function recalcDrawingSizes(w, h) {
    cellSize = Math.min(w / fieldWidth, h / fieldHeight) * cellScale;
    fieldPixelWidth = cellSize * fieldWidth;
    fieldPixelHeight = cellSize * fieldHeight;
    centeringShiftX = (w - fieldPixelWidth) / 2;
    centeringShiftY = (h - fieldPixelHeight) / 2;
}
