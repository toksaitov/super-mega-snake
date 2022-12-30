import Controller, { changeController } from './Controller.js';

import DefeatController  from './DefeatController.js';
import DisconnectedController from './DisconnectedController.js';

import { playSound } from '../utilities/audioHelpers.js';

import {
  disconFullRoomReasonText,
  disconConnErrReasonText,
} from '../strings.js';

import NetworkMultiPlayerGameView from '../views/NetworkMultiplayerGameView.js';

export default class NetworkMultiPlayerGameController extends Controller {
  constructor() {
    super();

    this._field  = {};
    this._snakes = {};
    this._snakePrevLength = undefined;
    this._snakeSpawned = false;
    this._apple  = {};

    this._socket = window.io();
    this._socket.on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        reason = disconFullRoomReasonText;
      } else {
        reason = disconConnErrReasonText;
      }
      changeController(new DisconnectedController(reason));
    });
    this._socket.on('update', data => {
      if (data[0]) this._field  = data[0];
      if (data[1]) this._apple  = data[1];
      if (data[2]) this._snakes = data[2];
    });
    this.keyMappings = {
      'w': () => this._socket.emit('command', 'w'),
      'a': () => this._socket.emit('command', 'a'),
      's': () => this._socket.emit('command', 's'),
      'd': () => this._socket.emit('command', 'd'),
    };
    this._socket.emit('spawn');
  }

  draw(ctx, w, h, shouldSimulate) {
    const snake = this._snake;
    if (snake || this._snakeSpawned) {
      if (shouldSimulate) {
        if ((this._snakeSpawned && !snake) || snake.dead) {
          changeController(new DefeatController());
          return;
        }
        this._snakeSpawned = true;

        const currentSnakeLength = snake.body.length;
        if (this._snakePrevLength && this._snakePrevLength !== currentSnakeLength) {
          playSound('pickupAppleSound');
        }
        this._snakePrevLength = currentSnakeLength;
      }
    }

    NetworkMultiPlayerGameView.draw(ctx, w, h, this._field, this._apple, snake, this._snakes);
  }

  get _snake() {
    const { id } = this._socket;
    if (id) {
      return this._snakes[id];
    }

    return null;
  }
}
