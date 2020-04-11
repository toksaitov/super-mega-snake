import {
    recalcDrawingSizes
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

export default class SinglePlayerGameState extends State {
    constructor() {
        super({
            'w': () => this._snake.turnUp(),
            'a': () => this._snake.turnLeft(),
            's': () => this._snake.turnDown(),
            'd': () => this._snake.turnRight(),
            'escape': changeState => changeState(new PauseState(this))
        });

        this._field = new Field();
        this._snake = new Snake({
            'x': 0, 'y': 0,
            'dx': 1, 'dy': 0
        });
        this._snakes = [this._snake];
        this._apple = new Apple(this._field, this._snakes);
    }

    draw(ctx, w, h, changeState, shouldSimulate) {
        super.draw(ctx, w, h);
        recalcDrawingSizes(w, h, this._field);
    
        if (shouldSimulate) {
            this._snake.move(this._field, this._apple, this._snakes, () => {
                this._apple = new Apple(this._field, this._snakes);

                const pickupAppleSound = document.getElementById('pickupAppleSound');
                pickupAppleSound.play();
            });

            if (this._snake.dead) {
                changeState(new LostState());
            }
        }

        FieldView.draw(ctx, this._field);
        AppleView.draw(ctx, this._apple);
        SnakeView.draw(ctx, this._snake);

        const topScoreMargin = h * 0.085;
        SnakeView.drawScore(ctx, w / 2, topScoreMargin, this._snake);
    }

    click(x, y) {}
}