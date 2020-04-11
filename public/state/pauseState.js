import {
    clearScreen
} from '../utilities/drawingHelpers.js';

import State from './state.js';

export default class PauseState extends State {
    constructor(prevState) {
        super({
            'escape': changeState => changeState(this._prevState)
        });

        this._titleFontSize = 30;
        this._prevState = prevState;
    }

    draw(ctx, w, h) {
        const x = w / 2;
        const y = h / 2;

        const shouldSimulate = false;
        const changeState = null;
        this._prevState.draw(ctx, w, h, changeState, shouldSimulate);
        clearScreen(ctx, w, h, 'rgba(0, 0, 0, 0.7)');

        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = `${this._titleFontSize}px sans-serif`;
        ctx.fillText('Press Esc to continue', x, y);
    }
}
