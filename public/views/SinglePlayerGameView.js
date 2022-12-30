import {
  recalcDrawingSizes,
  clearScreen,
} from '../utilities/drawingHelpers.js';

import { scoreMarginFromHeightRatio } from '../params.js';

import FieldView from './FieldView.js';
import AppleView from './AppleView.js';
import SnakeView from './SnakeView.js';

export default class SinglePlayerGameView {
  static draw(ctx, w, h, field, apple, snake) {
    recalcDrawingSizes(w, h, field);
    clearScreen(ctx, w, h);

    FieldView.draw(ctx, field);
    AppleView.draw(ctx, apple);
    SnakeView.draw(ctx, snake);

    const topScoreMargin = h * scoreMarginFromHeightRatio;
    SnakeView.drawScore(ctx, w * 0.5, topScoreMargin, snake);
  }
}
