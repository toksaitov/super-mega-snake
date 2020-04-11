export default class Apple {
    // Apple's Behaviour
    constructor(field, snakes) {
        // Apple's State
        this._color = 'red';

        const isCollidingWithSnakes = (x, y, snakes) => {
            for (const snake of snakes) {
                if (snake.isCollidingWith(x, y)) {
                    return true;
                }
            }
            return false;
        }
        do {
            this._x = Math.trunc(Math.random() * field.width);
            this._y = Math.trunc(Math.random() * field.height);
        } while (isCollidingWithSnakes(this._x, this._y, snakes));
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get color() {
        return this._color;
    }

    isCollidingWith(x, y) {
        return x === this._x && y === this._y;
    }

    serialize() {
        return {
            'x': this._x,
            'y': this._y,
            'color': this._color
        }
    }
}