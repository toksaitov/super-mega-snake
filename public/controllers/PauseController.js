import Controller, { changeController } from './Controller.js';

import PauseView from '../views/PauseView.js';

export default class PauseController extends Controller {
  constructor(previousController) {
    super();

    this._previousController = previousController;

    this.keyMappings = { 'escape': this._goBackToGame.bind(this) };
  }

  draw(ctx, w, h) {
    const shouldSimulate = false;
    this._previousController.draw(ctx, w, h, shouldSimulate);

    PauseView.draw(ctx, w, h);
  }

  click(x, y) {
    PauseView.backToGameButton.handleClick(x, y, this._goBackToGame.bind(this));
  }

  _goBackToGame() {
    changeController(this._previousController);
  }
}
