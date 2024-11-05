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
    GAMEMODE_ICONO,
    CHARACTER_PIKACHU_URL,
    CHARACTER_CHARMANDER_URL,
    CHARACTER_BULBASAUR_URL,
    CHARACTER_SNORLAX_URL,
    GAMEMODE_BUTTON_RESTART_URL,
    TEMPORIZADOR_URL,
    RESTARTICON_URL,
    PIKACHUBTN_URL,
    CHARMANDERBTN_URL,
    BULBASAURBTN_URL,
    SNORLAXBTN_URL,
    
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
