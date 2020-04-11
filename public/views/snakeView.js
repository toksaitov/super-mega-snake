import {
    cellSize,
    centeringShiftX,
    centeringShiftY,
    fillRect,
    drawImage
} from '../utilities/drawingHelpers.js';

export default class SnakeView {
    static scoreFont = 'sans-serif';
    static scoreColor = 'white';

    static draw(ctx, snake) {
        const snakeHeadImage = document.getElementById('snakeHeadImage');

        for (let i = 0; i < snake.body.length; i++) {
            const segment = snake.body[i];
            const pixelX = centeringShiftX + segment.x * cellSize;
            const pixelY = centeringShiftY + segment.y * cellSize;

            if (i === snake.head) {
                ctx.save()

                ctx.translate(pixelX + cellSize / 2, pixelY + cellSize / 2);
                if (snake.prevDX === 0 && snake.prevDY === 1) {
                    ctx.rotate(Math.PI);
                } else if (snake.prevDX === -1 && snake.prevDY === 0) {
                    ctx.rotate(-Math.PI / 2);
                } else if (snake.prevDX === 1 && snake.prevDY === 0){
                    ctx.rotate(Math.PI / 2);
                }
                drawImage(ctx, snakeHeadImage, -cellSize / 2, -cellSize / 2, cellSize, cellSize)

                ctx.restore()
            } else {
                fillRect(ctx, pixelX, pixelY, cellSize - 1, cellSize - 1, snake.color);
            }
        }
    }

    static drawScore(ctx, x, y, snake) {
        ctx.fillStyle = this.scoreColor;
        ctx.textAlign = 'center';
        ctx.font = `${cellSize * 3.4}px ${this.scoreFont}`;
        ctx.fillText(snake.score, x, y);
    }
}