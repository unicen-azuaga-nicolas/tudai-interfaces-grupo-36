/**
 * Cuatro en línea
 */

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const gamePortrait = document.querySelector(".game-portrait");
  const playGameButton = document.getElementById("playGameBtn");

  const MODES = {
    READY: "ready",
    PLAYING: "playing",
    GAME_OVER: "game-over",
  };

  const PLAYERS = {
    RED: "red",
    YELLOW: "yellow",
  };

  let currentPlayer = PLAYERS.RED;
  let mode = MODES.READY;

  /**
   * @type {CanvasRenderingContext2D}
   */
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  playGameButton.addEventListener("click", startGame);

  const createBoard = ({ rows, cols }) => {
    const board = [];
    for (let x = 0; x < rows; x++) {
      board[x] = [];
      for (let y = 0; y < cols; y++) {
        board[x][y] = null;
      }
    }
    return board;
  };

  const drawBoard = (board) => {
    const cellSize = 80;
    const radius = cellSize / 2 - 5;

    // Calcular el tamaño total del tablero
    const boardWidth = board[0].length * cellSize;
    const boardHeight = board.length * cellSize;

    // Calcular las coordenadas de inicio para centrar el tablero
    const startX = (canvas.width - boardWidth) / 2;
    const startY = canvas.height - boardHeight;

    ctx.fillStyle = "#3498db";
    ctx.fillRect(startX, startY, boardWidth, boardHeight);

    // Dibujar el texto del turno actual
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(`Turno: ${currentPlayer === PLAYERS.RED? 'Jugador Rojo': 'Jugador Amarillo'}`, 20, 40);

    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const cx = startX + y * cellSize + cellSize / 2;
        const cy = startY + x * cellSize + cellSize / 2;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }

    // Dibujar contenedor de fichas jugador 1
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      0,
      canvas.height - boardHeight,
      (canvas.width - boardWidth) / 2,
      canvas.height
    );

    // Dibujar contenedor de fichas jugador 2
    ctx.fillStyle = "red";
    ctx.fillRect(
      canvas.width - (canvas.width - boardWidth) / 2,
      canvas.height - boardHeight,
      (canvas.width - boardWidth) / 2,
      canvas.height
    );
  };

  function startGame() {
    mode = MODES.PLAYING;
    canvas.classList.remove("display-none");
    playGameButton.classList.add("display-none");
    gamePortrait.classList.add("display-none");
    const board = createBoard({ cols: 7, rows: 6 });
    console.log(board);
    drawBoard(board);
  }
});
