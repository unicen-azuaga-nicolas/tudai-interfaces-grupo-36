import Board from "../components/Board.dev.js";
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
      } else if (obj.onMouseLeave) {
        obj.onMouseLeave();
      }
    });
  }

  handleMouseMove(event) {
    const { x, y } = this.getMousePos(event);

    this.game.currentScreen.children.forEach((obj) => {
      if (obj instanceof Token && obj.isDragging) {
        this.handleMouseOver(event);
        console.log("dragging");
        obj.drag(x, y);
      }
    });
  }

  handleMouseDown(event) {
    const { x, y } = this.getMousePos(event);
    this.game.currentScreen.children.forEach((obj) => {
      if (obj.isClicked(x, y) && obj.startDragging && obj instanceof Token) {
        if (obj.player !== this.game.turnManager.getCurrentPlayer()) return;
        obj.startDragging(x, y);
      }
    });
  }

  handleMouseUp(event) {
    const { x, y } = this.getMousePos(event);
    this.game.currentScreen.children.forEach((obj) => {
      if (obj instanceof Token && obj.isDragging) {
        console.log("drop");
        obj.isDragging = false; // Detener el arrastre de la ficha
        console.log(
          `Turno de ${this.game.turnManager.getCurrentPlayer().name}`
        );
        const column = this.game.turnManager
          .getCurrentPlayer()
          .getColumnFromClick(x, this.game.board);

        console.log("Columna seleccionada: ", column);

        if (
          column !== -1 &&
          this.game.board.isTokenInRigthPosition(obj, column)
        ) {
          // dejar caer la ficha en la columna seleccionada
          const emptySlot = this.game.board.getEmptySlot(column);
          const { x: emptySlotX, y: emptySlotY } = emptySlot;
          obj.drop(
            emptySlotX + emptySlot.width / 2 - obj.width / 2,
            emptySlotY + emptySlot.height / 2
          );
          const placed = this.game.turnManager
            .getCurrentPlayer()
            .placeToken(column, this.game.board);
          if (placed) {
            console.log("Token placed in column with animation");
            this.game.board.clearHints();
            this.game.turnManager.nextTurn();
            setTimeout(() => {
              this.game.board.checkWinner();
            }, 500);
          } else {
            // Si la columna está llena, animar el regreso al tokenStack
            obj.returnToStack();
            this.game.turnoActual.tokenStack.push(obj);
            console.log("Token returned to stack with animation");
          }
        } else {
          // Si no se coloca en una columna válida, animar el regreso al tokenStack
          obj.returnToStack();
          this.game.turnManager.getCurrentPlayer().tokenStack.push(obj);
          console.log("Token returned to stack with animation");
        }
      }
    });

    if (this.game.board) {
      console.log("Board State:");
      /**
       * [0, 0, 0, 0, 0, 0, 0],
       * [0, 0, 0, 0, 0, 0, 0],
       * [0, 0, 0, 0, 0, 0, 0],
       * [0, 0, 0, 0, 0, 0, 0],
       * [0, 0, 0, 0, 0, 0, 0],
       * [0, 0, 0, 0, 0, 0, 0],
       */
      console.log(
        this.game.board.slots.map((column) =>
          column.map((slot) => (slot.isEmpty() ? 0 : slot.token))
        )
      );
    }
  }
}

export default EventHandler;
