export default class Controller {
  constructor(keyMappings) {
    this._keyMappings = keyMappings || {};
  }

  set keyMappings(keyMappings) {
    this._keyMappings = keyMappings;
  }

  draw() { }

  click() { }

  keyDown(key) {
    const action = this._keyMappings[key.toLowerCase()];
    if (action) {
      action();
    }
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let currentController = null;

export function changeController(controller) {
  currentController = controller;
}
