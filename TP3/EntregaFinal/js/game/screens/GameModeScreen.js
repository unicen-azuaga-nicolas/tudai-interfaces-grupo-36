import BaseScreen from "../abstract/BaseScreen.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Game from "../Game.js";
import CanvasUtils from "../utils/CanvasUtils.js";

class GameModeScreen extends BaseScreen {
  constructor({ onExitGame, onSelectMode }) {
    super();
    this.onExitGame = onExitGame;
    this.onSelectMode = onSelectMode;
    this.MODES = {
      4: 0,
      5: 1,
      6: 2,
      7: 3,
    };
  }
  create() {
    this.setBackgroundColor("black");

    const modeexitButton = new Button({
      x: CanvasUtils.setRelativeX(85),
      y: CanvasUtils.setRelativeY(5),
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
      x: CanvasUtils.setRelativeX(88),
      y: CanvasUtils.setRelativeY(10),
      width: 40,
      height: 30.48,
      color: "white",
      background: "transparent",
      onClick: () => this.onExitGame(),
      backgroundImage: Game.assets[13],
    });

    const title0 = new Title({
      x: CanvasUtils.setRelativeX(10),
      y: CanvasUtils.setRelativeY(7),
      width: CanvasUtils.setRelativeWidth(80),
      height: CanvasUtils.setRelativeHeight(20),
      text: "Elige tu modo",
      fontSize: 24,
      color: "white",
      fontFamily: "Poppins, serif",
      bold: true,
    });

    const mode4 = new Button({
      x: CanvasUtils.setRelativeX(35),
      y: CanvasUtils.setRelativeY(25),
      height: CanvasUtils.setRelativeHeight(15),
      width: CanvasUtils.setRelativeWidth(30),
      text: "4 en linea",
      textColor: "white",
      fontSize: 25,
      color: "white",
      fontFamily: "Poppins, serif",
      // background: "transparent",
      onClick: () => this.onSelectMode(this.MODES[4]),
      backgroundImage: Game.assets[28],
    });

    const mode5 = new Button({
      x: CanvasUtils.setRelativeX(35),
      y: CanvasUtils.setRelativeY(40),
      height: CanvasUtils.setRelativeHeight(15),
      width: CanvasUtils.setRelativeWidth(30),
      text: "5 en linea",
      textColor: "white",
      fontSize: 25,
      color: "white",
      fontFamily: "Poppins, serif",
      // background: "transparent",
      onClick: () => this.onSelectMode(this.MODES[5]),
      backgroundImage: Game.assets[28],
    });

    const mode6 = new Button({
      x: CanvasUtils.setRelativeX(35),
      y: CanvasUtils.setRelativeY(55),
      height: CanvasUtils.setRelativeHeight(15),
      width: CanvasUtils.setRelativeWidth(30),
      text: "6 en linea",
      textColor: "white",
      fontSize: 25,
      color: "white",
      fontFamily: "Poppins, serif",
      onClick: () => this.onSelectMode(this.MODES[6]),
      backgroundImage: Game.assets[28],
    });

    const mode7 = new Button({
      x: CanvasUtils.setRelativeX(35),
      y: CanvasUtils.setRelativeY(70),
      height: CanvasUtils.setRelativeHeight(15),
      width: CanvasUtils.setRelativeWidth(30),
      text: "7 en linea",
      textColor: "white",
      fontSize: 25,
      color: "white",
      fontFamily: "Poppins, serif",
      onClick: () => this.onSelectMode(this.MODES[7]),
      backgroundImage: Game.assets[28],
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
    this.fillBackgroundImage(Game.assets[29]);
    super.draw();
  }
}

export default GameModeScreen;
