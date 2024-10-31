class GameScreen extends BaseScreen {
  constructor(canvas, { onExitGame }) {
    super(canvas);
    this.onExitGame = onExitGame;
  }

  create() {
    this.setBackgroundColor("white");
    const title = new Title({
      x: this.canvas.width / 2 - 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Pantalla del juego",
      fontSize: 40,
      color: "black",
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
    this.add(exitButton);
  }

  draw(ctx) {
    this.fillBackground(ctx);
    super.draw(ctx);
  }
}
