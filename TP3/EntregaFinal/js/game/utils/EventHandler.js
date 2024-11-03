import Token from "../components/Token.js";
import Game from "../Game.js";
import CanvasUtils from "./CanvasUtils.js";

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

    Game.canvas.addEventListener("mousedown", (event) => {
      this.handleMouseDown(event);
    });

    Game.canvas.addEventListener("mouseup", (event) => {
      this.handleMouseUp(event);
    });

    Game.canvas.addEventListener("mousemove", (event) => {
      this.handleMouseMove(event);
    });

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

  handleMouseDown(event) {
    const { x, y } = this.getMousePos(event);
    console.log(`Mouse down at: ${x}, ${y}`);

    this.game.currentScreen.children.forEach((obj) => {
      if (obj.isClicked && obj.isClicked(x, y) && obj.startDragging) {
        obj.startDragging(x, y);
      }
    });
  }

  handleMouseMove(event) {
    const { x, y } = this.getMousePos(event);

    this.game.currentScreen.children.forEach((obj) => {
      if (obj instanceof Token && obj.isDragging) {
        console.log("dragging");
        obj.drag(x, y);
      }
    });
  }

  handleMouseUp(event) {
    const { x, y } = this.getMousePos(event);
    this.game.currentScreen.children.forEach((obj) => {
      if (obj instanceof Token && obj.isDragging) {
        console.log("drop");
        obj.drop(CanvasUtils.setRelativeY(90));
      }
    });
  }
}

export default EventHandler;
