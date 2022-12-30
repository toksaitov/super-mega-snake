import Controller, { changeController } from './Controller.js';

import PauseController   from './PauseController.js';
import VictoryController from './VictoryController.js';
import DefeatController  from './DefeatController.js';

import Field from '../models/Field.js';
import Snake from '../models/Snake.js';
import Apple from '../models/Apple.js';

import { playSound } from '../utilities/audioHelpers.js';
import LocalMultiPlayerGameView from '../views/LocalMultiPlayerGameView.js';

export default class LocalMultiPlayerGameController extends Controller {
  constructor() {
    super();

    this._field = new Field();
    this._snake1 = new Snake({
      'name': 'Red snake',
      'x':  0, 'y':  0,
      'dx': 1, 'dy': 0,
      'color': 'red',
    });
    this._snake2 = new Snake({
      'name': 'Blue snake',
      'x': this._field.width - 1,
      'y': this._field.height - 1,
      'dx': -1, 'dy': 0,
      'color': 'blue',
    });
    this._snakes = [this._snake1, this._snake2];
    this._apple = new Apple(this._field, this._snakes);

    this.keyMappings = {
      'w': () => this._snake1.turnUp(),
      'a': () => this._snake1.turnLeft(),
      's': () => this._snake1.turnDown(),
      'd': () => this._snake1.turnRight(),
      'arrowup':    () => this._snake2.turnUp(),
      'arrowleft':  () => this._snake2.turnLeft(),
      'arrowdown':  () => this._snake2.turnDown(),
      'arrowright': () => this._snake2.turnRight(),
      'escape': () => changeController(new PauseController(this)),
    };
  }

  draw(ctx, w, h, shouldSimulate) {
    if (shouldSimulate) {
      for (const snake of this._snakes) {
        snake.move(this._field, this._apple, this._snakes, () => {
          this._apple = new Apple(this._field, this._snakes);
          playSound('pickupAppleSound');
        });
      }

      const snakesAlive = this._snakes.filter(snake => !snake.dead);
      if (snakesAlive.length === 1) {
        const winnerName = snakesAlive[0].name;
        const winnerColor = snakesAlive[0].color;
        changeController(new VictoryController(winnerName, winnerColor));
      } else if (snakesAlive.length < 1) {
        changeController(new DefeatController());
      }
    }

    LocalMultiPlayerGameView.draw(ctx, w, h, this._field, this._apple, this._snakes);
  }
}
