import {
  defaultSnake1Name,
  defaultSnake2Name,
  defaultSnake3Name,
  defaultSnake4Name,
  defaultSnake1Color,
  defaultSnake2Color,
  defaultSnake3Color,
  defaultSnake4Color,
  ticksToRemoveDeadSnakes,
} from '../params.js';

import Snake from './Snake.js';

export default class Snakes {
  constructor(field) {
    this._snakes = {};

    const [w, h] = [field.width, field.height];
    this._spawnPoints = [
      { 'id': 0, 'x': 0,     'y': 0,     'dx':  1, 'dy': 0 },
      { 'id': 1, 'x': w - 1, 'y': 0,     'dx': -1, 'dy': 0 },
      { 'id': 2, 'x': w - 1, 'y': h - 1, 'dx': -1, 'dy': 0 },
      { 'id': 3, 'x': 0,     'y': h - 1, 'dx':  1, 'dy': 0 },
    ];
    this._spawnPoints[0].name  = defaultSnake1Name;
    this._spawnPoints[0].color = defaultSnake1Color;
    this._spawnPoints[1].name  = defaultSnake2Name;
    this._spawnPoints[1].color = defaultSnake2Color;
    this._spawnPoints[2].name  = defaultSnake3Name;
    this._spawnPoints[2].color = defaultSnake3Color;
    this._spawnPoints[3].name  = defaultSnake4Name;
    this._spawnPoints[3].color = defaultSnake4Color;

    this._field = field;
  }

  get snakeList() {
    return Object.values(this._snakes);
  }

  spawnSnake(id) {
    const spawnPoint = this._spawnPoints.shift();
    if (!spawnPoint)  {
      return null;
    }

    return this._snakes[id] = new Snake(spawnPoint, () => {
      this._spawnPoints.push(spawnPoint);
      this._spawnPoints.sort((a, b) => a.id - b.id);
    });
  }

  move(apple, onHaveEatenApple) {
    this._removeLongDeadSnakes();

    for (const snake of this.snakeList) {
      snake.move(this._field, apple, this.snakeList, onHaveEatenApple);
    }
  }

  serialize() {
    const serializedSnakes = {};
    for (const [id, snake] of Object.entries(this._snakes)) {
      serializedSnakes[id] = snake.serialize();
    }

    return serializedSnakes;
  }

  _removeLongDeadSnakes() {
    for (const [id, snake] of Object.entries(this._snakes)) {
      if (snake.dead && snake.deadFor >= ticksToRemoveDeadSnakes) {
        delete this._snakes[id];
      }
    }
  }
}
