import BaseScreen from "../abstract/BaseScreen.js";
import GameObject from "../abstract/GameObject.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Game from "../Game.js";
import CanvasUtils from "../utils/CanvasUtils.js";

class GameModeScreen extends BaseScreen {
  constructor({ onExitGame, onSelectMode }) {
    super();
    this.onExitGame = onExitGame;
    this.onSelectMode = onSelectMode;
  }
  create() {
    this.setBackgroundColor("black");
    const title = new Title({
      x: Game.canvas.width / 2 - 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Selecciona el modo de juego",
      fontSize: 40,
      color: "white",
    });
    const mode4 = new Button({
      x: CanvasUtils.setRelativeX(6),
      y: CanvasUtils.setRelativeY(30),
      width: CanvasUtils.setRelativeWidth(25),
      height: CanvasUtils.setRelativeHeight(45),
      text: "4",
      textColor: "black",
      fontSize: GameObject.percentOf(Game.canvas.height, 7),
      background: "transparent",
      backgroundImage: null, // TODO: Agregar imagen de botón
      onClick: () => this.onSelectMode(0),
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
      backgroundImage: null, // TODO: Agregar imagen de botón
      onClick: () => this.onSelectMode(1),
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
      backgroundImage: null, // TODO: Agregar imagen de botón
      onClick: () => this.onSelectMode(2),
    });
    this.add(title);
    this.add(mode4);
    this.add(mode5);
    this.add(mode6);
  }
  draw() {
    this.fillBackgroundImage(Game.assets[2]);
    super.draw();
  }
}

export default GameModeScreen;
