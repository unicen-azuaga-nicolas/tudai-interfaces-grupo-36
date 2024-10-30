class GameScreen extends BaseScreen {
  constructor(canvas) {
    super(canvas);
    this.createGame();
  }

  createGame() {
    const board = new Board({
      x: 50,
      y: 50,
      width: this.canvas.width - 100,
      height: this.canvas.height - 100,
    });

    this.add(board);
  }
}
