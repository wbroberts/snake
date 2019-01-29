export class Snake {
  body: Array<number[]>;
  head: number[];
  tail: number[];

  private velocityX: number = 1;
  private velocityY: number = 1;
  private bodyStart: Array<number[]> = [[10, 10], [9, 10]];

  private dir = {
    up: false,
    down: false,
    left: false,
    right: true
  };

  constructor(public size: number) {
    this.head = this.bodyStart[0];
    this.tail = this.bodyStart[1];
    this.body = this.bodyStart;
  }

  death(): boolean {
    return false;
  }

  eat() {
    this.body = [...this.body, this.tail];
  }

  setDir(controller) {
    if (controller.up && !this.dir.down) {
      this.changeDirection('up');
    }

    if (controller.down && !this.dir.up) {
      this.changeDirection('down');
    }

    if (controller.right && !this.dir.left) {
      this.changeDirection('right');
    }

    if (controller.left && !this.dir.right) {
      this.changeDirection('left');
    }
  }

  move() {
    let newBody;
    let newHead;

    if (this.dir.up) {
      newBody = [...this.body];
      newHead = [...this.head];
      newHead[1] -= this.velocityY;
      this.head = [...newHead];
      this.tail = newBody.pop();
      this.body = [this.head, ...newBody];
    }

    if (this.dir.down) {
      newBody = [...this.body];
      this.tail = newBody.pop();
      newHead = [...this.head];
      newHead[1] += this.velocityY;
      this.head = [...newHead];
      this.body = [this.head, ...newBody];
    }

    if (this.dir.right) {
      newBody = [...this.body];
      this.tail = newBody.pop();
      newHead = [...this.head];
      newHead[0] += this.velocityX;
      this.head = [...newHead];
      this.body = [this.head, ...newBody];
    }

    if (this.dir.left) {
      newBody = [...this.body];
      this.tail = newBody.pop();
      newHead = [...this.head];
      newHead[0] -= this.velocityX;
      this.head = [...newHead];
      this.body = [this.head, ...newBody];
    }
  }

  changeDirection(direction: string): void {
    Object.keys(this.dir).map(key => {
      key === direction ? (this.dir[direction] = true) : (this.dir[key] = false);
    });
  }

  reset() {
    this.head = this.bodyStart[0];
    this.tail = this.bodyStart[1];
    this.body = this.bodyStart;
    this.changeDirection('right');
  }

  get direction() {
    let direction;

    Object.keys(this.dir).filter(key => {
      if (this.dir[key] === true) {
        direction = this.dir[key];
      }
    });

    return direction;
  }
}
