class Token extends GameElement {
  constructor({ x, y, color }) {
    super();
    this.color = color;
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    const radius = 30;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
