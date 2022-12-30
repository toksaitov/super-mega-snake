import {
  cellSize,
  centeringShiftX,
  centeringShiftY,
  fillRect,
} from '../utilities/drawingHelpers.js';

export default class FieldView {
  static draw(ctx, field) {
    for (let y = 0; y < field.height; ++y) {
      for (let x = 0; x < field.width; ++x) {
        const pixelX = centeringShiftX + x * cellSize;
        const pixelY = centeringShiftY + y * cellSize;
        fillRect(ctx, pixelX, pixelY, cellSize - 1, cellSize - 1, field.color);
      }
    }
  }
}
