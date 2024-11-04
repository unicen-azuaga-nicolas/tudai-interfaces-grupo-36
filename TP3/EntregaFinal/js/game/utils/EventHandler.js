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

  handleMouseMove(event) {
    const { x, y } = this.getMousePos(event);

    this.game.currentScreen.children.forEach((obj) => {
      if (obj instanceof Token && obj.isDragging) {
        console.log("dragging");
        obj.drag(x, y);
      }
    });
  }

  handleMouseDown(event) {
    const { x, y } = this.getMousePos(event);
    this.game.currentScreen.children.forEach((obj) => {
      if (obj instanceof Token && !obj.isInBoard && !obj.isLocked && obj.isClicked(x, y) && obj.startDragging) {
        const token = this.game.turnoActual.tokenStack.pop();
        if (token) {
          token.setPlayer(this.game.turnoActual); // Asociar el token con el jugador actual
          token.x = x;
          token.y = y;
          token.startDragging(x, y);
          console.log(`Token picked up from stack`);
        }
      }
    });
  }
  
  
  handleMouseUp(event) {
    const { x, y } = this.getMousePos(event);
    this.game.currentScreen.children.forEach((obj) => {
      if (obj instanceof Token && obj.isDragging) {
        console.log("drop");
        obj.isDragging = false; // Detener el arrastre de la ficha
  
        const column = this.game.turnoActual.getColumnFromClick(x, this.game.currentScreen.tablero);
  
        if (column !== -1) {
          // Coordenadas para la caída de la ficha
          const targetX = Game.canvas.width / 2 - (this.game.currentScreen.tablero.tamanioCasillero * this.game.currentScreen.tablero.col) / 2 + column * obj.radius * 2 + obj.radius;
          const targetY = Game.canvas.height - obj.radius * 2;
          obj.drop(targetX, targetY); // Caída de la ficha
  
          this.game.currentScreen.tablero.insertarFicha(column, obj); // Usar directamente la ficha arrastrada
          obj.lock(); // Bloquear la ficha para evitar que se mueva nuevamente
          console.log(`Token dropped at column ${column}`);
          this.game.cambiarTurno(); // Cambiar el turno después de colocar la ficha
        } else {
          // Si no se coloca en una columna válida, animar el regreso al tokenStack
          obj.returnToStack();
          this.game.turnoActual.tokenStack.push(obj);
          console.log("Token returned to stack with animation");
        }
      }
    });
  }
  
  
  
  
}

export default EventHandler;
