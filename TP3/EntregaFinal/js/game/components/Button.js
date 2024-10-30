class Button extends GameObject {
  constructor({
    x,
    y,
    width,
    height,
    text,
    background = "blue",
    textColor = "white",
    fontSize = 24,
    fontFamily = "Arial",
    onClick,
  }) {
    super(x, y, width, height);
    this.text = text;
    this.background = background;
    this.onClick = onClick;
    this.textColor = textColor;
    this.font = `${fontSize}px ${fontFamily}`;
  }

  draw(ctx) {
    ctx.fillStyle = this.background;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.textColor;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 8
    );
  }
}
