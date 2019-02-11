export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(public color?: string) {
    this.canvas = document.createElement('canvas');
    this.canvas.height = window.innerHeight * 0.8;
    this.canvas.width = this.canvas.height;

    this.ctx = this.canvas.getContext('2d');
  }

  set background(color) {
    this.color = color;
  }

  render() {
    this.canvas.id = 'canvas';

    this.ctx.fillStyle = this.color || 'transparent';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resize(): void {
    const h = window.innerHeight * 0.85;
    const innerW = window.innerWidth;

    if (h >= innerW) {
      this.canvas.height = innerW * 0.9;
    } else {
      this.canvas.height = window.innerHeight * 0.85;
    }

    this.canvas.width = this.canvas.height;
    this.ctx.canvas.height = this.canvas.height;
    this.ctx.canvas.width = this.canvas.width;

    this.render();
  }
}
