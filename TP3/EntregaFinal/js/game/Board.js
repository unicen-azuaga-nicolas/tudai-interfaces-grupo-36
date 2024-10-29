class Board extends GameElement {
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
    const boardWidth = this.cols * cellSize;
    const boardHeight = this.rows * cellSize;
  
    // Calcular las coordenadas de inicio para centrar el tablero
    const startX = (this.canvas.width - boardWidth) / 2;
    const startY = this.canvas.height - boardHeight;
  
    // Dibujar el fondo del tablero
    ctx.fillStyle = "#3498db"; // Color del tablero
    ctx.fillRect(startX, startY, boardWidth, boardHeight);
  
    // Dibujar las fichas en el tablero
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const cx = startX + y * cellSize + cellSize / 2;
        const cy = startY + x * cellSize + cellSize / 2;
  
        // Dibujar las fichas si existen
        if (this.board[x][y] !== null) {
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = this.board[x][y]; // Color de la ficha (rojo o amarillo)
          ctx.fill();
        } else {
          // Dibujar la celda vacía
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = "white"; // Color de la celda vacía
          ctx.fill();
        }
      }
    }
  }
}
