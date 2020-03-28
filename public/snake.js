import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Snake {
    // Snake's Behaviour
    constructor(params, initialLength = 5) {
        // Snake's State
        this._normalColor = 'blue';
        this._deadColor = 'gray';

        this._head = 0;
        this._dx = params.dx || 1;
        this._dy = params.dy || 0;
        this._dead = false;
        this._score = 0;
        this._speed = 52; // [1..60]
        this._moveRequest = 0;
        this._moveRequestDiv = Math.max(60 - this._speed, 1);
        this._color = this._normalColor;
        this._scoreFont = 'sans-serif';
        this._scoreColor = 'white';

        this._body = [];
        for (let i = 0; i < initialLength; i++) {
            this._body.push({
                'x': params.x || 0,
                'y': params.y || 0
             });
        }
    }

    turnUp() {
        if (this._dy !== 1) {
            this._dx = 0;
            this._dy = -1;
        }
    }

    turnDown() {
        if (this._dy !== -1) {
            this._dx = 0;
            this._dy = 1;
        }
    }

    turnLeft() {
        if (this._dx !== 1) {
            this._dx = -1;
            this._dy = 0;
        }
    }

    turnRight() {
        if (this._dx !== -1) {
            this._dx = 1;
            this._dy = 0;
        }
    }

    isCollidingWith(x, y) {
        for (const segment of this._body) {
            if (segment.x === x && segment.y === y) {
                return true;
            } 
        }
        return false;
    }

    _isCollidingWithSnakes(snakes) {
        const headSegment = this._body[this._head];
        const x = headSegment.x;
        const y = headSegment.y;

        for (const snake of snakes) {
            if (this === snake) {
                continue;
            }
            if (snake.isCollidingWith(x, y)) {
                return snake;
            }
        }
        return null;
    }

    die() {
        this._dead = true;
        this._color = this._deadColor;
    }

    move(field, apple, snakes, onHaveEatenApple) {
        if (this._dead) { return; }
        if (this._moveRequest++ % this._moveRequestDiv !== 0) { return; }

        const headSegment = this._body[this._head];

        const nextX = headSegment.x + this._dx;
        const nextY = headSegment.y + this._dy;

        if (!field.areCoordsInside(nextX, nextY) ||
             this.isCollidingWith(nextX, nextY)) {
            this.die();
            return;
        }

        let otherSnake;
        if (otherSnake = this._isCollidingWithSnakes(snakes)) {
            this.die(); otherSnake.die();
            return;
        }

        this._head = (this._head + 1) % this._body.length;
        const nextHeadSegment = this._body[this._head];

        if (apple.isCollidingWith(nextX, nextY))  {
            this._score++;
            this._body.splice(this._head, 0, {
                'x': nextX,
                'y': nextY
            });

            onHaveEatenApple();
        } else {
            nextHeadSegment.x = nextX;
            nextHeadSegment.y = nextY;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this._color;
        for (const segment of this._body) {
            const pixelX = centeringShiftX + segment.x * cellSize;
            const pixelY = centeringShiftY + segment.y * cellSize;

            ctx.beginPath();
            ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
            ctx.fill();
        }
    }

    drawScore(ctx, x, y) {
        ctx.fillStyle = this._scoreColor;
        ctx.textAlign = 'center';
        ctx.font = `${cellSize * 3.4}px ${this._scoreFont}`;
        ctx.fillText(this._score, x, y);
    }
}