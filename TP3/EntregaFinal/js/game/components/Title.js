class Title extends GameObject {
  constructor(x, y, width, height, text, fontSize = 24, fontFamily = "Arial") {
    super(x, y, width, height);
    this.text = text;
    this.font = `${fontSize}px ${fontFamily}`;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 8
    );
  }
}
