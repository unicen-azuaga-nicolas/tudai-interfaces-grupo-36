class GameModeScreen extends BaseScreen {
  constructor({ onExitGame, onStartGame }) {
    super();
    this.onExitGame = onExitGame;
    this.onStartGame = onStartGame;
  }
  create() {
    this.setBackgroundColor("black");
    const title = new Title({
      x: GameObject.canvas.width / 2 - 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Selecciona el modo de juego",
      fontSize: 40,
      color: "white",
    });
    const mode4 = new Button({
      x: GameObject.percentOf(GameObject.canvas.width, 6),
      y: GameObject.percentOf(GameObject.canvas.height, 30),
      width: GameObject.percentOf(GameObject.canvas.width, 25),
      height: GameObject.percentOf(GameObject.canvas.height, 45),
      text: "4",
      textColor: "black",
      fontSize: GameObject.percentOf(GameObject.canvas.height, 7),
      background: "transparent",
      onClick: () => this.onStartGame(4),
    });
    const mode5 = new Button({
      x: 720,
      y: 350,
      width: 460,
      height: 470,
      text: "5",
      textColor: "black",
      fontSize: 70,
      background: "transparent",
      onClick: () => this.onStartGame(5),
    });
    const mode6 = new Button({
      x: 1305,
      y: 350,
      width: 460,
      height: 470,
      text: "6",
      textColor: "black",
      fontSize: 70,
      background: "transparent",
      onClick: () => this.onStartGame(6),
    });
    this.add(title);
    this.add(mode4);
    this.add(mode5);
    this.add(mode6);
  }
  draw() {
    this.fillBackgroundImage(GameObject.assets[2]);
    super.draw();
  }
}
