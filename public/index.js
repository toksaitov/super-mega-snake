import {
  currentController,
  changeController,
} from './controllers/Controller.js';
import MenuController from './controllers/MenuController.js';

function setup(ctx, w, h) {
  changeController(new MenuController());

  document.fonts.ready.then(() => {
    // eslint-disable-next-line no-use-before-define
    window.requestAnimationFrame(() => draw(ctx, w, h));
  });
}

function draw(ctx, w, h) {
  if (w !== window.innerWidth || h !== window.innerHeight) {
    w = ctx.canvas.width  = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
  }

  const shouldSimulate = true;
  currentController.draw(ctx, w, h, shouldSimulate);

  window.requestAnimationFrame(() => draw(ctx, w, h));
}

function keyDown(key) {
  currentController.keyDown(key);
}

function click(x, y) {
  currentController.click(x, y);
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const w = canvas.width  = window.innerWidth;
  const h = canvas.height = window.innerHeight;
  setup(canvas.getContext('2d'), w, h);
  document.addEventListener('keydown', e => keyDown(e.key));
  document.addEventListener('click', e => click(e.clientX, e.clientY));
});
