class Game {
  constructor(canvasId) {
    /**
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.getElementById(canvasId);
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = this.canvas.getContext("2d");
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
    this.currentScreen = new BaseScreen(this.canvas);
    /**
     * Manejador de eventos, se encarga de manejar los eventos del canvas.
     * @type {EventHandler}
     */
    this.eventHandler = new EventHandler(this.canvas, this);
    /**
     * Último tiempo de ejecución del juego.
     * @type {number}
     */
    this.lastTime = 0;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawScreen(screen) {
    this.clearCanvas();
    this.currentScreen = screen;
    this.currentScreen.draw(this.ctx);
  }

  startGame() {
    this.currentGameState = this.states.PLAYING;
    this.currentScreen = new GameScreen(this.canvas);
    this.lastTime = 0;
    this.gameLoop(0);
  }

  pauseGame() {
    this.currentGameState = this.states.PAUSED;
    //TODO: Implementar pantalla de pausa
    const pauseScreen = new BaseScreen(this.canvas);
    this.drawScreen(pauseScreen);
  }

  resumeGame() {
    this.currentGameState = this.states.PLAYING;
    this.lastTime = 0;
    this.gameLoop(0);
  }

  showMenu() {
    this.currentGameState = this.states.MENU;
    const menu = new MainMenuScreen(this.canvas);
    this.drawScreen(menu);
  }

  gameLoop(timestamp) {
    if (this.state !== this.states.PLAYING) return;

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
    this.currentScreen.draw(this.ctx);
  }
}
