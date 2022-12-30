import {
  cellSize,
  centeringShiftX,
  centeringShiftY,
  fillRect,
  fillText,
  scaledFont,
} from '../utilities/drawingHelpers.js';

import {
  scoreFontName,
  scoreFontScale,
  scoreColor,
} from '../params.js';

export default class SnakeView {
  static draw(ctx, snake) {
    for (const segment of snake.body) {
      const pixelX = centeringShiftX + segment.x * cellSize;
      const pixelY = centeringShiftY + segment.y * cellSize;
      fillRect(ctx, pixelX, pixelY, cellSize - 1, cellSize - 1, snake.color);
    }
  }

  static drawScore(ctx, x, y, snake) {
    const scoreFont = scaledFont(scoreFontName, scoreFontScale);
    fillText(ctx, snake.score, x, y, scoreColor, scoreFont);
  }
}
