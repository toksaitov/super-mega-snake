const cellScale = 0.75;
export let cellSize;
export let fieldPixelWidth;
export let fieldPixelHeight;
export let centeringShiftX;
export let centeringShiftY;

export function recalcDrawingSizes(w, h, field) {
    cellSize = Math.min(w / field.width, h / field.height * cellScale);
    fieldPixelWidth = cellSize * field.width;
    fieldPixelHeight = cellSize * field.height;
    centeringShiftX = (w - fieldPixelWidth) / 2;
    centeringShiftY = (h - fieldPixelHeight) / 2;
}
