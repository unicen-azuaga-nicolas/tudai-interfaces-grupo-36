class BaseScreen extends GameObject {
  constructor(canvas, backgroundColor = "black") {
    super(0, 0, canvas.width, canvas.height);
    this.canvas = canvas;
    this.children = [];
    this.backgroundColor = backgroundColor;
  }

  setBackgroundColor(color) {
    this.background = color;
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.children.forEach((child) => child.draw(ctx));
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));
  }

  isClicked(x, y) {
    return this.children.some((child) => child.isClicked(x, y));
  }

  isMouseOver(x, y) {
    return this.children.some((child) => child.isMouseOver(x, y));
  }
}
