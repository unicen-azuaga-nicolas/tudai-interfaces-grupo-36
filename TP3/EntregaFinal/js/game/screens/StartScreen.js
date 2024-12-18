"use strict";

import BaseScreen from "../abstract/BaseScreen.js";
import Button from "../components/Button.js";
import Title from "../components/Title.js";
import Game from "../Game.js";
import CanvasUtils from "../utils/CanvasUtils.js";

/**
 * Tipo de dato para las props de MainMenuScreen
 * @typedef {Object} ScreenProps
 * @property {function} onNextScreen
 * @property {function} onExitGame
 */
class StartScreen extends BaseScreen {
  /**
   * @param {ScreenProps} param1
   */
  constructor({ onNextScreen, onExitGame }) {
    super();
    /**
     * @type {function}
     */
    this.onNextScreen = onNextScreen;
    /**
     * @type {function}
     */
    this.onExitGame = onExitGame;
  }

  create() {
    this.setBackgroundColor("black");

    const playButton = new Button({
      x: CanvasUtils.setRelativeX(37),
      y: CanvasUtils.setRelativeY(80),
      width: 200,
      height: 80,
      text: "Empezar",
      onClick: () => this.onNextScreen(),
      backgroundImage: Game.assets[1],
    });

    this.add(playButton);
  }

  draw() {
    this.fillBackgroundImage(Game.assets[0]);
    super.draw();
  }
}

export default StartScreen;
