export default class Field {
    // Field's Behaviour
    constructor() {
        // Field's State
        this._width = 30;
        this._height = 30;
        this._color = 'white';
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
            'width': this._width,
            'height': this._height,
            'color': this._color
        };
    }
}
