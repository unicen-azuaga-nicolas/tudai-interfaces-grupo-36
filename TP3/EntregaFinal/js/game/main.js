document.addEventListener("DOMContentLoaded", () => {
  const gamePortrait = document.querySelector(".game-portrait");
  const playGameButton = document.getElementById("playGameBtn");
  const canvas = document.getElementById("gameCanvas");
  const game = new Game("gameCanvas");

  playGameButton.addEventListener("click", () => {
    gamePortrait.style.display = "none";
    playGameButton.style.display = "none";
    canvas.style.display = "block";
    game.showMenu();
  });
});
