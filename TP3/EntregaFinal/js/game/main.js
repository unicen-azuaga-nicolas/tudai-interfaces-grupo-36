document.addEventListener("DOMContentLoaded", () => {
  const gamePortrait = document.querySelector(".game-portrait");
  const enterToTheGameBtn = document.getElementById("enterToTheGameBtn");
  const canvas = document.getElementById("gameCanvas");

  const ASSETS_BASE_URL = "../js/game/assets/";

  const MENU_SCREEN_BACKGROUND_URL = `${ASSETS_BASE_URL}menu/fondo.jpg`;
  const BUTTON_NORMAL_URL = `${ASSETS_BASE_URL}menu/btn-normal.png`;
  const GAMEMODE_BACKGROUND_URL = `${ASSETS_BASE_URL}/FondoNivelesSINNADA.png`;
  const PLAYERSELECT_URL = `${ASSETS_BASE_URL}/eligepersonaje2.png`;

  const assets = [MENU_SCREEN_BACKGROUND_URL, BUTTON_NORMAL_URL, GAMEMODE_BACKGROUND_URL, PLAYERSELECT_URL];

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }

  async function loadAssets(assets) {
    const promises = assets.map((src) => loadImage(src));
    return Promise.all(promises);
  }

  enterToTheGameBtn.addEventListener("click", () => {
    console.log("Se ingresó al juego");
    gamePortrait.style.display = "none";
    enterToTheGameBtn.style.display = "none";
    canvas.style.display = "block";
    // game.showMenu();

    loadAssets(assets).then((assets) => {
      const game = new Game("gameCanvas", assets);
      game.showMenu();
    });
  });
});
