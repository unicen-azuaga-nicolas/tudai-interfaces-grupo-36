import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";
import Token from "./Token.js";

class BoardSlot extends GameObject {
  constructor(x, y, width, height) {
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

  setToken(player) {
    this.token = new Token(this.x, this.y, this.width, this.height, player);
  }

  draw() {
    this.fillBackgroundImage(this.backgroundImage);
    if (this.token !== null) {
      this.token.draw();
    }
  }
}

export default BoardSlot;
