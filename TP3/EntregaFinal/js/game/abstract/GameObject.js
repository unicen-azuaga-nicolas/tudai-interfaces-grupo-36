class GameObject {
  /**
   * @type {HTMLCanvasElement}
   */
  static canvas = null;
  /**
   * @type {CanvasRenderingContext2D}
   */
  static ctx = null;

  /**
   * Assets del juego
   * @type {Image[]}
   */
  static assets = [];

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

  /**
   * Setter para el canvas
   * @param {HTMLCanvasElement} canvas
   */
  static setCanvas(canvas) {
    GameObject.canvas = canvas;
  }

  /**
   * Setter para el contexto
   * @param {CanvasRenderingContext2D} ctx
   */
  static setContext(ctx) {
    GameObject.ctx = ctx;
  }

  /**
   * Método para settear Assets
   */
  static setAssets(assets) {
    GameObject.assets = assets;
  }

  validateCanvas() {
    if (GameObject.canvas === null) {
      throw new Error("No se ha definido el canvas");
    }
  }

  validateContext() {
    if (GameObject.ctx === null) {
      throw new Error("No se ha definido el contexto del canvas");
    }
  }

  fillBackground() {
    this.validateContext();
    GameObject.ctx.fillStyle = this.background;
    GameObject.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  fillBackgroundImage(image) {
    this.validateContext();
    GameObject.ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}
