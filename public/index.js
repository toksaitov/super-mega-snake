import MenuState from './state/menuState.js';

let currentState = new MenuState();

function setup(ctx, w, h) {
    window.requestAnimationFrame(() => draw(ctx, w, h));
}

function draw(ctx, w, h) {
    if (w != window.innerWidth || h != window.innerHeight) {
        w = canvas.width  = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    const shouldSimulate = true;
    currentState.draw(ctx, w, h, nextState => {
        currentState = nextState;
    }, shouldSimulate);

    window.requestAnimationFrame(() => draw(ctx, w, h));
}

function keyDown(key) {
    currentState.keyDown(key, nextState => {
        currentState = nextState;
    });
}

function click(x, y) {
    currentState.click(x, y, nextState => {
        currentState = nextState;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const w = canvas.width  = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    setup(canvas.getContext('2d'), w, h);
    document.addEventListener('keydown', e => keyDown(e.key));
    document.addEventListener('click', e => click(e.clientX, e.clientY));
});
