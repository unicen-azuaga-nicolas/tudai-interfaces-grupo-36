import Game from "../Game.js";

class GameObject {
  constructor(
    x,
    y,
    width,
    height,
    background,
    backgroundWidth,
    backgroundHeight,
    backgroundPosition,
    backgroundImage
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background = background || "transparent";
    this.backgroundWidth = backgroundWidth || this.width;
    this.backgroundHeight = backgroundHeight || this.height;
    this.backgroundPosition = backgroundPosition || { x: this.x, y: this.y };
    this.backgroundImage = null;
    if (new.target === GameObject) {
      throw new Error("No puedes instanciar GameObject directamente");
    }
  }

  draw() {
    // Método para dibujar el objeto, debe ser implementado por las subclases
  }

  update(deltaTime) {
    // Método para actualizar el estado del objeto, debe ser implementado por las subclases
  }

  isClicked(x, y) {}

  isMouseOver(x, y) {
    this.isClicked(x, y);
  }

  /**
   * Dado un porcentaje y un valor, devuelve el valor correspondiente al porcentaje
   */
  static percentOf(value, percent) {
    return value * (percent / 100);
  }

  fillBackground({
    x = this.backgroundPosition.x,
    y = this.backgroundPosition.y,
    width = this.backgroundWidth,
    height = this.backgroundHeight,
  } = {}) {
    Game.ctx.fillStyle = this.background;
    Game.ctx.fillRect(x, y, width, height);
  }

  fillBackgroundImage(image) {
    Game.ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }
}

export default GameObject;
