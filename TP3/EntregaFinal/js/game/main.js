document.addEventListener("DOMContentLoaded", () => {
  const gamePortrait = document.querySelector(".game-portrait");
  const enterToTheGameBtn = document.getElementById("enterToTheGameBtn");
  const canvas = document.getElementById("gameCanvas");
  const game = new Game("gameCanvas");
  
  enterToTheGameBtn.addEventListener("click", () => {
      console.log("Se ingresó al juego");
      gamePortrait.style.display = "none";
      enterToTheGameBtn.style.display = "none";
      canvas.style.display = "block";
      game.showMenu();
    });
});
