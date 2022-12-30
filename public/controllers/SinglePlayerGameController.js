import Controller, { changeController } from './Controller.js';

import PauseController  from './PauseController.js';
import DefeatController from './DefeatController.js';

import Field from '../models/Field.js';
import Snake from '../models/Snake.js';
import Apple from '../models/Apple.js';

import { playSound } from '../utilities/audioHelpers.js';
import SinglePlayerGameView from '../views/SinglePlayerGameView.js';

export default class SinglePlayerGameController extends Controller {
  constructor() {
    super();

    this._field = new Field();
    this._snake = new Snake({
      'x':  0, 'y':  0,
      'dx': 1, 'dy': 0,
    });
    this._snakes = [this._snake];
    this._apple = new Apple(this._field, this._snakes);

    this.keyMappings = {
      'w': () => this._snake.turnUp(),
      'a': () => this._snake.turnLeft(),
      's': () => this._snake.turnDown(),
      'd': () => this._snake.turnRight(),
      'arrowup':    () => this._snake.turnUp(),
      'arrowleft':  () => this._snake.turnLeft(),
      'arrowdown':  () => this._snake.turnDown(),
      'arrowright': () => this._snake.turnRight(),
      'escape': () => changeController(new PauseController(this)),
    };
  }

  draw(ctx, w, h, shouldSimulate) {
    if (shouldSimulate) {
      this._snake.move(this._field, this._apple, this._snakes, () => {
        this._apple = new Apple(this._field, this._snakes);
        playSound('pickupAppleSound');
      });

      if (this._snake.dead) {
        changeController(new DefeatController());
      }
    }

    SinglePlayerGameView.draw(ctx, w, h, this._field, this._apple, this._snake);
  }
}
