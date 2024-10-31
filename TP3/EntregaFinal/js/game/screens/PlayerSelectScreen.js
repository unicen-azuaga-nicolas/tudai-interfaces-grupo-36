class PlayerSelectScreen extends BaseScreen {
    constructor(canvas, assets, { onExitGame, onStartGame }) {
        super(canvas, assets);
        this.onExitGame = onExitGame;
        this.onStartGame = onStartGame;
        this.selectedPlayers = []; // Lista para almacenar los personajes seleccionados
    }
    create() {
        this.setBackgroundColor("black");
        const title = new Title({
          x: this.canvas.width / 2 - 100,
          y: 100,
          width: 200,
          height: 50,
          text: "Selecciona tu personaje",
          fontSize: 40,
          color: "white",
        });
          const pikachu = new Button({
            x: 0,
            y: 250,
            width: 480,
            height: 700,
            textColor: "black",
            fontSize: 70,
            background: "transparent",
            onClick: () => this.playerSelect("Pikachu"),
          });
          const charmander = new Button({
            x: 485,
            y: 290,
            width: 470,
            height: 600,
            textColor: "black",
            fontSize: 70,
            background: "transparent",
            onClick: () => this.playerSelect("Charmander"),
          });
          const bulbasaur = new Button({
            x: 960,
            y: 290,
            width: 470,
            height: 600,
            textColor: "black",
            fontSize: 70,
            background: "transparent",
            onClick: () => this.playerSelect("Bulbasaur"),
          });
          const snorlax = new Button({
            x: 1440,
            y: 250,
            width: 480,
            height: 700,
            textColor: "black",
            fontSize: 70,
            background: "transparent",
            onClick: () => this.playerSelect("Snorlax"),
          });
          this.add(title);
          this.add(pikachu);
          this.add(charmander);
          this.add(bulbasaur);
          this.add(snorlax);
    }

    playerSelect(personaje) {
      // Agrega el personaje seleccionado si aún no está en la lista
      if (this.selectedPlayers.length < 2 && !this.selectedPlayers.includes(personaje)) {
          this.selectedPlayers.push(personaje);
      }
      
      // Verifica si ya se seleccionaron dos personajes y llama a onStartGame con ambos
      if (this.selectedPlayers.length === 2) {
          this.onStartGame(this.selectedPlayers); // Pasamos los dos personajes seleccionados
      }
  }

    draw(ctx) {
        this.fillBackgroundImage(ctx, this.assets[0]);
        this.fillBackgroundImage(ctx, this.assets[3]);
        super.draw(ctx);
      }
}