import BaseScreen from "../abstract/BaseScreen.js";
import Button from "../components/Button.js";
import ExitButtonComposite from "../components/ExitButtonComposite.js";
import Title from "../components/Title.js";
import Game from "../Game.js";
import CanvasUtils from "../utils/CanvasUtils.js";

class PlayersNameScreen extends BaseScreen {
  constructor({ onExitGame, onPressContinue }) {
    super();
    this.onExitGame = onExitGame;
    this.onPressContinue = onPressContinue;
    this.playerOneName = "Jugador 1";
    this.playerTwoName = "Jugador 2";
  }

  makePlayerNameInput(playerNumber, { x, y }) {
    const canvasContainer = document.querySelector(".canvas-container");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Jugador ${playerNumber}`;
    input.style.position = "absolute";
    input.style.left = `${CanvasUtils.setRelativeX(x)}px`;
    input.style.top = `${CanvasUtils.setRelativeY(y)}px`;
    input.style.width = "150px";
    input.style.height = "50px";
    input.style.fontSize = "20px";
    input.style.textAlign = "center";
    input.style.border = "none";
    input.style.background = "transparent";
    input.style.color = "black";
    input.style.fontFamily = "Arial";
    input.style.outline = "none";
    input.style.borderBottom = "2px solid black";
    input.style.zIndex = "1";
    input.maxLength = 10;
    input.onfocus = () => {
      input.placeholder = "";
    };
    input.onblur = () => {
      input.placeholder = `Di tú nombre`;
    };
    input.onchange = (event) => {
      if (playerNumber === 1) {
        this.playerOneName = event.target.value;
      } else {
        this.playerTwoName = event.target.value;
      }
    };
    canvasContainer.appendChild(input);
  }

  create() {
    this.setBackgroundColor("black");

    this.makePlayerNameInput(1, { x: 36, y: 32 });
    this.makePlayerNameInput(2, { x: 52, y: 54 });
    const exitButton = new ExitButtonComposite({
      x: CanvasUtils.setRelativeX(90),
      y: CanvasUtils.setRelativeY(10),
      width: 80,
      height: 80,
      textColor: "white",
      fontSize: 40,
      fontFamily: "Font Awesome",
      background: "transparent",
      onClick: () => this.onExitGame(),
    });
    const ribbon = new Title({
      x: CanvasUtils.setRelativeX(0),
      y: CanvasUtils.setRelativeY(0),
      width: CanvasUtils.setRelativeWidth(100),
      height: CanvasUtils.setRelativeHeight(10),
      text: "",
      fontSize: 24,
      color: "white",
      fontFamily: "Poppins, serif",
      bold: true,
      backgroundImage: Game.assets[27],
    });
    const title1 = new Title({
      x: CanvasUtils.setRelativeX(10),
      y: CanvasUtils.setRelativeY(-5),
      width: CanvasUtils.setRelativeWidth(80),
      height: CanvasUtils.setRelativeHeight(20),
      text: "Escribe tu nombre",
      fontSize: 24,
      color: "white",
      fontFamily: "Arial Black, Gadget, sans-serif",
    });

    const continueBtn = new Button({
      x: CanvasUtils.setRelativeX(37),
      y: CanvasUtils.setRelativeY(80),
      width: 200,
      height: 80,
      text: "Continuar",
      fontFamily: "Poppins, black, serif",
      fontSize: 24,
      onClick: () => {
        // remover inputs creados
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => input.type === "text" && input.remove());

        this.onPressContinue(this.playerOneName, this.playerTwoName);
      },
      backgroundImage: Game.assets[1],
    });

    this.add(ribbon);
    this.add(title1);
    this.add(continueBtn);
  }

  draw() {
    this.fillBackgroundImage(Game.assets[25]);
    super.draw();
  }
}

export default PlayersNameScreen;
