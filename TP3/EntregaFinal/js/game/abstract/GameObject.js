import Game from "../Game.js";

class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background = "transparent";
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

  fillBackground() {
    Game.ctx.fillStyle = this.background;
    Game.ctx.fillRect(this.x, this.y, this.width, this.height);
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
