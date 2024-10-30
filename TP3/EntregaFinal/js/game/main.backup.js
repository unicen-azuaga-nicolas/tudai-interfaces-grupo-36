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

  let board;
  let player1;
  let player2;
  let currentPlayer;
  let mode = MODES.READY;

  // Contexto de canvas
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  playGameButton.addEventListener("click", startGame);

  function startGame() {
    mode = MODES.PLAYING;
    canvas.classList.remove("display-none");
    playGameButton.classList.add("display-none");
    gamePortrait.classList.add("display-none");

    // Crear e inicializar el tablero usando la clase `Board`
    board = new Board({ rows: 6, cols: 7, canvas });
    board.draw(ctx);

    // Crear e inicializar los jugadores usando la clase `Player`
    player1 = new Player("red");
    player2 = new Player("yellow");
    
    // Establecer el jugador actual (comienza el jugador 1)
    currentPlayer = player1;

    // Añadir el evento de clic en el canvas
    canvas.addEventListener("click", handleCanvasClick);
  }

  function handleCanvasClick(event) {
    if (mode !== MODES.PLAYING) return;

    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const column = currentPlayer.getColumnFromClick(mouseX, board);

    if (column !== -1 && currentPlayer.placeToken(column, board)) {
      // Dibujar el tablero con la nueva ficha
      board.draw(ctx);

      // Cambiar al siguiente jugador
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
  }
});
