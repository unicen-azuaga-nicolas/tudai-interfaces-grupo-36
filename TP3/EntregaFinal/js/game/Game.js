"use strict";

import BaseScreen from "./abstract/BaseScreen.js";
import Board from "./components/Board.dev.js";
import Player from "./Player.js";
import CharacterSelectScreen from "./screens/CharacterSelectScreen.js";
import GameModeScreen from "./screens/GameModeScreen.js";
import GameScreen from "./screens/GameScreen.js";
import MainMenuScreen from "./screens/MainMenuScreen.js";
import TurnManager from "./TurnManager.js";
import CanvasUtils from "./utils/CanvasUtils.js";
import EventHandler from "./utils/EventHandler.js";

class Game {
  /**
   * @type {HTMLCanvasElement}
   */
  static canvas = null;
  /**
   * @type {CanvasRenderingContext2D}
   */
  static ctx = null;

  /**
   * Assets del juego
   * @type {Image[]}
   */
  static assets = [];

  /**
   * Constructor de la clase Game
   */
  constructor(canvasId, assets) {
    Game.canvas = document.getElementById(canvasId);
    Game.ctx = Game.canvas.getContext("2d");
    Game.assets = assets;

    /**
     * @typedef {Object} GameStates
     * @property {string} MENU - Estado del menú
     * @property {string} PLAYING - Estado de jugando
     * @property {string} PAUSED - Estado de pausado
     */
    /**
     * Estados del juego
     * @readonly
     * @type {GameStates}
     */
    this.states = {
      MENU: "menu",
      GAAMEMODE: "gamemode",
      PLAYERSELECT: "playerselect",
      PLAYING: "playing",
      PAUSED: "paused",
      // Agregar más estados si es necesario
    };
    /**
     * Estado actual del juego
     * @type {string}
     */
    this.currentGameState = this.states.MENU;
    /**
     * Patrón composite: la pantalla actual puede contener otros game objects.
     * @type {BaseScreen}
     */
    this.currentScreen = null;
    /**
     * Manejador de eventos, se encarga de manejar los eventos del canvas.
     * @type {EventHandler}
     */
    this.eventHandler = new EventHandler(Game.canvas, this);
    /**
     * Último tiempo de ejecución del juego.
     * @type {number}
     */
    this.lastTime = 0;

    this.boardSize = null; // Inicializamos la propiedad boardSize
    this.selectedPlayers = []; // Propiedad para almacenar los personajes seleccionados

    // Jugador 1 y 2
    this.player1 = new Player({ name: "1", color: "blue" });
    this.player2 = new Player({ name: "2", color: "orange" });

    // Board
    /**
     * @type {Board}
     */
    this.board = null;

    this.modosDeJuegos = [
      {
        nombre: 4,
        columnas: 7,
        filas: 6,
        tamanioCasillero: 100,
      },
      {
        nombre: 5,
        columnas: 8,
        filas: 7,
        tamanioCasillero: 90,
      },
      {
        nombre: 6,
        columnas: 9,
        filas: 8,
        tamanioCasillero: 80,
      },
      {
        nombre: 7,
        columnas: 10,
        filas: 9,
        tamanioCasillero: 70,
      },
    ];
  }

  clearCanvas() {
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
  }

  drawScreen(screen) {
    this.currentScreen = screen;
    this.currentScreen.draw();
  }

  /**
   * Función para setear la configuración inicial del juego.
   */
  initGame() {
    // Configuración del tablero
    let col = this.modosDeJuegos[this.boardSize].columnas; // Número de columnas
    let fil = this.modosDeJuegos[this.boardSize].filas; // Número de filas
    let tamanioCasillero = this.modosDeJuegos[this.boardSize].tamanioCasillero; // Tamaño de cada casilla
    

    this.board = new Board({
      columns: col,
      rows: fil,
      x: CanvasUtils.setRelativeX(50) - tamanioCasillero * col * 0.5,
      y: CanvasUtils.setRelativeY(50) - tamanioCasillero * fil * 0.5,
      width: tamanioCasillero * col,
      height: tamanioCasillero * fil,
      onWin: (player) => {
        // this.currentGameState = this.states.PAUSED;
        // this.currentScreen = new BaseScreen();
        // console.log("Ganó el jugador: ", player.name);
        // alert("Ganó el jugador: " + player.name);
        console.log("Ganó el jugador: ", player.name);
      },
    });

    const pisoY = Game.canvas.height - tamanioCasillero;

    this.player1.tokenStack = [];
    this.player2.tokenStack = [];

    // Configuración de los jugadores
    this.player1.createTokens({
      posX: CanvasUtils.setRelativeX(10),
      posY: pisoY,
    });
    this.player2.createTokens({
      posX: CanvasUtils.setRelativeX(90),
      posY: pisoY,
    });
  }

  startGame() {
    console.log("Start Game Clicked");
    this.currentGameState = this.states.PLAYING;

    this.initGame();

    this.currentScreen = new GameScreen({
      player1: this.player1,
      player2: this.player2,
      onExitGame: () => this.showMenu(),
      onRestartGame: () => this.startGame(),
      board: this.board,
    });

    this.turnoActual = this.player1; // Inicializar con el primer jugador
    this.player1.unlockLastToken();
    this.cambiarTurno();
    this.lastTime = 0;
    this.gameLoop(0);
  }

  showMenu() {
    this.currentGameState = this.states.MENU;
    console.log("Show Menu");
    const onExitGame = () => console.log("Exit Game Clicked");
    const onStartGame = () => this.gameMode();

    const menu = new MainMenuScreen({
      onExitGame,
      onStartGame,
    });
    this.currentScreen = menu;
    this.render();
  }
  gameMode() {
    this.currentGameState = this.states.GAMEMODE;
    console.log("Game mode screen");
    const gamemode = new GameModeScreen({
      onExitGame: () => console.log("Exit Game Clicked"),
      onStartGame: (boardSize) => {
        this.boardSize = boardSize; // Asignamos boardSize
        this.characterSelect();
        console.log(boardSize);
      },
    });
    this.currentScreen = gamemode;
    this.render();
  }

  characterSelect() {
    this.currentGameState = this.states.PLAYERSELECT;
    console.log("character select screen");
    const playerselect = new CharacterSelectScreen({
      player1: this.player1,
      player2: this.player2,
      onExitGame: () => console.log("Exit Game Clicked"),
      onConfirmSelection: () => {
        console.log("Confirm Selection Clicked");

        console.log(
          "Jugador 1 eligio: ",
          this.player1.characterSelected.getName()
        );
        console.log(
          "Jugador 2 eligio: ",
          this.player2.characterSelected.getName()
        );
        this.startGame();
      },
    });
    this.currentScreen = playerselect;
    this.render();
  }

    placeToken(column) {
      if (this.currentGameState !== this.states.PLAYING) return;
  
      let currentPlayer = this.turnoActual;
      let board = this.currentScreen.tablero;
  
      // Intentar colocar la ficha del jugador actual en la columna seleccionada
      if (currentPlayer.placeToken(column, board)) {
        // Cambiar turno si la ficha se coloca correctamente
        this.cambiarTurno();
      }
    }
  
    cambiarTurno() {
      if (this.turnoActual === this.player1) {
        this.player1.lockAllTokens();
        this.turnoActual = this.player2;
        this.player2.unlockLastToken();
      } else {
        this.player2.lockAllTokens();
        this.turnoActual = this.player1;
        this.player1.unlockLastToken();
      }
      console.log(`Turno de: ${this.turnoActual.name}`);
    }
  
    
  gameLoop(timestamp) {
    if (this.currentGameState !== this.states.PLAYING) return;
    // console.log("Game Loop");
    const deltaTime = (timestamp - this.lastTime) / 1000; // Convertir a segundos
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  update(deltaTime) {
    this.currentScreen.update(deltaTime);
  }

  render() {
    this.clearCanvas();
    this.drawScreen(this.currentScreen);
  }
}

export default Game;
