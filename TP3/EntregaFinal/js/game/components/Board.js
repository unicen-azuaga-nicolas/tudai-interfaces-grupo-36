class Board extends GameObject {
  /**
   * @param {Object} param
   * @param {number} param.x
   * @param {number} param.y
   * @param {number} param.width
   * @param {number} param.height
   * @param {number} param.rows
   * @param {number} param.cols
   */
  constructor({ x, y, width, height, cols, rows }) {
    super(x, y, width, height);
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid({ rows, cols });
  }

  createGrid({ rows, cols }) {
    const grid = [];
    for (let x = 0; x < rows; x++) {
      grid[x] = [];
      for (let y = 0; y < cols; y++) {
        grid[x][y] = null;
      }
    }
    return grid;
  }

  /**
   * Draws the board and its pieces on the given context.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const CELL_SIZE = 80;
    const RADIUS = CELL_SIZE / 2 - 5;

    const boardWidth = this.cols * CELL_SIZE;
    const boardHeight = this.rows * CELL_SIZE;

    ctx.fillStyle = "#3498db";
    ctx.fillRect(this.x, this.y, boardWidth, boardHeight);

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const cx = this.x + y * CELL_SIZE + CELL_SIZE / 2;
        const cy = this.y + x * CELL_SIZE + CELL_SIZE / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, RADIUS, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.grid[x][y] !== null ? this.grid[x][y] : "white";
        ctx.fill();
      }
    }
  }

  /**
   * Updates the board state.
   * @param {number} deltaTime
   */
  update(deltaTime) {
    // No-op
  }

  /**
   * El método isClicked de la clase Board siempre retorna false
   * ya que no se espera que el tablero sea clickeable.
   * @param {number} x
   * @param {number} y
   */
  isClicked(x, y) {
    return false;
  }

  isMouseOver(x, y) {
    return false;
  }
}
