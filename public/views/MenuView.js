import {
  recalcDrawingSizes,
  clearScreen,
  fillText,
  scaledFont,
} from '../utilities/drawingHelpers.js';

import {
  menuTitleVerticalShift,
  menuTitleFontName,
  menuTitleFontScale,
  menuTitleColor,
  menuBtnsVerticalShift,
  menuBtnVerticalSpacing,
  menuBtnFontName,
  menuBtnFontScale,
  menuBtnColor,
} from '../params.js';

import {
  menuTitleText,
  singlePlayerGameBtnText,
  localMultiPlayerGameBtnText,
  networkMultiPlayerGameBtnText,
} from '../strings.js';

import Button from '../models/Button.js';
import ButtonView from './ButtonView.js';

export default class MenuView {
  static menuButton1 =
    new Button(singlePlayerGameBtnText, menuBtnFontName, menuBtnFontScale, menuBtnColor);
  static menuButton2 =
    new Button(localMultiPlayerGameBtnText, menuBtnFontName, menuBtnFontScale, menuBtnColor);
  static menuButton3 =
    new Button(networkMultiPlayerGameBtnText, menuBtnFontName, menuBtnFontScale, menuBtnColor);

  static draw(ctx, w, h) {
    recalcDrawingSizes(w, h);
    clearScreen(ctx, w, h);

    const [cx, cy] = [w / 2, h / 2 + menuTitleVerticalShift];
    const titleFont = scaledFont(menuTitleFontName, menuTitleFontScale);
    fillText(ctx, menuTitleText, cx, cy, menuTitleColor, titleFont);

    this.menuButton1.fontScale = menuBtnFontScale;
    this.menuButton2.fontScale = menuBtnFontScale;
    this.menuButton3.fontScale = menuBtnFontScale;

    this.menuButton1.x = cx;
    this.menuButton2.x = cx;
    this.menuButton3.x = cx;

    this.menuButton1.y = cy + menuBtnsVerticalShift;
    this.menuButton2.y = this.menuButton1.y + this.menuButton1.height + menuBtnVerticalSpacing;
    this.menuButton3.y = this.menuButton2.y + this.menuButton2.height + menuBtnVerticalSpacing;

    ButtonView.draw(ctx, this.menuButton1);
    ButtonView.draw(ctx, this.menuButton2);
    ButtonView.draw(ctx, this.menuButton3);
  }
}
