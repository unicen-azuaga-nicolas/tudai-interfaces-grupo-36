import BaseScreen from "../abstract/BaseScreen.js";
import Board from "../components/Board.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Token from "../components/Token.js";
import Game from "../Game.js";
import Player from "../Player.js";
import CanvasUtils from "../utils/CanvasUtils.js";

class GameScreen extends BaseScreen {
  constructor({ player1, player2, onExitGame, onRestartGame, board }) {
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
    this.board = board;

    /**
     * @type {function}
     */
    this.onExitGame = onExitGame;

    /**
     * @type {function}
     * */
    this.onRestartGame = onRestartGame;

    this.placeTokens();
    this.placeBoard();
  }

  placeTokens() {
    this.children = [
      ...this.children, // --> se agregan los elementos de la pantalla
      ...this.player1.tokenStack, // --> se agregan las fichas del jugador 1
      ...this.player2.tokenStack, // --> se agregan las fichas del jugador 2
    ];
  }

  placeBoard() {
    this.children = [...this.children, ...this.board.hints]; // --> se agregan los hints
    this.add(this.board);
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

    const restartButton = new Button({
      x: CanvasUtils.setRelativeX(90) - CanvasUtils.setRelativeWidth(5),
      y: CanvasUtils.setRelativeY(5),
      width: CanvasUtils.setRelativeWidth(10),
      height: CanvasUtils.setRelativeHeight(5),
      text: "Reiniciar",
      onClick: () => this.onRestartGame(),
    });

    this.add(title);
    this.add(exitButton);
    this.add(restartButton);
  }

  draw() {
    this.fillBackground();
    // this.board.draw();
    super.draw();
  }
}

export default GameScreen;
