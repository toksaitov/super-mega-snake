import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Snake {
    // Snake's Behaviour
    constructor(params, initialLength = 5) {
        // Snake's State
        this.normalColor = 'blue';
        this.deadColor = 'gray';

        this.head = 0;
        this.dx = params.dx || 1;
        this.dy = params.dy || 0;
        this.dead = false;
        this.score = 0;
        this.speed = 52; // [1..60]
        this.moveRequest = 0;
        this.moveRequestDiv = Math.max(60 - this.speed, 1);
        this.color = this.normalColor;
        this.scoreFont = 'sans-serif';
        this.scoreColor = 'white';

        this.body = [];
        for (let i = 0; i < initialLength; i++) {
            this.body.push({
                'x': params.x || 0,
                'y': params.y || 0
             });
        }
    }

    turnUp() {
        if (this.dy !== 1) {
            this.dx = 0;
            this.dy = -1;
        }
    }

    turnDown() {
        if (this.dy !== -1) {
            this.dx = 0;
            this.dy = 1;
        }
    }

    turnLeft() {
        if (this.dx !== 1) {
            this.dx = -1;
            this.dy = 0;
        }
    }

    turnRight() {
        if (this.dx !== -1) {
            this.dx = 1;
            this.dy = 0;
        }
    }

    isCollidingWith(x, y) {
        for (const segment of this.body) {
            if (segment.x === x && segment.y === y) {
                return true;
            } 
        }
        return false;
    }

    isCollidingWithSnakes(snakes) {
        const headSegment = this.body[this.head];
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
        this.dead = true;
        this.color = this.deadColor;
    }

    move(field, apple, snakes, onHaveEatenApple) {
        if (this.dead) { return; }
        if (this.moveRequest++ % this.moveRequestDiv !== 0) { return; }

        const headSegment = this.body[this.head];

        const nextX = headSegment.x + this.dx;
        const nextY = headSegment.y + this.dy;

        if (!field.areCoordsInside(nextX, nextY) ||
             this.isCollidingWith(nextX, nextY)) {
            this.die();
            return;
        }

        let otherSnake;
        if (otherSnake = this.isCollidingWithSnakes(snakes)) {
            this.die(); otherSnake.die();
            return;
        }

        this.head = (this.head + 1) % this.body.length;
        const nextHeadSegment = this.body[this.head];

        if (apple.isCollidingWith(nextX, nextY))  {
            this.score++;
            this.body.splice(this.head, 0, {
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
        ctx.fillStyle = this.color;
        for (const segment of this.body) {
            const pixelX = centeringShiftX + segment.x * cellSize;
            const pixelY = centeringShiftY + segment.y * cellSize;

            ctx.beginPath();
            ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
            ctx.fill();
        }
    }

    drawScore(ctx, x, y) {
        ctx.fillStyle = this.scoreColor;
        ctx.textAlign = 'center';
        ctx.font = `${cellSize * 3.4}px ${this.scoreFont}`;
        ctx.fillText(this.score, x, y);
    }
}