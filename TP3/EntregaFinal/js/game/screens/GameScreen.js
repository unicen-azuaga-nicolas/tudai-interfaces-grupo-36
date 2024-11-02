import BaseScreen from "../abstract/BaseScreen.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Game from "../Game.js";

class GameScreen extends BaseScreen {
  constructor({ onExitGame, tablero }) {
    super();
    this.onExitGame = onExitGame;
    this.tablero = tablero;
  }

  create() {
    this.setBackgroundColor("white");
    const title = new Title({
      x: Game.canvas.width / 2 - 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Pantalla del juego",
      fontSize: 40,
      color: "black",
    });

    const exitButton = new Button({
      x: Game.canvas.width / 2 - 100,
      y: 1000,
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
    this.tablero.dibujar();
    super.draw(ctx);
  }
}

export default GameScreen;
