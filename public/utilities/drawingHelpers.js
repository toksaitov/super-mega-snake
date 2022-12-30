import {
  cellScale,
  textSizingDivider,
} from '../params.js';

/* eslint-disable import/no-mutable-exports */
export let cellSize;
export let fieldPixelWidth;
export let fieldPixelHeight;
export let centeringShiftX;
export let centeringShiftY;
export let textSizingUnit = 1;

export function recalcDrawingSizes(w, h, field) {
  if (field) {
    cellSize = Math.min(w / field.width, h / field.height) * cellScale;
    fieldPixelWidth = cellSize * field.width;
    fieldPixelHeight = cellSize * field.height;
    centeringShiftX = (w - fieldPixelWidth) * 0.5;
    centeringShiftY = (h - fieldPixelHeight) * 0.5;
  }
  textSizingUnit = w / textSizingDivider;
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

export function scaledFontSize(fontScale) {
  return Math.trunc(textSizingUnit * fontScale);
}

export function scaledFont(fontName, fontScale) {
  const fontSize = Math.trunc(textSizingUnit * fontScale);
  return `${fontSize}px '${fontName}'`;
}

export function measureText(ctx, text, font) {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
  }
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const width  = metrics.actualBoundingBoxLeft   + metrics.actualBoundingBoxRight;
  const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  return [width, height];
}
