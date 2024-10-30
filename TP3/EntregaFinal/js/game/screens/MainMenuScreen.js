class MainMenuScreen extends BaseScreen {
  constructor(canvas) {
    super(canvas);
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
      text: "Continuar",
      onClick: () => this.resumeGame(),
    });

    const mainMenuButton = new Button({
      x: this.canvas.width / 2 - 100,
      y: 300,
      width: 200,
      height: 50,
      text: "Menú Principal",
      onClick: () => this.showMenu(),
    });

    this.add(title);
    this.add(resumeButton);
    this.add(mainMenuButton);
  }
}
