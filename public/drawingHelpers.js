const cellScale = 0.75;
export let cellSize;
let fieldPixelWidth;
let fieldPixelHeight;
export let centeringShiftX;
export let centeringShiftY;

export function recalcDrawingSizes(w, h, field) {
    cellSize = Math.min(w / field.fieldWidth, h / field.fieldHeight) * cellScale;
    fieldPixelWidth = cellSize * field.fieldWidth;
    fieldPixelHeight = cellSize * field.fieldHeight;
    centeringShiftX = (w - fieldPixelWidth) / 2;
    centeringShiftY = (h - fieldPixelHeight) / 2;
}
