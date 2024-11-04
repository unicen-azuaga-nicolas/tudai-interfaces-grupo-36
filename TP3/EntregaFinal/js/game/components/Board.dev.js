import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";
import Player from "../Player.js";
import BoardHint from "./BoardHint.js";
import BoardSlot from "./BoardSlot.js";
import Token from "./Token.js";

class Board extends GameObject {
  constructor({ x, y, width, height, columns, rows, onWin }) {
    super(x, y, width, height);
    this.background = "transparent";
    this.backgroundImage = null;

    /**
     * Slots Grid
     * @type {BoardSlot[][]}
     */
    this.slots = [];

    /**
     * Array de hints, para saber en que columna se va a colocar la ficha
     * @type {BoardHint[]}
     */
    this.hints = [];
    this.columns = columns || 7;
    this.rows = rows || 6;
    this.winner = null;
    this.onWin = onWin;
    this.currentPlayer = null;
    this.background = "orange";
    this.createSlots(this.columns, this.rows);
  }

  getSlotSize() {
    return this.width / this.columns;
  }

  setColumns(columns) {
    this.columns = columns;
    this.createSlots(this.columns, this.rows);
  }

  setRows(rows) {
    this.rows = rows;
    this.createSlots(this.columns, this.rows);
  }

  /**
   * Metodo para setear el jugador actual
   * @param {Player} player
   */
  setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  /**
   * @param {number} columns
   * @param {number} rows
   */
  createSlots(columns, rows) {
    const slotWidth = this.width / columns;
    const slotHeight = this.height / rows;
    this.slots = [];
    for (let i = 0; i < columns; i++) {
      this.slots[i] = [];
      for (let j = 0; j < rows; j++) {
        this.slots[i][j] = new BoardSlot({
          x: this.x + i * slotWidth,
          y: this.y + j * slotHeight,
          width: slotWidth,
          height: slotHeight,
          column: i + 1,
          row: j + 1,
        });
      }
    }
    this.createHints(columns);
  }

  /**
   * @param {number} columns
   */
  createHints(columns) {
    const slotWidth = this.width / columns;
    for (let i = 0; i < columns; i++) {
      this.hints[i] = new BoardHint({
        x: this.x + i * slotWidth,
        y: this.y - slotWidth,
        width: slotWidth,
        height: slotWidth,
      });
    }
  }

  /**
   *
   * @param {Player} player
   * @param {number} column
   * @returns
   */
  placeToken(player, column) {
    try {
      console.log("Placing token");
      console.log("Current player is: ", player);
      console.log("Column is: ", column);
      if (this.winner !== null) {
        return false;
      }
      for (let i = this.slots[column].length - 1; i >= 0; i--) {
        const currentSlot = this.slots[column][i];
        if (currentSlot.isEmpty()) {
          console.log("Current slot is empty");
          // el metodo pop saca el token de la pila y devuelve el token
          const token = player.tokenStack.pop();
          if (token) {
            currentSlot.setToken(token.player);
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.log("Error placing token: ", error);
      console.log("Current player is: ", player);
      console.log("Column is: ", column);
      return false;
    }
  }

  checkWin() {
    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ];

    for (let i = 0; i < this.slots.length; i++) {
      for (let j = 0; j < this.slots[i].length; j++) {
        // omitir si el slot esta vacio
        if (this.slots[i][j].token === null) continue;

        for (let k = 0; k < directions.length; k++) {
          const direction = directions[k];
          const win = this.checkDirection(
            i,
            j,
            direction.x,
            direction.y,
            this.slots[i][j].token.player
          );
          if (win) {
            this.winner = this.slots[i][j].token.player;
            return;
          }
        }
      }
    }
  }

  checkDirection(x, y, dx, dy, player) {
    let count = 1;
    let i = 1;
    while (true) {
      const newX = x + dx * i;
      const newY = y + dy * i;
      if (
        newX < 0 ||
        newX >= this.slots.length ||
        newY < 0 ||
        newY >= this.slots[x].length
      ) {
        break;
      }
      if (this.slots[newX][newY].token === null) {
        break;
      }
      if (this.slots[newX][newY].token.player === player) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        break;
      }
      i++;
    }
    return false;
  }

  drawHints() {
    for (let i = 0; i < this.hints.length; i++) {
      this.hints[i].draw();
    }
  }

  drawSlots() {
    for (let i = 0; i < this.slots.length; i++) {
      for (let j = 0; j < this.slots[i].length; j++) {
        this.slots[i][j].draw();
      }
    }
  }

  draw() {
    // this.fillBackground();
    this.drawSlots();
  }

  update(deltaTime) {
    if (this.winner !== null) {
      console.log(`Player ${this.winner.name} wins!`);
      this.onWin(this.winner);
    }
  }

  onMouseMove(x, y) {
    for (let i = 0; i < this.hints.length; i++) {
      if (this.hints[i].onMouseOver(x, y)) {
        console.log("Mouse over hint");
      }
    }
  }

  /**
   * Obtener el primer slot vacio de una columna
   * @param {number} column
   * @returns {BoardSlot}
   */
  getEmptySlot(column) {
    for (let i = this.slots[column].length - 1; i >= 0; i--) {
      if (this.slots[column][i].isEmpty()) {
        return this.slots[column][i];
      }
    }
    return null;
  }

  /**
   * Limpiar los hints
   */
  clearHints() {
    this.hints.forEach((hint) => {
      hint.clear();
    });
  }

  /**
   * Método que determina si el token esta en la posición exacta para ser colocado en el tablero
   * devuelve true si esta en la posición exacta, false si no.
   * La posición debe ser justo el centro del slot.
   * @param {Token} token
   */
  isTokenInRigthPosition(token, column) {
    // debe estar en el centro del hint
    const hint = this.hints[column];
    const x = hint.x + hint.width / 2;
    const y = hint.y + hint.height / 2;
    const distance = Math.hypot(token.x - x, token.y - y);
    return distance < 10;
  }
}

export default Board;
