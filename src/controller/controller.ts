interface Keys {
  [key: string]: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowRight: boolean;
  ArrowLeft: boolean;
}

export class Controller {
  private keys: Keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
  };

  constructor() {
    document.addEventListener('keydown', e => this.onKeyDown(e));
    document.addEventListener('keyup', e => this.onKeyUp(e));
  }

  get up() {
    return this.keys.ArrowUp;
  }

  get down() {
    return this.keys.ArrowDown;
  }

  get right() {
    return this.keys.ArrowRight;
  }

  get left() {
    return this.keys.ArrowLeft;
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keys[event.key] = true;
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keys[event.key] = false;
  }
}
