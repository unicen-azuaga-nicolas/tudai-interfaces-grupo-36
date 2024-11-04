import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";
import Player from "../Player.js";
import Token from "./Token.js";

class BoardSlot extends GameObject {
  constructor({ x, y, width, height }) {
    super(x, y, width, height);
    this.background = "transparent";
    this.backgroundImage = Game.assets[9];
    /**
     * @type {Token}
     */
    this.token = null;
  }

  isEmpty() {
    return this.token === null;
  }

  /**
   *
   * @param {Player} player
   */
  setToken(player) {
    this.token = new Token({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      radius: this.width / 2,
      backgroundImage: player.characterSelected.getToken().backgroundImage,
    });
  }

  draw() {
    this.fillBackgroundImage(this.backgroundImage);
    if (this.token !== null) {
      this.token.draw();
    }
  }
}

export default BoardSlot;
