import {
  defaultBtnColor,
  defaultBtnFontName,
  defaultBtnFontScale,
} from '../params.js';

import {
  measureText,
  scaledFont,
} from '../utilities/drawingHelpers.js';

export default class Button {
  constructor(
    text,
    fontName  = defaultBtnFontName,
    fontScale = defaultBtnFontScale,
    color = defaultBtnColor,
  ) {
    this._text = text;
    this._x = 0;
    this._y = 0;
    this._fontName = fontName;
    this._fontScale = fontScale;
    this._font = scaledFont(fontName, fontScale);
    this._recalculateSizes();
    this._color = color;
  }

  get text() {
    return this._text;
  }

  get x() {
    return this._x;
  }

  set x(x) {
    this._x = x;
  }

  get y() {
    return this._y;
  }

  set y(y) {
    this._y = y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get font() {
    return this._font;
  }

  set fontScale(fontScale) {
    this._fontScale = fontScale;
    this._font = scaledFont(this._fontName, fontScale);
    this._recalculateSizes();
  }

  get color() {
    return this._color;
  }

  handleClick(x, y, clickHandler) {
    if (x >= this._x - this._halfWidth &&
        y >= this._y - this._height    &&
        x < this._x  + this._halfWidth &&
        y < this._y  + this._halfHeight) {
      clickHandler();
    }
  }

  _recalculateSizes() {
    const ctx = undefined;
    [this._width, this._height] = measureText(ctx, this._text, this._font);
    this._halfWidth  = this._width * 0.5;
    this._halfHeight = this._height * 0.5;
  }
}
