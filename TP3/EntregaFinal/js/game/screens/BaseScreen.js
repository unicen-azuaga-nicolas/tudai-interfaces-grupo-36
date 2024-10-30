class BaseScreen extends GameObject {
  constructor(canvas, backgroundColor = "black") {
    super(0, 0, canvas.width, canvas.height);

    /**
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas;
    /**
     * @type {GameObject[]}
     */
    this.children = [];
    this.backgroundColor = backgroundColor;

    this.create(new ScreenBuilder(this));

    if (new.target === BaseScreen) {
      throw new Error("No puedes instanciar BaseScreen directamente");
    }
  }

  setBackgroundColor(color) {
    this.background = color;
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.children.forEach((child) => child.draw(ctx));
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));
  }

  isClicked(x, y) {
    return this.children.some((child) => child.isClicked(x, y));
  }

  isMouseOver(x, y) {
    return this.children.some((child) => child.isMouseOver(x, y));
  }

  /**
   * Método para crear los elementos de la pantalla
   * @param {ScreenBuilder} builder
   */
  create(builder) {
    throw new Error("You have to implement the method create!");
  }
}
