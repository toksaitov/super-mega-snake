import {
  recalcDrawingSizes,
  clearScreen,
} from '../utilities/drawingHelpers.js';

import {
  scoreMarginFromHeightRatio,
} from '../params.js';

import FieldView  from './FieldView.js';
import AppleView  from './AppleView.js';
import SnakeView  from './SnakeView.js';
import SnakesView from './SnakesView.js';

export default class NetworkMultiPlayerGameView {
  static draw(ctx, w, h, field, apple, snake, snakes) {
    recalcDrawingSizes(w, h, field);
    clearScreen(ctx, w, h);

    if (field) {
      FieldView.draw(ctx, field);
    }
    if (apple) {
      AppleView.draw(ctx, apple);
    }
    if (snakes) {
      SnakesView.draw(ctx, snakes);
    }

    if (snake) {
      const topScoreMargin = h * scoreMarginFromHeightRatio;
      SnakeView.drawScore(ctx, w * 0.5, topScoreMargin, snake);
    }
  }
}
