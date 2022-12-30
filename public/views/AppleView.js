import {
  cellSize,
  centeringShiftX,
  centeringShiftY,
  fillRect,
} from '../utilities/drawingHelpers.js';

export default class AppleView {
  static draw(ctx, apple) {
    const pixelX = centeringShiftX + apple.x * cellSize;
    const pixelY = centeringShiftY + apple.y * cellSize;
    fillRect(ctx, pixelX, pixelY, cellSize - 1, cellSize - 1, apple.color);
  }
}
