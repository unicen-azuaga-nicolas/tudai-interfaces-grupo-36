import BaseScreen from "../abstract/BaseScreen.js";
import Board from "../components/Board.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Token from "../components/Token.js";
import Game from "../Game.js";
import Player from "../Player.js";
import CanvasUtils from "../utils/CanvasUtils.js";

class GameScreen extends BaseScreen {
  constructor({ player1, player2, onExitGame, tablero }) {
    super(); // --> se ejecuta el create()

    /**
     * @type {Player}
     */
    this.player1 = player1;

    /**
     * @type {Player}
     */
    this.player2 = player2;

    /**
     * @type {Board}
     */

    this.tablero = tablero;
    /**
     * @type {function}
     */
    this.onExitGame = onExitGame;

    this.placeTokens();
  }

  placeTokens() {
    this.children = [
      ...this.children,
      ...this.player1.tokenStack,
      ...this.player2.tokenStack,
    ];
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

  draw() {
    this.fillBackground();
    this.tablero.dibujar();
    super.draw();
  }
}

export default GameScreen;
