export class Canvas {
  canvas: HTMLCanvasElement = document.createElement('canvas');

  private x: number = 0;
  private y: number = 0;

  constructor(public color?: string) {
    this.canvas.height = window.innerHeight * 0.8;
    this.canvas.width = this.canvas.height;

    this.canvas.addEventListener('resize', () => {
      this.canvas.height = window.innerHeight * 0.8;
      this.canvas.width = this.canvas.height;
    });
  }

  set background(color) {
    this.color = color;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.canvas.id = 'canvas';

    ctx.fillStyle = this.color || 'transparent';
    ctx.fillRect(this.x, this.y, this.canvas.width, this.canvas.height);
  }
}
