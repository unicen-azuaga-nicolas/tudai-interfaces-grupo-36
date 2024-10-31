/**
 * @typedef {Object} ScreenProps
 * @property {function} onStartGame
 * @property {function} onExitGame
 */

class MainMenuScreen extends BaseScreen {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Image[]} assets
   * @param {ScreenProps} param1
   */
  constructor(canvas, assets, { onStartGame, onExitGame }) {
    super(canvas, assets);
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
      x: this.canvas.width / 2 - 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Bienvenido al juego 4 en linea",
      fontSize: 40,
      color: "white",
    });

    const playButton = new Button({
      x: this.canvas.width / 2 - 100,
      y: 200,
      width: 200,
      height: 80,
      text: "Jugar",
      onClick: () => this.onStartGame(),
      backgroundImage: this.assets[1],
    });

    const exitButton = new Button({
      x: this.canvas.width / 2 - 100,
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

  draw(ctx) {
    // this.fillBackground(ctx);
    this.fillBackgroundImage(ctx, this.assets[0]);
    super.draw(ctx);
  }
}
