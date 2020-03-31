import {
    SinglePlayerGameState,
    LocalMultiPlayerGameState
} from "./gameState.js";

export default class MenuState {
    constructor() {
        this._titleFontSize = 70;
        this._menuItemsFontSize = 20;
        this._menuVerticalShift = 60;
        this._menuVerticalSpacing = 40;
    }

    draw(ctx, w, h) {
        const x = w / 2;
        const y = h / 2;

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fill();

        // Game Title 
        ctx.textAlign = 'center';
        ctx.fillStyle = 'red';
        ctx.font = `${this._titleFontSize}px sans-serif`;
        ctx.fillText('SUPER MEGA SNAKE 9000', x, y);

        // Menu Items
        ctx.fillStyle = 'white';
        ctx.font = `${this._menuItemsFontSize}px sans-serif`;
        const menuMessageOne = 'Press 1 to start a single-player game';
        const menuOneX = x;
        const menuOneY = y + this._menuVerticalShift;
        ctx.fillText(menuMessageOne, menuOneX, menuOneY);
        const menuMessageTwo = 'Press 2 to start a local multi-player game';
        const menuTwoX = x;
        const menuTwoY = y + this._menuVerticalShift + this._menuVerticalSpacing;
        ctx.fillText(menuMessageTwo, menuTwoX, menuTwoY);

        this._menuOneRect = {
            'left':   menuOneX - menuMessageOne.length * this._menuItemsFontSize * 0.45 / 2,
            'right':  menuOneX + menuMessageOne.length * this._menuItemsFontSize * 0.45 / 2,
            'top':    menuOneY - this._menuItemsFontSize * 1.4 / 2,
            'bottom': menuOneY + this._menuItemsFontSize * 1.4 / 2
        }
        this._menuTwoRect = {
            'left':   menuTwoX - menuMessageTwo.length * this._menuItemsFontSize * 0.45 / 2,
            'right':  menuTwoX + menuMessageTwo.length * this._menuItemsFontSize * 0.45 / 2,
            'top':    menuTwoY - this._menuItemsFontSize * 1.4 / 2,
            'bottom': menuTwoY + this._menuItemsFontSize * 1.4 / 2
        }
    }

    keyDown(key, changeState) {
        if (key === '1') {
            changeState(new SinglePlayerGameState());
        } else if (key === '2') {
            changeState(new LocalMultiPlayerGameState());
        }
    }

    click(x, y, changeState) {
        if (!(this._menuOneRect && this._menuTwoRect)) {
            return;
        }

        if (x >= this._menuOneRect.left && x < this._menuOneRect.right &&
            y >= this._menuOneRect.top  && y < this._menuOneRect.bottom) {
            changeState(new SinglePlayerGameState());
        } else if (x >= this._menuTwoRect.left && x < this._menuTwoRect.right &&
                   y >= this._menuTwoRect.top  && y < this._menuTwoRect.bottom) {
            changeState(new LocalMultiPlayerGameState());
        }
    }
}
