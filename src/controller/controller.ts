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

  set up(change: boolean) {
    this.keys.ArrowUp = change;
  }

  set down(change: boolean) {
    this.keys.ArrowDown = change;
  }

  set right(change: boolean) {
    this.keys.ArrowRight = change;
  }

  set left(change: boolean) {
    this.keys.ArrowLeft = change;
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keys[event.key] = true;
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keys[event.key] = false;
  }
}
