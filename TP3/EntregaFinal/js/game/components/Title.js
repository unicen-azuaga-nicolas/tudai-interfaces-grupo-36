import Game from "../Game.js";
import GameObject from "../abstract/GameObject.js";

class Title extends GameObject {
  constructor({
    x,
    y,
    width,
    height,
    text,
    fontSize,
    fontFamily,
    color,
    bold,
  }) {
    super(x, y, width, height);
    this.text = text;
    this.fontSize = fontSize || 24;
    this.fontFamily = fontFamily || "Arial";
    this.bold = bold || false;
    this.font = `${this.bold ? "bold" : ""} ${this.fontSize}px ${
      this.fontFamily
    }`;
    this.color = color || "black";
  }

  clearTextArea(x, y, width, height) {
    Game.ctx.clearRect(x, y - height, width, height);
  }

  setText(text) {
    this.text = text;
  }

  setColor(color) {
    this.color = color;
  }

  update() {
    this.clearTextArea(this.x, this.y, this.width, this.height);
    this.draw();
  }

  draw() {
    Game.ctx.fillStyle = this.color;
    Game.ctx.font = this.font;
    Game.ctx.textAlign = "center";
    Game.ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + 8
    );
  }

  isClicked(x, y) {
    return false;
  }
}

export default Title;
