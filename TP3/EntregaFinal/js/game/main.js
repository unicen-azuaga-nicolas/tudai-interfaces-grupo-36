"use strict";

import Game from "./Game.js";

document.addEventListener("DOMContentLoaded", () => {
  const gamePortrait = document.querySelector(".game-portrait");
  const enterToTheGameBtn = document.getElementById("enterToTheGameBtn");
  const canvas = document.getElementById("gameCanvas");

  const ASSETS_BASE_URL = "../js/game/assets/";

  const MENU_SCREEN_BACKGROUND_URL = `${ASSETS_BASE_URL}menu/fondo.jpg`;
  const BUTTON_NORMAL_URL = `${ASSETS_BASE_URL}menu/btn-normal.png`;
  const BUTTON_DESACTIVADO_URL = `${ASSETS_BASE_URL}menu/btn-desactivado.png`;
  const GAMEMODE_BACKGROUND_URL = `${ASSETS_BASE_URL}/FondoNiveles2.png`;
  const PLAYERSELECT_URL = `${ASSETS_BASE_URL}/eligepersonaje2.png`;
  const PIKACHU_URL = `${ASSETS_BASE_URL}/pikachu.png`;
  const CHARMANDER_URL = `${ASSETS_BASE_URL}/charmander.png`;
  const BULBASAUR_URL = `${ASSETS_BASE_URL}/bulbasaur.png`;
  const SNORLAX_URL = `${ASSETS_BASE_URL}/snorlax.png`;
  const CASILLERO_URL = `${ASSETS_BASE_URL}/casillero.png`;
  const GAMEMODE_BUTTON_URL = `${ASSETS_BASE_URL}/buttonreiniciar.png`;
  const GAMEMODE_POKEBOLA_URL = `${ASSETS_BASE_URL}/pokebola.png`;
  const GAMEMODE_CONTAINER_TEXT = `${ASSETS_BASE_URL}/marcotituloniveles.png`;
  const GAMEMODE_ICONO = `${ASSETS_BASE_URL}/iconoSalir.png`;

  const assets = [
    MENU_SCREEN_BACKGROUND_URL,
    BUTTON_NORMAL_URL,
    GAMEMODE_BACKGROUND_URL,
    PLAYERSELECT_URL,
    BUTTON_DESACTIVADO_URL,
    PIKACHU_URL,
    CHARMANDER_URL,
    BULBASAUR_URL,
    SNORLAX_URL,
    CASILLERO_URL,
    GAMEMODE_BUTTON_URL,
    GAMEMODE_POKEBOLA_URL,
    GAMEMODE_CONTAINER_TEXT,
    GAMEMODE_ICONO
    
  ];

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
