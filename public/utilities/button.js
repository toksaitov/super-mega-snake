import {
    fillText
} from './drawingHelpers.js';

export default class Button {
    constructor(text) {
        this._text = text;
        this._x = 0;
        this._y = 0;
        this._color = 'white';
        this._fontSize = 15;
        this._fontName = "'Press Start 2P'";
        this._font = `${this._fontSize}px ${this._fontName}`;

        const ctx = document.createElement('canvas').getContext('2d');
        ctx.font = this._font;

        this._width = ctx.measureText(this._text).width;
        this._height = this._fontSize;

        this._halfWidth = this._width / 2;
        this._halfHeight = this._height / 2;
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

    set color(color) {
        this._color = color;
    }

    set fontSize(fontSize) {
        this._fontSize = fontSize;
        this._font = `${fontSize}px ${this._fontName}`;
        this._height = _this._fontSize;
        this._width = ctx.measureText(this._text).width;
        this._halfHeight = this._height / 2;
        this._halfWidth = this._width / 2;
    }

    set fontName(fontName) {
        this._fontName = fontName;
        this._font = `${this._fontSize}px ${fontName}`;
        this._width = ctx.measureText(this._text).width;
        this._halfWidth = this._width / 2;
    }

    handleScreenClick(x, y, onButtonClick) {
        if (x >= this._x - this._halfWidth &&
            y >= this._y - this._height    &&
            x < this._x  + this._halfWidth &&
            y < this._y  + this._halfHeight) {
            onButtonClick();
        }
    }

    draw(ctx) {
        fillText(ctx, this._text, this._x, this._y, this._color, this._font);
    }
}
