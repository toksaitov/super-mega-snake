import {
  recalcDrawingSizes,
  clearScreen,
  fillText,
  scaledFont,
} from '../utilities/drawingHelpers.js';

import {
  defeatMsgVerticalShift,
  defeatMsgFontName,
  defeatMsgFontScale,
  defeatMsgColor,
  menuBtnsVerticalShift,
  backToMenuBtnFontName,
  backToMenuBtnFontScale,
  backToMenuBtnColor,
} from '../params.js';

import {
  defeatMsgText,
  backToMenuBtnText,
} from '../strings.js';

import Button from '../models/Button.js';
import ButtonView from './ButtonView.js';

export default class DefeatView {
  static backToMenuButton =
    new Button(
      backToMenuBtnText,
      backToMenuBtnFontName,
      backToMenuBtnFontScale,
      backToMenuBtnColor,
    );

  static draw(ctx, w, h) {
    recalcDrawingSizes(w, h);
    clearScreen(ctx, w, h);

    const [cx, cy] = [w * 0.5, h * 0.5 + defeatMsgVerticalShift];
    const defeatMsgFont = scaledFont(defeatMsgFontName, defeatMsgFontScale);
    fillText(ctx, defeatMsgText, cx, cy, defeatMsgColor, defeatMsgFont);

    this.backToMenuButton.fontScale = backToMenuBtnFontScale;
    this.backToMenuButton.x = cx;
    this.backToMenuButton.y = cy + menuBtnsVerticalShift;
    ButtonView.draw(ctx, this.backToMenuButton);
  }
}
