import Token from "./components/Token.js";

class GameCharacter {
  /**
   *
   * @param {Token} token
   */
  constructor(token) {
    this.token = token;
  }

  /**
   *
   * @returns {Token}
   */
  getToken() {
    return this.token;
  }
}

export default GameCharacter;
