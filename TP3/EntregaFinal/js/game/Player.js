import Board from "./components/Board.dev.js";
import Token from "./components/Token.js";
import GameCharacter from "./GameCharacter.js";

class Player {
  /**
   * @param {string} name - Nombre del jugador.
   */
  constructor({ name, color }) {
    /**
     * Nombre del jugador.
     * @type {string}
     */
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
    /**
     * Color del jugador.
     * @type {string}
     */
    this.color = color;
  }

  /**
   * Selecciona un personaje para el jugador.
   * @param {GameCharacter} character
   */
  setCharacter(character) {
    this.characterSelected = character;
  }

  getTokenSelected() {
    return this.characterSelected.getToken();
  }

  /**
   * Método para saber si el jugador selecciono un personaje
   * @returns {boolean} - Devuelve true si el jugador seleccionó un personaje, false si no.
   */
  hasCharacterSelected() {
    return this.characterSelected !== null;
  }

  /**
   * Crea las fichas del jugador en base al personaje seleccionado y el
   * tamaño del tablero. Las fichas deben estar apiladas una encima de la otra.
   * en un costado del tablero.
   */
  createTokens({ posX, posY }) {
    if (!this.hasCharacterSelected()) {
      console.error("No se seleccionó un personaje para el jugador");
      return;
    }

    const token = this.getTokenSelected();
    const tokenWidth = 65;
    const tokenHeight = 65;
    const tokenRadius = 32.5;
    const tokenImage = token.backgroundImage;

    // Cantidad de fichas que se pueden colocar en el tablero
    const maxTokens = 21;

    // Posición inicial de las fichas
    const startX = posX;
    const startY = posY;

    // Espaciado entre las fichas apiladas
    const spacing = token.radius / 2;

    // Crear las fichas y apilarlas
    for (let i = 0; i < maxTokens; i++) {
      const x = startX;
      const y = startY - i * spacing;
      const newToken = new Token({
        x,
        y,
        width: tokenWidth,
        height: tokenHeight,
        radius: tokenRadius,
        backgroundImage: tokenImage,
        name: this.characterSelected.name,
        player: this,
      });
      this.tokenStack.push(newToken);
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
}

export default Player;
