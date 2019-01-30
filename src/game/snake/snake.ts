export class Snake {
  body: Array<number[]>;
  head: number[];
  tail: number[];

  private bodyStart: Array<number[]> = [[10, 10], [9, 10]];
  private dir = { up: false, down: false, left: false, right: true };
  private velocity: number = 1;

  constructor(public size: number) {
    this.head = this.bodyStart[0];
    this.tail = this.bodyStart[1];
    this.body = this.bodyStart;
  }

  eat(): void {
    this.body = [...this.body, this.tail];
  }

  move(): void {
    if (this.dir.up) {
      this.updateSnake('y', 'up');
    }

    if (this.dir.down) {
      this.updateSnake('y', 'down');
    }

    if (this.dir.right) {
      this.updateSnake('x', 'right');
    }

    if (this.dir.left) {
      this.updateSnake('x', 'left');
    }
  }

  reset(): void {
    this.head = this.bodyStart[0];
    this.tail = this.bodyStart[1];
    this.body = this.bodyStart;
    this.changeDirection('right');
  }

  setDir(controller): void {
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

  private changeDirection(direction: string): void {
    Object.keys(this.dir).map(key => {
      key === direction ? (this.dir[direction] = true) : (this.dir[key] = false);
    });
  }

  private updateSnake(axis: string, dir: string): void {
    const index = axis === 'y' ? 1 : 0;
    const direction = dir === 'right' || dir === 'down' ? this.velocity : -this.velocity;

    const newBody = [...this.body];
    this.tail = newBody.pop();

    const newHead = [...this.head];
    newHead[index] += direction;

    this.head = [...newHead];
    this.body = [this.head, ...newBody];
  }
}
