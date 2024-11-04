import GameObject from "../abstract/GameObject.js";

class BoardHint extends GameObject {
  constructor({ x, y, width, height }) {
    super(x, y, width, height);
    this.background = "transparent";
    this.backgroundImage = null;
  }

  isClicked(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  isMouseOver(x, y) {
    return this.isClicked(x, y);
  }

  onMouseOver() {
    this.background = "rgba(0, 0, 0, 0.1)";
  }

  onMouseLeave() {
    this.background = "transparent";
  }

  clear() {
    this.background = "transparent";
  }

  draw() {
    this.fillBackground();
  }
}

export default BoardHint;
