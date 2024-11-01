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
  constructor({ onStartGame, onExitGame }) {
    super();
    /**
     * @type {function}
     */
    this.onStartGame = onStartGame;
    /**
     * @type {function}
     */
    this.onExitGame = onExitGame;
  }

  create() {
    this.setBackgroundColor("black");
    const title = new Title({
      x: Game.canvas.width / 2 - 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Bienvenido al juego 4 en linea",
      fontSize: 40,
      color: "white",
    });

    const playButton = new Button({
      x: Game.canvas.width / 2 - 100,
      y: 200,
      width: 200,
      height: 80,
      text: "Jugar",
      onClick: () => this.onStartGame(),
      backgroundImage: Game.assets[1],
    });

    const exitButton = new Button({
      x: Game.canvas.width / 2 - 100,
      y: 300,
      width: 200,
      height: 50,
      text: "Salir",
      onClick: () => this.onExitGame(),
    });

    this.add(title);
    this.add(playButton);
    this.add(exitButton);
  }

  draw() {
    this.fillBackgroundImage(Game.assets[0]);
    super.draw();
  }
}
