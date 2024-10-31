/**
 * Clase abstracta para representar una pantalla del juego
 * @abstract
 */
class BaseScreen extends GameObject {
  constructor(canvas, assets) {
    super(0, 0, canvas.width, canvas.height);

    /**
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas;

    /**
     * Assets de la pantalla
     * @type {Image[]}
     */
    this.assets = assets;

    /**
     * @type {GameObject[]}
     */
    this.children = [];
    this.backgroundColor = "green";

    this.create();

    if (new.target === BaseScreen) {
      throw new Error("No puedes instanciar BaseScreen directamente");
    }
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
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

  fillBackground(ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx
   * @param {Image} image 
   */
  fillBackgroundImage(ctx, image) {
    ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  draw(ctx) {
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
   * @abstract
   */
  create() {
    throw new Error("You have to implement the method create!");
  }
}
