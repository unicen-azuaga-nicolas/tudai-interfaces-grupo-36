class GameScreen extends BaseScreen {
  constructor(canvas, { onExitGame }) {
    super(canvas);
    this.createGame();
    this.onExitGame = onExitGame;
  }

  createGame() {
    this.setBackgroundColor("white");
    const title = new Title(
      this.canvas.width / 2 - 100,
      100,
      200,
      50,
      "Pantalla del juego",
      40
    );
    const board = new Board({
      x: 50,
      y: 50,
      width: this.canvas.width - 100,
      height: this.canvas.height - 100,
    });
    const exitGameBtn = new Button({
      x: this.canvas.width / 2 - 100,
      y: 300,
      width: 200,
      height: 50,
      text: "Salir",
      onClick: () => this.onExitGame(),
    });
    this.add(title);
    this.add(exitGameBtn);
    this.add(board);
  }
}
