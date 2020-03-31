import {
    recalcDrawingSizes,
    centeringShiftX,
    fieldPixelWidth 
} from './drawingHelpers.js';

import Field from './field.js';
import Apple from './apple.js';
import Snake from './snake.js';

import PauseState from './pauseState.js';
import LostState from './lostState.js';
import WonState from './wonState.js';

export class SinglePlayerGameState {
    constructor() {
        this._field = new Field();
        this._snake = new Snake({
            'x': 0, 'y': 0,
            'dx': 1, 'dy': 0
        });
        this._snakes = [this._snake];
        this._apple = new Apple(this._field, this._snakes);
    }

    draw(ctx, w, h, changeState, shouldSimulate) {
        recalcDrawingSizes(w, h, this._field);

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fill();
    
        if (shouldSimulate) {
            this._snake.move(this._field, this._apple, this._snakes, () => {
                this._apple = new Apple(this._field, this._snakes);
            });

            if (this._snake.dead) {
                changeState(new LostState());
                return;
            }
        }
    
        this._field.draw(ctx);
        this._apple.draw(ctx);
        this._snake.draw(ctx);
        
        const topScoreMargin = h * 0.085;
        this._snake.drawScore(ctx, w / 2, topScoreMargin);
    }

    keyDown(key, changeState) {
        switch (key) {
            case 'w':
            case 'W':
                this._snake.turnUp();
                break;
            case 'a':
            case 'A':
                this._snake.turnLeft();
                break;
            case 's':
            case 'S':
                this._snake.turnDown();
                break;
            case 'd':
            case 'D':
                this._snake.turnRight();
                break;
            case 'Escape':
                changeState(new PauseState(this));
                break;
        }
    }

    click(x, y) {}
}

export class LocalMultiPlayerGameState {
    constructor() {
        this._field = new Field();
        this._snake1 = new Snake({
            'name': 'Red snake',
            'x': 0, 'y': 0,
            'dx': 1, 'dy': 0,
            'color': 'red'
        });
        this._snake2 = new Snake({
            'name': 'Blue snake',
            'x': this._field.width - 1,
            'y': this._field.height - 1,
            'dx': -1, 'dy': 0,
            'color': 'blue'
        });
        this._snakes = [this._snake1, this._snake2];
        this._apple = new Apple(this._field, this._snakes);
    }

    draw(ctx, w, h, changeState, shouldSimulate) {
        recalcDrawingSizes(w, h, this._field);

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fill();
    
        if (shouldSimulate) {
            const onHaveEatenApple = () => {
                this._apple = new Apple(this._field, this._snakes);
            }
            this._snake1.move(this._field, this._apple, this._snakes, onHaveEatenApple);
            this._snake2.move(this._field, this._apple, this._snakes, onHaveEatenApple);

            const aliveSnakes = [];
            for (const snake of this._snakes) {
                if (!snake.dead) { aliveSnakes.push(snake); }
            }
            if (aliveSnakes.length == 1) {
                const winnerName = aliveSnakes[0].name;
                const winnerColor = aliveSnakes[0].color;
                changeState(new WonState(winnerName, winnerColor));
                return;
            } else if (aliveSnakes.length < 1) {
                changeState(new LostState());
            }
        }

        this._field.draw(ctx);
        this._apple.draw(ctx);
        this._snake1.draw(ctx);
        this._snake2.draw(ctx);
        
        const topScoreMargin = h * 0.085;
        const leftScoreMargin = centeringShiftX + w * 0.01;
        const rightScoreMargin = centeringShiftX + fieldPixelWidth - w * 0.01;
        this._snake1.drawScore(ctx, leftScoreMargin, topScoreMargin);
        this._snake2.drawScore(ctx, rightScoreMargin, topScoreMargin);    
    }

    keyDown(key, changeState) {
        switch (key) {
            case 'w':
            case 'W':
                this._snake1.turnUp();
                break;
            case 'a':
            case 'A':
                this._snake1.turnLeft();
                break;
            case 's':
            case 'S':
                this._snake1.turnDown();
                break;
            case 'd':
            case 'D':
                this._snake1.turnRight();
                break;
            case 'ArrowUp':
                this._snake2.turnUp();
                break;
            case 'ArrowLeft':
                this._snake2.turnLeft();
                break;
            case 'ArrowDown':
                this._snake2.turnDown();
                break;
            case 'ArrowRight':
                this._snake2.turnRight();
                break;
            case 'Escape':
                changeState(new PauseState(this));
                break;
        }
    }

    click(x, y) {}
}
