import {
  recalcDrawingSizes,
  clearScreen,
  fillText,
  scaledFont,
} from '../utilities/drawingHelpers.js';

import {
  disconMsgVerticalShift,
  disconMsgFontName,
  disconMsgFontScale,
  disconMsgColor,
  disconReasonVerticalShift,
  disconReasonFontName,
  disconReasonFontScale,
  disconReasonColor,
  menuBtnsVerticalShift,
  backToMenuBtnFontName,
  backToMenuBtnFontScale,
  backToMenuBtnColor,
} from '../params.js';

import {
  disconMsgText,
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

  static draw(ctx, w, h, reason) {
    recalcDrawingSizes(w, h);
    clearScreen(ctx, w, h);

    const cx = w * 0.5;
    let cy = h * 0.5 + disconMsgVerticalShift;

    const disconMsgFont = scaledFont(disconMsgFontName, disconMsgFontScale);
    fillText(ctx, disconMsgText, cx, cy, disconMsgColor, disconMsgFont);

    cy += disconReasonVerticalShift;
    const disconReasonFont = scaledFont(disconReasonFontName, disconReasonFontScale);
    fillText(ctx, reason, cx, cy, disconReasonColor, disconReasonFont);

    this.backToMenuButton.fontScale = backToMenuBtnFontScale;
    this.backToMenuButton.x = cx;
    this.backToMenuButton.y = cy + menuBtnsVerticalShift;
    ButtonView.draw(ctx, this.backToMenuButton);
  }
}
