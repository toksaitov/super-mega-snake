import Controller, { changeController } from './Controller.js';

import VictoryView from '../views/VictoryView.js';
import MenuController from './MenuController.js';

export default class VictoryController extends Controller {
  constructor(winnerName, winnerColor) {
    super();

    this._winnerName  = winnerName;
    this._winnerColor = winnerColor;

    this.keyMappings = { 'enter': this._goBackToMenu };
  }

  draw(ctx, w, h) {
    VictoryView.draw(ctx, w, h, this._winnerName, this._winnerColor);
  }

  click(x, y) {
    VictoryView.backToMenuButton.handleClick(x, y, this._goBackToMenu);
  }

  _goBackToMenu() {
    changeController(new MenuController());
  }
}
