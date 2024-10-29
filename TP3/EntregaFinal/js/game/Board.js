// clase para crear tablero 4 en linea, el mismo es un refactor del archivo main.js

class Board extends GameElement{
  /**
   * @param {Object} param0
   * @param {number} param0.rows
   * @param {number} param0.cols
   */
  constructor({ rows, cols, canvas }) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.board = this.createBoard();
    this.canvas = canvas;
  }

  createBoard() {
    const board = [];
    for (let x = 0; x < this.rows; x++) {
      board[x] = [];
      for (let y = 0; y < this.cols; y++) {
        board[x][y] = null;
      }
    }
    return board;
  }

  draw(ctx) {
    const cellSize = 80;
    const radius = cellSize / 2 - 5;
    // Calcular el tamaño total del tablero
    const boardWidth = this.board[0].length * cellSize;
    const boardHeight = this.board.length * cellSize;

    // Calcular las coordenadas de inicio para centrar el tablero
    const startX = (this.canvas.width - boardWidth) / 2;
    const startY = this.canvas.height - boardHeight;

    ctx.fillStyle = "#3498db";
    ctx.fillRect(startX, startY, boardWidth, boardHeight);
    // Dibujar el tablero
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        const cx = startX + y * cellSize + cellSize / 2;
        const cy = startY + x * cellSize + cellSize / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  }
}
