import {
  recalcDrawingSizes,
  clearScreen,
  centeringShiftX,
  fieldPixelWidth,
} from '../utilities/drawingHelpers.js';

import {
  scoreMarginFromHeightRatio,
  scoreLeftMarginFromWidthRatio,
  scoreRightMarginFromWidthRatio,
} from '../params.js';

import FieldView from './FieldView.js';
import AppleView from './AppleView.js';
import SnakeView from './SnakeView.js';

export default class LocalMultiPlayerGameView {
  static draw(ctx, w, h, field, apple, snakes) {
    recalcDrawingSizes(w, h, field);
    clearScreen(ctx, w, h);

    FieldView.draw(ctx, field);
    AppleView.draw(ctx, apple);
    for (const snake of snakes) {
      SnakeView.draw(ctx, snake);
    }

    const topScoreMargin = h * scoreMarginFromHeightRatio;
    const leftScoreMargin = centeringShiftX + w * scoreLeftMarginFromWidthRatio;
    const rightScoreMargin = centeringShiftX + fieldPixelWidth - w * scoreRightMarginFromWidthRatio;
    SnakeView.drawScore(ctx, leftScoreMargin, topScoreMargin, snakes[0]);
    SnakeView.drawScore(ctx, rightScoreMargin, topScoreMargin, snakes[1]);
  }
}
