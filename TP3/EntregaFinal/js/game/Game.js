class Game {
  constructor(canvasId, assets) {
    GameObject.setCanvas(document.getElementById(canvasId));
    GameObject.setContext(GameObject.canvas.getContext("2d"));
    GameObject.assets = assets;

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
    this.eventHandler = new EventHandler(GameObject.canvas, this);
    /**
     * Último tiempo de ejecución del juego.
     * @type {number}
     */
    this.lastTime = 0;

    this.boardSize = null; // Inicializamos la propiedad boardSize
    this.selectedPlayers = []; // Propiedad para almacenar los personajes seleccionados
  }

  clearCanvas() {
    GameObject.ctx.clearRect(
      0,
      0,
      GameObject.canvas.width,
      GameObject.canvas.height
    );
  }

  drawScreen(screen) {
    this.currentScreen = screen;
    this.currentScreen.draw();
  }

  startGame() {
    console.log("Start Game Clicked");
    this.currentGameState = this.states.PLAYING;
    this.currentScreen = new GameScreen({
      onExitGame: () => this.showMenu(),
    });
    // this.currentScreen.draw(this.ctx);
    this.lastTime = 0;
    this.gameLoop(0);
  }

  pauseGame() {
    this.currentGameState = this.states.PAUSED;
    //TODO: Implementar pantalla de pausa
    const pauseScreen = new BaseScreen();
    this.drawScreen(pauseScreen);
  }

  resumeGame() {
    this.currentGameState = this.states.PLAYING;
    this.lastTime = 0;
    this.gameLoop(0);
  }

  showMenu() {
    this.currentGameState = this.states.MENU;
    console.log("Show Menu");
    const menu = new MainMenuScreen({
      onExitGame: () => console.log("Exit Game Clicked"),
      onStartGame: () => this.gameMode(),
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
        this.playerSelect();
        console.log(boardSize);
      },
    });
    this.currentScreen = gamemode;
    this.render();
  }
  playerSelect() {
    this.currentGameState = this.states.PLAYERSELECT;
    console.log("player select screen");
    const playerselect = new PlayerSelectScreen({
      onExitGame: () => console.log("Exit Game Clicked"),
      onStartGame: (selectedPlayers) => {
        this.selectedPlayers = selectedPlayers; // Asignamos los personajes
        this.startGame();
        console.log(selectedPlayers);
      },
    });
    this.currentScreen = playerselect;
    this.render();
  }

  gameLoop(timestamp) {
    if (this.currentGameState !== this.states.PLAYING) return;
    console.log("Game Loop");
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
