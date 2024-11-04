import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";
import Player from "../Player.js";
import Token from "./Token.js";

class BoardSlot extends GameObject {
  constructor({ x, y, width, height, column, row }) {
    super(x, y, width, height);
    this.background = "transparent";
    this.backgroundImage = Game.assets[9];
    /**
     * @type {Token}
     */
    this.token = null;
    this.column = column;
    this.row = row;
  }

  isEmpty() {
    return this.token === null;
  }

  /**
   *
   * @param {Player} player
   */
  setToken(player) {
    try {
      console.log("Player en Slot", player);
      console.log("Columna", this.column);
      console.log("Fila", this.row);
      const token = new Token({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        radius: 30,
        backgroundImage: player.characterSelected.getToken().backgroundImage,
        player: player,
      });
      token.lock();
      this.token = token;
    } catch (error) {
      console.error("Error al setear el token", error);
      console.error("Player en Slot", player);
    }
  }

  highlight() {
    this.background = "rgba(0, 0, 0, 0.1)";
  }

  draw() {
    this.fillBackgroundImage(this.backgroundImage);
    if (this.token !== null) {
      setTimeout(() => {
        this.token.draw();
      }, 100);
    }
  }

  clear() {
    this.token = null;
  }
}

export default BoardSlot;
