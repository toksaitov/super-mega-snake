import { fillText } from '../utilities/drawingHelpers.js';

import State from './state.js';
import SinglePlayerGameState from './gameStates/singlePlayerGameState.js';
import LocalMultiPlayerGameState from './gameStates/localMultiPlayerGameState.js';
import NetworkMultiPlayerGameState from './gameStates/networkMultiPlayerGameState.js';

import Button from '../utilities/button.js';

export default class MenuState extends State {
    constructor() {
        super({
            '1': changeState => changeState(new SinglePlayerGameState(changeState)),
            '2': changeState => changeState(new LocalMultiPlayerGameState(changeState)),
            '3': changeState => changeState(new NetworkMultiPlayerGameState(changeState))
        });

        this._menuButton1 = new Button('Press 1 to start a single-player game');
        this._menuButton2 = new Button('Press 2 to start a local multi-player game');
        this._menuButton3 = new Button('Press 3 to start a network multi-player game');

        this._titleFontSize = 30;
        this._menuItemsFontSize = 10;
        this._menuVerticalShift = 60;
        this._menuVerticalSpacing = 40;
    }

    draw(ctx, w, h) {
        super.draw(ctx, w, h);

        const [cx, cy] = [w / 2, h / 2];
        this._menuButton1.x =
        this._menuButton2.x =
        this._menuButton3.x = cx;
        this._menuButton1.y = cy + this._menuVerticalShift;
        this._menuButton2.y = this._menuButton1.y + this._menuVerticalSpacing;
        this._menuButton3.y = this._menuButton2.y + this._menuVerticalSpacing;

        fillText(ctx, 'SUPER MEGA SNAKE 9000', cx, cy, 'red', `${this._titleFontSize}px 'Press Start 2P'`);
        this._menuButton1.draw(ctx);
        this._menuButton2.draw(ctx);
        this._menuButton3.draw(ctx);
    }

    click(x, y, changeState) {
        this._menuButton1.handleScreenClick(x, y, () => changeState(new SinglePlayerGameState()));
        this._menuButton2.handleScreenClick(x, y, () => changeState(new LocalMultiPlayerGameState()));
        this._menuButton3.handleScreenClick(x, y, () => changeState(new NetworkMultiPlayerGameState(changeState)));
    }
}
