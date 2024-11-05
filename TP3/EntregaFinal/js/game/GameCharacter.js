import GameObject from "./abstract/GameObject.js";
import Token from "./components/Token.js";

class GameCharacter extends GameObject {
  /**
   *
   * @param {Token} token
   */
  constructor({ name, token, image }) {
    super(0, 0, token.width, token.height);
    this.name = name;
    this.token = token;
    this.image = image
  }

  /**
   *
   * @returns {Token}
   */
  getToken() {
    return this.token;
  }

  setToken(){
    
  }

  getName() {
    return this.name;
  }

  /**
   * Dibuja el personaje en el canvas.
   */
  draw() {
    this.token.draw();
  }
}

export default GameCharacter;
