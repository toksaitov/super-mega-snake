import {
    cellSize,
    centeringShiftX,
    centeringShiftY
} from './drawingHelpers.js';

export default class Snake {
    // Snake's Behaviour
    constructor() {
        // Snake's State
        this.snakeStartX = 0;
        this.snakeStartY = 0;
        this.snakeNormalColor = 'blue';
        this.snakeDeadColor = 'gray';

        this.snakeBody = [];
        this.snakeLength = 5;
        this.snakeHead = this.snakeLength - 1;
        this.snakeDX = 1;
        this.snakeDY = 0;
        this.snakeDead = false;
        this.snakeScore = 0;
        this.snakeSpeed = 55; // [1..60]
        this.snakeMoveRequest = 0;
        this.snakeMoveRequestDiv = Math.max(60 - this.snakeSpeed, 1);
        this.snakeColor = this.snakeNormalColor;
        this.snakeScoreFont = 'sans-serif';
        this.snakeScoreColor = 'white';

        for (let i = 0; i < this.snakeLength; i++) {
            this.snakeBody.push({
                x: this.snakeStartX,
                y: this.snakeStartY,
            });
        }
    }

    turnSnakeUp() {
        if (this.snakeDY !== 1) {
            this.snakeDX = 0;
            this.snakeDY = -1;
        }
    }

    turnSnakeDown() {
        if (this.snakeDY !== -1) {
            this.snakeDX = 0;
            this.snakeDY = 1;
        }
    }

    turnSnakeLeft() {
        if (this.snakeDX !== 1) {
            this.snakeDX = -1;
            this.snakeDY = 0;
        }
    }

    turnSnakeRight() {
        if (this.snakeDX !== -1) {
            this.snakeDX = 1;
            this.snakeDY = 0;
        }
    }

    isCollidingWithSnake(x, y) {
        for (const segment of this.snakeBody) {
            if (segment.x === x && segment.y === y) {
                return true;
            } 
        }
        return false;
    }

    moveSnake(field, apple, onHaveEatenApple) {
        if (this.snakeDead) { return; }
        if (this.snakeMoveRequest++ % this.snakeMoveRequestDiv !== 0) { return; }

        const headSegment = this.snakeBody[this.snakeHead];

        const nextX = headSegment.x + this.snakeDX;
        const nextY = headSegment.y + this.snakeDY;

        if (!field.areCoordsInsideField(nextX, nextY) ||
             this.isCollidingWithSnake(nextX, nextY)) {
            this.snakeDead = true;
            this.snakeColor = this.snakeDeadColor;
            return;
        }

        this.snakeHead = (this.snakeHead + 1) % this.snakeLength;
        const nextHeadSegment = this.snakeBody[this.snakeHead];

        if (apple.isCollidingWithApple(nextX, nextY))  {
            this.snakeScore++;
            this.snakeLength++;
            this.snakeBody.splice(this.snakeHead, 0, {
                'x': nextX,
                'y': nextY
            });

            onHaveEatenApple();
        } else {
            nextHeadSegment.x = nextX;
            nextHeadSegment.y = nextY;
        }
    }

    drawSnake(ctx, w, h) {
        ctx.fillStyle = this.snakeColor;
        for (const segment of this.snakeBody) {
            const pixelX = centeringShiftX + segment.x * cellSize;
            const pixelY = centeringShiftY + segment.y * cellSize;

            ctx.beginPath();
            ctx.rect(pixelX, pixelY, cellSize - 1, cellSize - 1);
            ctx.fill();
        }
    }

    drawSnakeScore(ctx, w, h) {
        ctx.fillStyle = this.snakeScoreColor;
        ctx.textAlign = 'center';
        ctx.font = `${cellSize * 3.4}px ${this.snakeScoreFont}`;
        ctx.fillText(this.snakeScore, w / 2, h * 0.085);
    }
}