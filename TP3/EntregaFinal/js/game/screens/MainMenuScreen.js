/**
 * @typedef {Object} ScreenProps
 * @property {function} onStartGame
 * @property {function} onExitGame
 */

class MainMenuScreen extends BaseScreen {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {ScreenProps} param1
   */
  constructor(canvas, { onStartGame, onExitGame }) {
    super(canvas);
    /**
     * @type {function}
     */
    this.onStartGame = onStartGame;
    /**
     * @type {function}
     */
    this.onExitGame = onExitGame;
    this.createMainMenu();
  }

  createMainMenu() {
    this.setBackgroundColor("white");
    const title = new Title(
      this.canvas.width / 2 - 100,
      100,
      200,
      50,
      "Bienvenido al juego 4 en linea",
      40
    );
    const resumeButton = new Button({
      x: this.canvas.width / 2 - 100,
      y: 200,
      width: 200,
      height: 50,
      text: "Jugar",
      onClick: () => this.onStartGame(),
    });

    const mainMenuButton = new Button({
      x: this.canvas.width / 2 - 100,
      y: 300,
      width: 200,
      height: 50,
      text: "Salir",
      onClick: () => this.onExitGame(),
    });

    this.add(title);
    this.add(resumeButton);
    this.add(mainMenuButton);
  }
}
