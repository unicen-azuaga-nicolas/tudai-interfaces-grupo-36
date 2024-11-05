class TurnManager {
  /**
   * Constructor de la clase TurnManager.
   * @param {Player[]} players
   */
  constructor(players) {
    this.players = players;
    this.currentPlayerIndex = 0;
  }

  
  /**
   * Metodo para obtener el jugador actual.
   * @returns {Player}
   */
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  // Método para avanzar al siguiente turno
  nextTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
      console.log(`Turno de dsadsadsas: ${this.getCurrentPlayer().name}`);
      this.getCurrentPlayer().unlockLastToken();
  }

  // Método para reiniciar los turnos
  reset() {
    this.currentPlayerIndex = 0;
  }
}

export default TurnManager;
