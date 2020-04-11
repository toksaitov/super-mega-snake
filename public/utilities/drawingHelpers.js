const cellScale = 0.75;
export let cellSize;
export let fieldPixelWidth;
export let fieldPixelHeight;
export let centeringShiftX;
export let centeringShiftY;

export function recalcDrawingSizes(width, height, field) {
    cellSize = Math.min(width / field.width, height / field.height * cellScale);
    fieldPixelWidth = cellSize * field.width;
    fieldPixelHeight = cellSize * field.height;
    centeringShiftX = (width - fieldPixelWidth) / 2;
    centeringShiftY = (height - fieldPixelHeight) / 2;
}

export function fillRect(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
}

export function drawImage(ctx, image, x, y, width, height) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(image, x, y, width, height);
}

export function fillText(ctx, text, x, y, color, font) {
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

export function clearScreen(ctx, width, height, color) {
    fillRect(ctx, 0, 0, width, height, color || 'black');
}