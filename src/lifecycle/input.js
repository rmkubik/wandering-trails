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
      // no exisiting handler
      this.listenerMap[key] = [];
    }

    this.listenerMap[key].push(handler);
  }
}
