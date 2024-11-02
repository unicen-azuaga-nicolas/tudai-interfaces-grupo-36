import Board from "./components/Board.js";
import Token from "./components/Token.js";
import GameCharacter from "./GameCharacter.js";

class Player {
  /**
   * @param {string} name - Nombre del jugador.
   */
  constructor(name) {
    this.name = name;
    /**
     * Personaje seleccionado por el jugador.
     * @type {GameCharacter}
     */
    this.characterSelected = null;
    /**
     * Fichas del jugador.
     * @type {Token[]}
     */
    this.tokenStack = [];
  }

  /**
   * Selecciona un personaje para el jugador.
   * @param {GameCharacter} character
   */
  setCharacter(character) {
    this.characterSelected = character;
  }

  getToken() {
    return this.characterSelected.getToken();
  }

  // Método para llenar el stack de fichas basado en el tamaño del tablero
  fillTokenStack(columns, rows) {
    const numberOfTokens = Math.ceil((columns * rows) / 2);
    const token = this.characterSelected.getToken();
    for (let i = 0; i < numberOfTokens; i++) {
      this.tokenStack.push(
        new Token({
          x: 0 + i * token.width,
          y: 0 + i * token.height,
          width: token.width,
          height: token.height,
          img: token.backgroundImage,
        })
      );
    }
  }

  /**
   * Calcula la columna donde el jugador hizo clic, basándose en la posición del mouse y el tablero.
   * @param {number} mouseX - Posición X del clic del mouse en el canvas.
   * @param {Board} board - Instancia de la clase Board.
   * @returns {number} - Índice de la columna seleccionada.
   */
  getColumnFromClick(mouseX, board) {
    const cellSize = 80;
    const boardWidth = board.cols * cellSize;

    // Calcular la posición X de inicio del tablero para centrarlo en el canvas
    const startX = (board.canvas.width - boardWidth) / 2;
    const adjustedMouseX = mouseX - startX;

    // Si el clic está fuera del tablero, devolver -1
    if (adjustedMouseX < 0 || adjustedMouseX > boardWidth) {
      return -1;
    }

    // Calcular y devolver la columna en la que se hizo clic
    return Math.floor(adjustedMouseX / cellSize);
  }

  /**
   * Coloca la ficha del jugador en la primera posición vacía de la columna seleccionada.
   * @param {number} column - Índice de la columna donde se colocará la ficha.
   * @param {Board} board - Instancia de la clase Board.
   * @returns {boolean} - Devuelve true si la ficha se colocó con éxito, false si la columna está llena.
   */
  placeToken(column, board) {
    if (column < 0 || column >= board.cols) return false; // Verificar que la columna es válida

    // Buscar la primera fila vacía en la columna, desde abajo hacia arriba
    for (let row = board.rows - 1; row >= 0; row--) {
      if (board.board[row][column] === null) {
        board.board[row][column] = this.name; // Colocar la ficha del jugador
        console.log(
          `Ficha colocada en columna ${column} por el jugador ${this.name}`
        );
        return true;
      }
    }
    return false; // Si la columna está llena, no se coloca la ficha
  }

  drawTokens() {
    this.tokenStack.forEach((token) => token.draw());
  }
}

export default Player;
