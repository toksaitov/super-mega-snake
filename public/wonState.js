import MenuState from "./menuState.js";

export default class WonState {
    constructor(winnerName, winnerColor) {
        this._winnerName = winnerName;
        this._winnerColor = winnerColor;
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

        // Message 
        ctx.textAlign = 'center';
        ctx.fillStyle = this._winnerColor;
        ctx.font = `${this._titleFontSize}px sans-serif`;
        ctx.fillText(`${this._winnerName} won!`, x, y);

        // Menu Items
        ctx.fillStyle = 'white';
        ctx.font = `${this._menuItemsFontSize}px sans-serif`;
        const menuMessageOne = 'Press Enter to go back to menu';
        const menuOneX = x;
        const menuOneY = y + this._menuVerticalShift;
        ctx.fillText(menuMessageOne, menuOneX, menuOneY);
        this._menuOneRect = {
            'left':   menuOneX - menuMessageOne.length * this._menuItemsFontSize * 0.45 / 2,
            'right':  menuOneX + menuMessageOne.length * this._menuItemsFontSize * 0.45 / 2,
            'top':    menuOneY - this._menuItemsFontSize * 1.4 / 2,
            'bottom': menuOneY + this._menuItemsFontSize * 1.4 / 2
        };
    }

    keyDown(key, changeState) {
        if (key === 'Enter') {
            changeState(new MenuState());
        }
    }

    click(x, y, changeState) {
        if (!this._menuOneRect) {
            return;
        }

        if (x >= this._menuOneRect.left && x < this._menuOneRect.right &&
            y >= this._menuOneRect.top  && y < this._menuOneRect.bottom) {
            changeState(new MenuState());
        }
    }
}
