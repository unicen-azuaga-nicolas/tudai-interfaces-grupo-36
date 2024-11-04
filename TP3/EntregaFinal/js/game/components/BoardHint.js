import GameObject from "../abstract/GameObject.js";

class BoardHint extends GameObject {
  constructor({ x, y, width, height }) {
    super(x, y, width, height);
    this.background = "red";
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

  onMouseOver(x, y) {
    console.log("Paso por el hint");
    this.background = "rgba(0, 0, 0, 0.1)";
    return this.isClicked(x, y);
  }

  draw() {
    this.fillBackground();
  }
}

export default BoardHint;
