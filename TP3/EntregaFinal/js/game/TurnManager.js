class TurnManager {
  constructor(players) {
    this.players = players;
    this.currentPlayerIndex = 0;
  }

  // Método para obtener el jugador actual
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  // Método para avanzar al siguiente turno
  nextTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  // Método para reiniciar los turnos
  reset() {
    this.currentPlayerIndex = 0;
  }
}

export default TurnManager;
