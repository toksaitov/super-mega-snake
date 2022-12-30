import {
  defaultFieldWidth,
  defaultFieldHeight,
  defaultFieldColor,
} from '../params.js';

export default class Field {
  constructor(
    width  = defaultFieldWidth,
    height = defaultFieldHeight,
    color  = defaultFieldColor,
  ) {
    this._width  = width;
    this._height = height;
    this._color  = color;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get color() {
    return this._color;
  }

  areCoordsInside(x, y) {
    return x >= 0 && x < this._width &&
           y >= 0 && y < this._height;
  }

  serialize() {
    return {
      'width':  this._width,
      'height': this._height,
      'color':  this._color,
    };
  }
}
