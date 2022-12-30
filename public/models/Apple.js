import { defaultAppleColor } from '../params.js';

export default class Apple {
  constructor(field, snakes, color = defaultAppleColor) {
    this._color = color;

    // eslint-disable-next-line no-shadow
    const isCollidingWithSnakes = (x, y, snakes) => {
      for (const snake of snakes) {
        if (snake.isCollidingWith(x, y)) {
          return true;
        }
      }
      return false;
    };
    const candidates = [];
    for (let y = 0; y < field.width; ++y) {
      for (let x = 0; x < field.height; ++x) {
        if (!isCollidingWithSnakes(x, y, snakes)) {
          candidates.push([x, y]);
        }
      }
    }
    if (candidates.length === 0) {
      throw new Error('There is no place on the game field to put an apple.');
    }
    const rndIdx = Math.trunc(Math.random() * candidates.length);
    [this._x, this._y] = candidates[rndIdx];
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get color() {
    return this._color;
  }

  isCollidingWith(x, y) {
    return x === this._x && y === this._y;
  }

  serialize() {
    return {
      'x': this._x,
      'y': this._y,
      'color': this._color,
    };
  }
}
