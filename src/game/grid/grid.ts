export class Grid {
  map: Array<number[]> = [];
  width: number;

  private background: string;
  private snake: string;
  private apple: string;

  constructor(public colsAndRows: number, public ctx: CanvasRenderingContext2D) {
    this.width = ctx.canvas.width;
    for (let i = 0; i < colsAndRows; i++) {
      this.map[i] = new Array(colsAndRows).fill(0);
    }
  }

  get cols() {
    return this.colsAndRows;
  }

  get rows() {
    return this.colsAndRows;
  }

  get size() {
    return this.width / this.colsAndRows;
  }

  set colors({ ...args }) {
    this.background = args.dark;
    this.snake = args.light;
    this.apple = args.apple;
  }

  render(ctx: CanvasRenderingContext2D) {
    const size = this.size;
    const map = [...this.map];

    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (map[col][row] === 0) {
          ctx.fillStyle = this.background;
          ctx.fillRect(col * size, row * size, size, size);
        } else if (this.map[col][row] === 1) {
          ctx.fillStyle = this.snake;
          ctx.fillRect(col * size + 1, row * size + 1, size - 2, size - 2);
        } else if (this.map[col][row] === 2) {
          ctx.fillStyle = this.apple;
          ctx.fillRect(col * size + 2, row * size + 2, size - 4, size - 4);
        }
      }
    }

    this.map = map;
  }

  reset() {
    this.map = [];
    for (let i = 0; i < this.colsAndRows; i++) {
      this.map[i] = new Array(this.colsAndRows).fill(0);
    }
  }

  updateWidth(canvas: HTMLCanvasElement) {
    this.width = canvas.width;
  }
}
