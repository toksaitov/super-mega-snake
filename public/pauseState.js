export default class PauseState {
    constructor(prevState) {
        this._titleFontSize = 30;
        this._prevState = prevState;
    }

    draw(ctx, w, h) {
        const x = w / 2;
        const y = h / 2;

        const shouldSimulate = false;
        const changeState = null;
        this._prevState.draw(ctx, w, h, changeState, shouldSimulate);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fill();

        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = `${this._titleFontSize}px sans-serif`;
        ctx.fillText('Press Esc to continue', x, y);
    }

    keyDown(key, changeState) {
        if (key === 'Escape') {
            changeState(this._prevState);
        }
    }
}
