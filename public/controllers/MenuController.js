import Controller, { changeController } from './Controller.js';

import SinglePlayerGameController from './SinglePlayerGameController.js';
import LocalMultiPlayerGameController from './LocalMultiPlayerGameController.js';
import NetworkMultiPlayerGameController from './NetworkMultiPlayerController.js';

import MenuView from '../views/MenuView.js';

export default class MenuController extends Controller {
  constructor() {
    super();

    this.keyMappings = {
      '1': this._startSinglePlayerGame,
      '2': this._startLocalMultiPlayerGame,
      '3': this._startNetworkMultiPlayerGame,
    };
  }

  draw(ctx, w, h) {
    MenuView.draw(ctx, w, h);
  }

  click(x, y) {
    MenuView.menuButton1.handleClick(x, y, this._startSinglePlayerGame);
    MenuView.menuButton2.handleClick(x, y, this._startLocalMultiPlayerGame);
    MenuView.menuButton3.handleClick(x, y, this._startNetworkMultiPlayerGame);
  }

  _startSinglePlayerGame() {
    changeController(new SinglePlayerGameController());
  }

  _startLocalMultiPlayerGame() {
    changeController(new LocalMultiPlayerGameController());
  }

  _startNetworkMultiPlayerGame() {
    changeController(new NetworkMultiPlayerGameController());
  }
}
