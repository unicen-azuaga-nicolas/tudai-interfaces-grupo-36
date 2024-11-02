import Game from "../Game.js";

class EventHandler {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Game} game
   */
  constructor(canvas, game) {
    /**
     * @type {HTMLCanvasElement}
     */
    Game.canvas = canvas;
    /**
     * @type {Game}
     */
    this.game = game;
    this.initEventListeners();
  }

  initEventListeners() {
    Game.canvas.addEventListener("click", (event) =>
      this.handleMouseClick(event)
    );
    Game.canvas.addEventListener("mousemove", (event) =>
      this.handleMouseOver(event)
    );
    // Agregar más eventos si es necesario
  }

  getMousePos(event) {
    const rect = Game.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  handleMouseClick(event) {
    const { x, y } = this.getMousePos(event);
    console.log(`Mouse clicked at: ${x}, ${y}`);

    this.game.currentScreen.children.forEach((obj) => {
      if (obj.isClicked(x, y) && obj.onClick) {
        console.log("Entro al IF de isClicked");
        obj.onClick();
      }
    });
  }

  handleMouseOver(event) {
    const { x, y } = this.getMousePos(event);
    this.game.currentScreen.children.forEach((obj) => {
      if (obj.isMouseOver(x, y) && obj.onMouseOver) {
        obj.onMouseOver();
      }
    });
  }
}

export default EventHandler;
