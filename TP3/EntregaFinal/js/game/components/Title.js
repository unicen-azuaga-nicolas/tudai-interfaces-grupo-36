class Title extends GameObject {
  constructor({ x, y, width, height, text, fontSize, fontFamily, color }) {
    super(x, y, width, height);
    this.text = text;
    this.fontSize = fontSize || 24;
    this.fontFamily = fontFamily || "Arial";
    this.font = `${this.fontSize}px ${this.fontFamily}`;
    this.color = color || "black";
  }

  draw() {
    GameObject.ctx.fillStyle = this.color;
    GameObject.ctx.font = this.font;
    GameObject.ctx.textAlign = "center";
    GameObject.ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 8
    );
  }

  isClicked(x, y) {
    return false;
  }
}
