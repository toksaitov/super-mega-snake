import {
  recalcDrawingSizes,
  clearScreen,
  fillText,
  scaledFont,
} from '../utilities/drawingHelpers.js';

import {
  victoryMsgVerticalShift,
  victoryMsgFontName,
  victoryMsgFontScale,
  menuBtnsVerticalShift,
  backToMenuBtnFontName,
  backToMenuBtnFontScale,
  backToMenuBtnColor,
} from '../params.js';

import {
  victoryMsgTemplate,
  backToMenuBtnText,
} from '../strings.js';

import Button from '../models/Button.js';
import ButtonView from './ButtonView.js';

export default class VictoryView {
  static backToMenuButton =
    new Button(
      backToMenuBtnText,
      backToMenuBtnFontName,
      backToMenuBtnFontScale,
      backToMenuBtnColor,
    );

  static draw(ctx, w, h, winnerName, winnerColor) {
    recalcDrawingSizes(w, h);
    clearScreen(ctx, w, h);

    const [cx, cy] = [w * 0.5, h * 0.5 + victoryMsgVerticalShift];
    const victoryMsgFont = scaledFont(victoryMsgFontName, victoryMsgFontScale);
    const victoryMsgText = victoryMsgTemplate.replace('%s', winnerName);
    fillText(ctx, victoryMsgText, cx, cy, winnerColor, victoryMsgFont);

    this.backToMenuButton.fontScale = backToMenuBtnFontScale;
    this.backToMenuButton.x = cx;
    this.backToMenuButton.y = cy + menuBtnsVerticalShift;
    ButtonView.draw(ctx, this.backToMenuButton);
  }
}
