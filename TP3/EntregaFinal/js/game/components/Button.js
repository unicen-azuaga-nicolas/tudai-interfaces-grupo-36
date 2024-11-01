class Button extends GameObject {
  constructor({
    x,
    y,
    width,
    height,
    text,
    background,
    backgroundImage,
    textColor,
    fontSize,
    fontFamily,
    onClick,
    drawCustomShape,
  }) {
    super(x, y, width, height);
    this.text = text || "";
    this.onClick = onClick;
    this.textColor = textColor || "white";
    this.fontSize = fontSize || 20;
    this.fontFamily = fontFamily || "Arial";
    this.font = `${this.fontSize}px ${this.fontFamily}`;
    this.drawCustomShape = drawCustomShape;
    this.background = background || "blue";
    this.backgroundImage = backgroundImage || null;
  }

  draw() {
    if (this.drawCustomShape) {
      this.drawCustomShape(
        Game.ctx,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.backgroundImage) {
      this.fillBackgroundImage(this.backgroundImage);
    } else {
      this.fillBackground();
    }
    Game.ctx.fillStyle = this.textColor;
    Game.ctx.font = this.font;
    Game.ctx.textAlign = "center";
    Game.ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 8
    );
  }

  isClicked(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  onClick() {
    console.log("Button clicked");
    this.onClick();
  }
}
