class GameScreen extends BaseScreen {
  constructor(canvas, { onExitGame }) {
    super(canvas);
    this.onExitGame = onExitGame;
  }

  /**
   * Método para crear los elementos de la pantalla
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
        "Pantalla del juego",
        40
      )
      .addButton(this.canvas.width / 2 - 100, 300, 200, 50, "Salir", () =>
        this.onExitGame()
      )
      .build();
  }
}
