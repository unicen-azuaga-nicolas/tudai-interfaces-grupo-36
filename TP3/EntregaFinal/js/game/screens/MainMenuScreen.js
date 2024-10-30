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
  }

  /**
   *
   * @param {ScreenBuilder} builder
   */
  create(builder) {
    builder
      .setBackgroundColor("white")
      .addTitle(
        this.canvas.width / 2 - 100,
        100,
        200,
        50,
        "Bienvenido al juego 4 en linea",
        40
      )
      .addButton(this.canvas.width / 2 - 100, 200, 200, 50, "Jugar", () =>
        this.onStartGame()
      )
      .addButton(this.canvas.width / 2 - 100, 300, 200, 50, "Salir", () =>
        this.onExitGame()
      )
      .build();
  }
}
