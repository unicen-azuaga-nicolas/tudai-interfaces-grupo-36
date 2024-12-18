"use strict";

import Game from "./Game.js";

document.addEventListener("DOMContentLoaded", () => {
  const gamePortrait = document.querySelector(".game-portrait");
  const enterToTheGameBtn = document.getElementById("enterToTheGameBtn");
  const canvas = document.getElementById("gameCanvas");

  const ASSETS_BASE_URL = "../js/game/assets/";

  const MENU_SCREEN_BACKGROUND_URL = `${ASSETS_BASE_URL}welcome.jpg`;
  const BUTTON_NORMAL_URL = `${ASSETS_BASE_URL}menu/btn-normal.png`;
  const BUTTON_DESACTIVADO_URL = `${ASSETS_BASE_URL}menu/btn-desactivado.png`;
  const GAMEMODE_BACKGROUND_URL = `${ASSETS_BASE_URL}/fondo.jpg`;
  const PLAYERSELECT_URL = `${ASSETS_BASE_URL}/eligepersonaje3.png`;
  const PIKACHU_URL = `${ASSETS_BASE_URL}/fichav21.png`;
  const CHARMANDER_URL = `${ASSETS_BASE_URL}/fichav24.png`;
  const BULBASAUR_URL = `${ASSETS_BASE_URL}/ficha23.png`;
  const SNORLAX_URL = `${ASSETS_BASE_URL}/fichav22.png`;
  const CASILLERO_URL = `${ASSETS_BASE_URL}/casillero.png`;
  const CHARACTER_PIKACHU_URL = `${ASSETS_BASE_URL}/pikachu.webp`;
  const CHARACTER_CHARMANDER_URL = `${ASSETS_BASE_URL}/charmanderc.png`;
  const CHARACTER_BULBASAUR_URL = `${ASSETS_BASE_URL}/pokemonverde.png`;
  const CHARACTER_SNORLAX_URL = `${ASSETS_BASE_URL}/snorlax.webp`;
  const GAMEMODE_BUTTON_URL = `${ASSETS_BASE_URL}/buttonreiniciar.png`;
  const GAMEMODE_POKEBOLA_URL = `${ASSETS_BASE_URL}/pokebola.png`;
  const GAMEMODE_CONTAINER_TEXT = `${ASSETS_BASE_URL}/marcotituloniveles.png`;
  const GAMEMODE_ICONO = `${ASSETS_BASE_URL}/iconoSalir.png`;
  const GAMEMODE_BUTTON_RESTART_URL = `${ASSETS_BASE_URL}/buttonsalir.png`;
  const TEMPORIZADOR_URL = `${ASSETS_BASE_URL}/temporizador.png`;
  const RESTARTICON_URL = `${ASSETS_BASE_URL}/restartIcon.png`;
  const PIKACHUBTN_URL = `${ASSETS_BASE_URL}/btnnaranjaclaroestandar.png`;
  const CHARMANDERBTN_URL = `${ASSETS_BASE_URL}/btnnaranjaestandar.png`;
  const BULBASAURBTN_URL = `${ASSETS_BASE_URL}/btnverdeestandar.png`;
  const SNORLAXBTN_URL = `${ASSETS_BASE_URL}/btncelesteestandar.png`;
  const PLAYERS_NAME_SCREEN_BG = `${ASSETS_BASE_URL}/player-name-background.jpg`;
  const RIBBON_FOR_TITLES = `${ASSETS_BASE_URL}/ribbon-for-titles.png`;
  const NAVBAR_GAME = `${ASSETS_BASE_URL}/menu/navbar-game.png`;
  const PRIMARY_BTN = `${ASSETS_BASE_URL}/ui/buttons/primary-btn.png`;
  const GAME_MODE_BG = `${ASSETS_BASE_URL}/menu/game-mode-bg.jpg`;

  const assets = [
    MENU_SCREEN_BACKGROUND_URL, // 0
    BUTTON_NORMAL_URL, // 1
    GAMEMODE_BACKGROUND_URL, // 2
    PLAYERSELECT_URL, // 3
    BUTTON_DESACTIVADO_URL, // 4
    PIKACHU_URL, // 5
    CHARMANDER_URL, // 6
    BULBASAUR_URL, // 7
    SNORLAX_URL, // 8
    CASILLERO_URL, // 9
    GAMEMODE_BUTTON_URL, // 10
    GAMEMODE_POKEBOLA_URL, // 11
    GAMEMODE_CONTAINER_TEXT, // 12
    GAMEMODE_ICONO, // 13
    CHARACTER_PIKACHU_URL, // 14
    CHARACTER_CHARMANDER_URL, // 15
    CHARACTER_BULBASAUR_URL, // 16
    CHARACTER_SNORLAX_URL, // 17
    GAMEMODE_BUTTON_RESTART_URL, // 18
    TEMPORIZADOR_URL, // 19
    RESTARTICON_URL, // 20
    PIKACHUBTN_URL, // 21
    CHARMANDERBTN_URL, // 22
    BULBASAURBTN_URL, // 23
    SNORLAXBTN_URL, // 24
    PLAYERS_NAME_SCREEN_BG, // 25
    RIBBON_FOR_TITLES, // 26
    NAVBAR_GAME, // 27,
    PRIMARY_BTN, // 28
    GAME_MODE_BG, // 29
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

    loadAssets(assets).then((assets) => {
      const game = new Game("gameCanvas", assets);
      game.characterSelect();
    });
  });
});
