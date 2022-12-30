import Controller, { changeController } from './Controller.js';

import DefeatView from '../views/DefeatView.js';
import MenuController from './MenuController.js';

export default class DefeatController extends Controller {
  constructor() {
    super();

    this.keyMappings = { 'enter': this._goBackToMenu };
  }

  draw(ctx, w, h) {
    DefeatView.draw(ctx, w, h);
  }

  click(x, y) {
    DefeatView.backToMenuButton.handleClick(x, y, this._goBackToMenu);
  }

  _goBackToMenu() {
    changeController(new MenuController());
  }
}
