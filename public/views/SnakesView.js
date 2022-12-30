import SnakeView from './SnakeView.js';

export default class SnakesView {
  static draw(ctx, snakes) {
    for (const snake of Object.values(snakes)) {
      if (snake.dead) {
        SnakeView.draw(ctx, snake);
      }
    }

    // Draw alive snakes on top of dead ones.
    for (const snake of Object.values(snakes)) {
      if (!snake.dead) {
        SnakeView.draw(ctx, snake);
      }
    }
  }
}
