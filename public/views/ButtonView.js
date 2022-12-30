import { fillText } from '../utilities/drawingHelpers.js';

export default class ButtonView {
  static draw(ctx, button) {
    fillText(ctx, button.text, button.x, button.y, button.color, button.font);
  }
}
