import {
    recalcDrawingSizes
} from '../../utilities/drawingHelpers.js';

import FieldView from '../../views/fieldView.js';
import AppleView from '../../views/appleView.js';
import SnakeView from '../../views/snakeView.js';
import SnakesView from '../../views/snakesView.js';

import State from '../state.js';
import LostState from '../lostState.js';
import WonState from '../wonState.js';
import DisconnectedState from '../disconnectedState.js';

export default class NetworkMultiPlayerGameState extends State {
    constructor(changeState) {
        const socket = io();

        socket.on('disconnect', reason => {
            if (reason === 'io server disconnect') {
                reason = 'The game room is full. Try again later...'
            } else {
                reason = 'Connection error.'
            }
            changeState(new DisconnectedState(reason));
        });

        socket.on('update', data => {
            this._field  = data[0];
            this._apple  = data[1];
            this._snakes = data[2];
        });

        super({
            'w': () => this._socket.emit('command', 'w'),
            'a': () => this._socket.emit('command', 'a'),
            's': () => this._socket.emit('command', 's'),
            'd': () => this._socket.emit('command', 'd')
        });

        this._field = {};
        this._snakes = {};
        this._apple = {};
        this._snakePrevLength = undefined;

        socket.emit('spawn');
        this._socket = socket;
    }

    get _snake() {
        const id = this._socket.id;
        if (id) {
            return this._snakes[id];
        }

        return null;
    }

    draw(ctx, w, h, changeState) {
        super.draw(ctx, w, h);

        recalcDrawingSizes(w, h, this._field);

        if (!this._snake) {
            return;
        }

        if (this._snake.dead) {
            changeState(new LostState());
            return;
        }

        if (this._snakePrevLength && this._snakePrevLength != this._snake.body.length) {
            const pickupAppleSound = document.getElementById('pickupAppleSound');
            pickupAppleSound.play();
        }
        this._snakePrevLength = this._snake.body.length;

        FieldView.draw(ctx, this._field);
        AppleView.draw(ctx, this._apple);
        SnakesView.draw(ctx, this._snakes);

        const topScoreMargin = h * 0.085;
        SnakeView.drawScore(ctx, w / 2, topScoreMargin, this._snake);
    }

    click(x, y) {}
}
