import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";
import Player from "../Player.js";
import BoardHint from "./BoardHint.js";
import BoardSlot from "./BoardSlot.js";

class Board extends GameObject {
  constructor({ x, y, width, height, columns, rows, onWin }) {
    super(x, y, width, height);
    this.background = "transparent";
    this.backgroundImage = null;
    /**
     * @type {BoardSlot[]}
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
    for (let i = 0; i < columns; i++) {
      this.slots[i] = [];
      for (let j = 0; j < rows; j++) {
        this.slots[i][j] = new BoardSlot(
          this.x + i * slotWidth,
          this.y + j * slotHeight,
          slotWidth,
          slotHeight
        );
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

  placeToken(player, column) {
    if (column < 0 || column >= this.slots.length) return false;

    for (let row = this.slots[column].length - 1; row >= 0; row--) {
      if (this.slots[column][row].isEmpty()) {
        this.slots[column][row].setToken(player);
        return true;
      }
    }
    return false;
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
    // this.drawHints();
    this.drawSlots();
  }

  update(deltaTime) {
    if (this.winner !== null) {
      console.log(`Player ${this.winner.name} wins!`);
      this.onWin(this.winner);
    }
  }
}

export default Board;
