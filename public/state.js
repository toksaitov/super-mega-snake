import {
    clearScreen
} from './drawingHelpers.js';

export default class State {
    constructor(keyMappings) {
        this._keyMappings = keyMappings;
    }

    draw(ctx, w, h) {
        clearScreen(ctx, w, h);

    }

    keyDown(key, changeState) {
        const action = this._keyMappings[key.toLowerCase()];
        if (action) {
            action(changeState);
        }
    }
}