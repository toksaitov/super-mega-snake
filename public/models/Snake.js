import {
  defaultSnakeName,
  defaultSnakeX,
  defaultSnakeY,
  defaultSnakeDX,
  defaultSnakeDY,
  defaultSnakeSpeed,
  defaultSnakeColor,
  defaultDeadSnakeColor,
  defaultInitSnakeLength,
} from '../params.js';

export default class Snake {
  constructor(params, onDeadCallback) {
    this._name = params.name || defaultSnakeName;
    this._head = 0;
    this._dx = params.dx || defaultSnakeDX;
    this._dy = params.dy || defaultSnakeDY;
    this._prevDX = this._dx;
    this._prevDY = this._dy;
    this._dead = false;
    this._deadFor = 0;
    this._score = 0;
    this._moveRequest = 0;
    const speed = params.speed || defaultSnakeSpeed;
    this._moveRequestDiv = Math.max(60 - speed, 1);
    this._normalColor = params.color || defaultSnakeColor;
    this._deadColor = defaultDeadSnakeColor;
    this._color = this._normalColor;

    const initialLength = params.initialLength || defaultInitSnakeLength;
    this._body = [];
    for (let i = 0; i < initialLength; ++i) {
      this._body.push({
        'x': params.x || defaultSnakeX,
        'y': params.y || defaultSnakeY,
      });
    }

    this._onDeadCallback = onDeadCallback;
  }

  get name() {
    return this._name;
  }

  get head() {
    return this._head;
  }

  get dx() {
    return this._dx;
  }

  get dy() {
    return this._dy;
  }

  get prevDX() {
    return this._prevDX;
  }

  get prevDY() {
    return this._prevDY;
  }

  get body() {
    return this._body;
  }

  get color() {
    return this._normalColor;
  }

  get score() {
    return this._score;
  }

  get dead() {
    return this._dead;
  }

  set dead(value) {
    if (this._dead !== value) {
      this._dead = value;
      if (this._dead) {
        this._color = this._deadColor;
        this._deadFor = 1;
        if (this._onDeadCallback) {
          this._onDeadCallback();
        }
      } else {
        this._color = this._normalColor;
      }
    }
  }

  get deadFor() {
    return this._deadFor;
  }

  turnUp() {
    if (this._dy !== 1) {
      this._dx = 0;
      this._dy = -1;
    }
  }

  turnDown() {
    if (this._dy !== -1) {
      this._dx = 0;
      this._dy = 1;
    }
  }

  turnLeft() {
    if (this._dx !== 1) {
      this._dx = -1;
      this._dy = 0;
    }
  }

  turnRight() {
    if (this._dx !== -1) {
      this._dx = 1;
      this._dy = 0;
    }
  }

  isCollidingWith(x, y) {
    for (const segment of this._body) {
      if (segment.x === x && segment.y === y) {
        return true;
      }
    }
    return false;
  }

  move(field, apple, snakes, onHaveEatenApple) {
    if (this._dead) {
      ++this._deadFor;
      return;
    }
    if (this._moveRequest++ % this._moveRequestDiv !== 0) { return; }

    const otherSnake = this._isCollidingWithSnakes(snakes);
    if (otherSnake) {
      this.dead = true; otherSnake.dead = true;
      return;
    }

    const headSegment = this._body[this._head];
    const nextX = headSegment.x + this._dx;
    const nextY = headSegment.y + this._dy;
    if (!field.areCoordsInside(nextX, nextY) || this.isCollidingWith(nextX, nextY)) {
      this.dead = true;
      return;
    }

    this._head = (this._head + 1) % this._body.length;
    const nextHeadSegment = this._body[this._head];
    if (apple.isCollidingWith(nextX, nextY))  {
      ++this._score;
      this._body.splice(this._head, 0, {
        'x': nextX,
        'y': nextY,
      });
      onHaveEatenApple();
    } else {
      nextHeadSegment.x = nextX;
      nextHeadSegment.y = nextY;
    }

    this._prevDX = this._dx;
    this._prevDY = this._dy;
  }

  serialize() {
    return {
      'name': this._name,
      'head': this._head,
      'dx': this._dx,
      'dy': this._dy,
      'prevDX': this._prevDX,
      'prevDY': this._prevDY,
      'dead':   this._dead,
      'score':  this._score,
      'color':  this._color,
      'body':   this._body,
    };
  }

  _isCollidingWithSnakes(snakes) {
    const headSegment = this._body[this._head];
    const x = headSegment.x;
    const y = headSegment.y;
    for (const snake of snakes) {
      if (snake !== this) {
        if (!snake.dead && snake.isCollidingWith(x, y)) {
          return snake;
        }
      }
    }
    return null;
  }
}
