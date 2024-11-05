import BaseScreen from "../abstract/BaseScreen.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Game from "../Game.js";
import CanvasUtils from "../utils/CanvasUtils.js";
import Temporizador from "../components/Temporizador.js";

class GameScreen extends BaseScreen {
  /**
   *
   * @param {Props} param0
   * @param {Game} game
   * @param {function} onExitGame
   * @param {function} onRestartGame
   */
  constructor({ game, onExitGame, onRestartGame }) {
    super(); // --> se ejecuta el create()

    /**
     * @type {Game}
     */
    this.game = game;

    /**
     * @type {function}
     */
    this.onExitGame = onExitGame;

    this.temporizador = new Temporizador(300, Game.ctx, Game.assets[19]);
    this.temporizador.iniciar();

    /**
     * @type {function}
     * */
    this.onRestartGame = onRestartGame;
    this.currentTurnTitle = new Title({
      x: CanvasUtils.setRelativeX(54.2),
      y: CanvasUtils.setRelativeY(5),
      width: CanvasUtils.setRelativeWidth(10),
      height: CanvasUtils.setRelativeHeight(5),
      text: "",
      fontSize: 40,
      color: "transparent",
      bold: true,
    });
    this.placeTitles();
    this.placeHints();
    this.placeTokens();
    this.placeBoard();
    console.log("GameScreen created");
    console.log(this.children);
  }

  placeTokens() {
    this.children = [
      ...this.children, // --> se agregan los elementos de la pantalla
      ...this.game.player1.tokenStack, // --> se agregan las fichas del jugador 1
      ...this.game.player2.tokenStack, // --> se agregan las fichas del jugador 2
    ];
  }

  placeHints() {
    this.children = [...this.children, ...this.game.board.hints]; // --> se agregan los hints
  }

  placeBoard() {
    this.add(this.game.board);
  }

  placeTitles() {
    const player1Title = new Title({
      x: CanvasUtils.setRelativeX(5.5),
      y: CanvasUtils.setRelativeY(25),
      width: CanvasUtils.setRelativeWidth(10),
      height: CanvasUtils.setRelativeHeight(5),
      text: this.game.player1.name,
      fontSize: 20,
      color: "black",
    });

    const player2Title = new Title({
      x: CanvasUtils.setRelativeX(85),
      y: CanvasUtils.setRelativeY(25),
      width: CanvasUtils.setRelativeWidth(10),
      height: CanvasUtils.setRelativeHeight(5),
      text: this.game.player2.name,
      fontSize: 20,
      color: "black",
    });

    this.add(player1Title);
    this.add(player2Title);
  }

  create() {
    this.setBackgroundColor("lightgray");
    const titleTurn = new Title({
      x: CanvasUtils.setRelativeX(45),
      y: CanvasUtils.setRelativeY(5),
      width: CanvasUtils.setRelativeWidth(10),
      height: CanvasUtils.setRelativeHeight(5),
      text: `Turno de `,
      fontSize: 40,
      color: "black",
    });

    const exitButton = new Button({
      x: CanvasUtils.setRelativeX(50) - 100,
      y: CanvasUtils.setRelativeY(90),
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

    const modeexitButton = new Button({
      x: 1764,
      y: 59,
      width: 80,
      height: 80,
     // text: "fa-solid fa-right-to-bracket",
      textColor: "white",
      fontSize: 40,
      //fontFamily:"Font Awesome",
      background: "transparent",
      onClick: () => this.onExitGame(),
      backgroundImage: Game.assets[10],
      
    });

    const modeexitButtonIcon = new Button({
      x: 1784,
      y: 82,
      width: 40,
      height: 30.48,
     // text: "fa-solid fa-right-to-bracket",
     //fontFamily:"Font Awesome",
      color:"white",
      background: "transparent",
      onClick: () => this.onExitGame(),
      backgroundImage: Game.assets[13],
      
    });

    const modeRestartButton = new Button({
      x: 1664,
      y: 59,
      width: 80,
      height: 80,
     // text: "fa-solid fa-right-to-bracket",
      textColor: "white",
      fontSize: 40,
      //fontFamily:"Font Awesome",
      background: "transparent",
      onClick: () =>  this.onRestartGame(),
      backgroundImage: Game.assets[18],
      
    });

    const modeRestartButtonIcon = new Button({
      x: 1684 ,
      y: 82,
      width: 40,
      height: 30.48,
     // text: "fa-solid fa-right-to-bracket",
     //fontFamily:"Font Awesome",
      color:"white",
      background: "transparent",
      onClick: () => this.onRestartGame(),
      backgroundImage: Game.assets[20],
      
    });

    this.add(titleTurn);
    this.add(exitButton);
    this.add(modeexitButton);
    this.add(modeexitButtonIcon);
    this.add(modeRestartButton);
    this.add(modeRestartButtonIcon);
  }

  draw() {
    this.fillBackground();
    this.fillBackgroundImage(Game.assets[0]);
    this.currentTurnTitle.draw();
    this.game.player1.dibujarPersonaje(Game.ctx, CanvasUtils.setRelativeX(5), CanvasUtils.setRelativeY(70), 300, 300); 
    this.game.player2.dibujarPersonaje(Game.ctx, CanvasUtils.setRelativeX(83), CanvasUtils.setRelativeY(70), 300, 300);
    if (this.temporizador) { 
        this.temporizador.dibujar(); // Dibujar el temporizador 
      }
    super.draw();
  }
  
  destroy() {
    if (this.temporizador) {
        this.temporizador.pausar(); // Detener el temporizador
        this.temporizador.borrar(); // Limpiar el área del temporizador
        this.temporizador = null; // Limpiar referencia
    }

    this.children = []; // Limpiar todos los hijos de la pantalla

    super.destroy(); // Llama al método destroy de BaseScreen
}


  update(deltaTime) {
    this.currentTurnTitle.setText(
      `${this.game.turnManager.getCurrentPlayer().name}`
    );
    this.currentTurnTitle.setColor(
      this.game.turnManager.getCurrentPlayer().color
    );
    this.game.turnManager.getCurrentPlayer().color;

    super.update(deltaTime);
  }
}

export default GameScreen;
