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
  }) {
    super(x, y, width, height);
    this.text = text || "";
    this.background = background || "blue";
    this.backgroundImage = backgroundImage || null;
    this.onClick = onClick;
    this.textColor = textColor || "white";
    this.fontSize = fontSize || 20;
    this.fontFamily = fontFamily || "Arial";
    this.font = `${this.fontSize}px ${this.fontFamily}`;
  }

  fillBackground(ctx) {
    ctx.fillStyle = this.background;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  fillBackgroundImage(ctx, image) {
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }

  draw(ctx) {
    if (this.backgroundImage) {
      this.fillBackgroundImage(ctx, this.backgroundImage);
    } else {
      this.fillBackground(ctx);
    }
    ctx.fillStyle = this.textColor;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(
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
