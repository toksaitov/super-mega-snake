import {
  recalcDrawingSizes,
  clearScreen,
  fillText,
  scaledFont,
} from '../utilities/drawingHelpers.js';

import {
  pauseScreenOpacity,
  pauseMsgVerticalShift,
  pauseMsgFontName,
  pauseMsgFontScale,
  pauseMsgColor,
  menuBtnsVerticalShift,
  backToGameBtnFontName,
  backToGameBtnFontScale,
  backToGameBtnColor,
} from '../params.js';

import {
  pauseMsgText,
  backToGameBtnText,
} from '../strings.js';

import Button from '../models/Button.js';
import ButtonView from './ButtonView.js';

export default class PauseView {
  static backToGameButton =
    new Button(
      backToGameBtnText,
      backToGameBtnFontName,
      backToGameBtnFontScale,
      backToGameBtnColor,
    );

  static draw(ctx, w, h) {
    recalcDrawingSizes(w, h);
    clearScreen(ctx, w, h, `rgba(0, 0, 0, ${pauseScreenOpacity})`);

    const [cx, cy] = [w * 0.5, h * 0.5 + pauseMsgVerticalShift];
    const pauseMsgFont = scaledFont(pauseMsgFontName, pauseMsgFontScale);
    fillText(ctx, pauseMsgText, cx, cy, pauseMsgColor, pauseMsgFont);

    this.backToGameButton.fontScale = backToGameBtnFontScale;
    this.backToGameButton.x = cx;
    this.backToGameButton.y = cy + menuBtnsVerticalShift;
    ButtonView.draw(ctx, this.backToGameButton);
  }
}
