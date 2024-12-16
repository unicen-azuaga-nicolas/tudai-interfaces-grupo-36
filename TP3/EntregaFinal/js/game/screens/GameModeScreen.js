import BaseScreen from "../abstract/BaseScreen.js";
import Button from "../components/Button.js";
import ExitButtonComposite from "../components/ExitButtonComposite.js";
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

    const modeexitButton = new Button({
      x: CanvasUtils.setRelativeX(90),
      y: CanvasUtils.setRelativeY(10),
      width: 80,
      height: 80,
      // text: "fa-solid fa-right-to-bracket",
      textColor: "white",
      fontSize: 40,
      fontFamily: "Font Awesome",
      background: "transparent",
      onClick: () => this.onExitGame(),
      backgroundImage: Game.assets[10],
    });

    const modeexitButtonIcon = new Button({
      x: CanvasUtils.setRelativeX(93),
      y: CanvasUtils.setRelativeY(15),
      width: 40,
      height: 30.48,
      color: "white",
      background: "transparent",
      onClick: () => this.onExitGame(),
      backgroundImage: Game.assets[13],
    });

  

    const title0 = new Title({
      x: CanvasUtils.setRelativeX(10),
      y: CanvasUtils.setRelativeY(10),
      width: CanvasUtils.setRelativeWidth(80),
      height: CanvasUtils.setRelativeHeight(20),
      text: "Elige tu modo de juego",
      fontSize: 32,
      color: "black",
      fontFamily: "Arial Black, Gadget, sans-serif",
      background: "lightgray",
      backgroundWidth: CanvasUtils.setRelativeWidth(78),
      backgroundHeight: CanvasUtils.setRelativeHeight(15),
      backgroundPosition: {
        x: CanvasUtils.setRelativeX(10),
        y: CanvasUtils.setRelativeY(12),
      },
      backgroundImage: Game.assets[12],
    });

    const mode4 = new Button({
      x: CanvasUtils.setRelativeX(10),
      y: CanvasUtils.setRelativeY(50),
      width: CanvasUtils.setRelativeWidth(40),
      height: CanvasUtils.setRelativeHeight(50),
      text: "4",
      textColor: "black",
      fontSize: 32,
      fontFamily: "Arial Black, Gadget, sans-serif",
      background: "transparent",
      onClick: () => this.onSelectMode(0),
      backgroundImage: Game.assets[11],
    });

    const mode5 = new Button({
      x: 595,
      y: 368,
      width: 291,
      height: 298,
      text: "5",
      textColor: "black",
      fontSize: 32,
      fontFamily: "Arial Black, Gadget, sans-serif",
      background: "transparent",
      onClick: () => this.onSelectMode(1),
      backgroundImage: Game.assets[11],
    });
    const mode6 = new Button({
      x: 993,
      y: 372,
      width: 291,
      height: 298,
      text: "6",
      textColor: "black",
      fontSize: 32,
      fontFamily: "Arial Black, Gadget, sans-serif",
      background: "transparent",
      onClick: () => this.onSelectMode(2),
      backgroundImage: Game.assets[11], // TODO: Agregar imagen de botón}
    });
    const mode7 = new Button({
      x: 1410,
      y: 369,
      width: 291,
      height: 298,
      text: "7",
      textOffsetX: 130,
      textColor: "black",
      fontSize: 32,
      fontFamily: "Arial Black, Gadget, sans-serif",
      background: "transparent",
      onClick: () => this.onSelectMode(3),
      backgroundImage: Game.assets[11], // TODO: Agregar imagen de botón}
    });
    this.add(title0);
    this.add(mode4);
    this.add(mode5);
    this.add(mode6);
    this.add(mode7);
    this.add(modeexitButton);
    this.add(modeexitButtonIcon);
    
  }
  draw() {
    this.fillBackgroundImage(Game.assets[2]);
    super.draw();
  }
}

export default GameModeScreen;
