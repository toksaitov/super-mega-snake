import {
    recalcDrawingSizes,
    centeringShiftX,
    fieldPixelWidth
} from '../../utilities/drawingHelpers.js';

import Field from '../../models/field.js';
import Apple from '../../models/apple.js';
import Snake from '../../models/snake.js';

import FieldView from '../../views/fieldView.js';
import AppleView from '../../views/appleView.js';
import SnakeView from '../../views/snakeView.js';

import State from '../state.js';
import PauseState from '../pauseState.js';
import LostState from '../lostState.js';
import WonState from '../wonState.js';

export default class LocalMultiPlayerGameState extends State {
    constructor() {
        super({
            'w': () => this._snake1.turnUp(),
            'a': () => this._snake1.turnLeft(),
            's': () => this._snake1.turnDown(),
            'd': () => this._snake1.turnRight(),
            'arrowup':    () => this._snake2.turnUp(),
            'arrowleft':  () => this._snake2.turnLeft(),
            'arrowdown':  () => this._snake2.turnDown(),
            'arrowright': () => this._snake2.turnRight(),
            'escape': changeState => changeState(new PauseState(this))
        });

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
        super.draw(ctx, w, h);

        recalcDrawingSizes(w, h, this._field);

        if (shouldSimulate) {
            const onHaveEatenApple = () => {
                this._apple = new Apple(this._field, this._snakes);

                const pickupAppleSound = document.getElementById('pickupAppleSound');
                pickupAppleSound.play();
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
            } else if (aliveSnakes.length < 1) {
                changeState(new LostState());
            }
        }

        FieldView.draw(ctx, this._field);
        AppleView.draw(ctx, this._apple);
        SnakeView.draw(ctx, this._snake1);
        SnakeView.draw(ctx, this._snake2);
        
        const topScoreMargin = h * 0.085;
        const leftScoreMargin = centeringShiftX + w * 0.01;
        const rightScoreMargin = centeringShiftX + fieldPixelWidth - w * 0.01;
        SnakeView.drawScore(ctx, leftScoreMargin, topScoreMargin, this._snake1);
        SnakeView.drawScore(ctx, rightScoreMargin, topScoreMargin, this._snake2);
    }

    click(x, y) {}
}
