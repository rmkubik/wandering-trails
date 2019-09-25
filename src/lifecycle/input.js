export class Keyboard {
  constructor() {
    this.listenerMap = {};

    document.addEventListener("keydown", event => {
      if (this.listenerMap[event.key]) {
        this.listenerMap[event.key].forEach(listener => listener(event));
      }
    });
  }

  addListener(key, handler) {
    if (!this.listenerMap[key]) {
      // no existing handler
      this.listenerMap[key] = [];
    }

    this.listenerMap[key].push(handler);
  }
}

export class Mouse {
  constructor() {
    this.listenerMap = {};
    this.LEFT_BUTTON = 0;
    this.RIGHT_BUTTON = 2;

    document.addEventListener("mousedown", event => {
      if (this.listenerMap[event.button]) {
        this.listenerMap[event.button].forEach(listener => listener(event));
      }
    });
  }

  addListener(button, handler) {
    if (!this.listenerMap[button]) {
      // no existing handler
      this.listenerMap[button] = [];
    }

    this.listenerMap[button].push(handler);
  }
}
