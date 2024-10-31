class GameObject {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (new.target === GameObject) {
      throw new Error("No puedes instanciar GameObject directamente");
    }
  }

  /**
   * Dibuja el objeto en el canvas
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Método para dibujar el objeto, debe ser implementado por las subclases
  }

  update(deltaTime) {
    // Método para actualizar el estado del objeto, debe ser implementado por las subclases
  }

  isClicked(x, y) {}

  isMouseOver(x, y) {
    this.isClicked(x, y);
  }
}