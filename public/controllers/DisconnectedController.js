import Controller, { changeController } from './Controller.js';

import DisconnectedView from '../views/DisconnectedView.js';
import MenuController from './MenuController.js';

export default class DisconnectedController extends Controller {
  constructor(reason) {
    super();

    this._reason = reason;

    this.keyMappings = { 'enter': this._goBackToMenu };
  }

  draw(ctx, w, h) {
    DisconnectedView.draw(ctx, w, h, this._reason);
  }

  click(x, y) {
    DisconnectedView.backToMenuButton.handleClick(x, y, this._goBackToMenu);
  }

  _goBackToMenu() {
    changeController(new MenuController());
  }
}
