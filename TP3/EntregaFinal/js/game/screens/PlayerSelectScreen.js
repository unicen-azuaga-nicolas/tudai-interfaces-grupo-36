class PlayerSelectScreen extends BaseScreen {
  constructor(canvas, assets, { onExitGame, onStartGame }) {
      super(canvas, assets);
      this.onExitGame = onExitGame;
      this.onStartGame = onStartGame;
      this.selectedPlayers = []; // Lista de personajes seleccionados
      this.ctx = null; // Inicializamos ctx como null
  }

  create() {
      this.setBackgroundColor("black");
      const title = new Title({
          x: this.canvas.width / 2 - 100,
          y: 100,
          width: 200,
          height: 50,
          text: "Selecciona tus personajes",
          fontSize: 40,
          color: "white",
      });

      // Configuración de cada botón de personaje
      const pikachu = new Button({
        x: 0,
        y: 260,
        width: 480,
        height: 700,
        textColor: "black",
        fontSize: 70,
        background: "transparent",
        drawCustomShape: (ctx, x, y, width, height) => {
            ctx.strokeStyle = this.selectedPlayers.includes("Pikachu") ? "white" : "transparent";
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(x + 3, y - 60);
            ctx.lineTo(x + width, y - 2);
            ctx.lineTo(x + width, y + height - 45);
            ctx.lineTo(x + 3, y + height + 30);
            ctx.closePath();
            ctx.stroke();
        },
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
      drawCustomShape: (ctx, x, y, width, height) => {
          ctx.strokeStyle = this.selectedPlayers.includes("Charmander") ? "white" : "transparent";
          ctx.lineWidth = 10;
          ctx.beginPath();
          ctx.moveTo(x - 4, y - 32);
          ctx.lineTo(x + 200, y - 10);
          ctx.lineTo(x + width + 5, y + 4);
          ctx.lineTo(x + width + 5, y + height - 15);
          ctx.lineTo(x + 220, y + height);
          ctx.lineTo(x - 4, y + height + 25);
          ctx.closePath();
          ctx.stroke();
      },
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
    drawCustomShape: (ctx, x, y, width, height) => {
        ctx.strokeStyle = this.selectedPlayers.includes("Bulbasaur") ? "white" : "transparent";
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(x, y + 5);
        ctx.lineTo(x + 200, y - 5);
        ctx.lineTo(x + 10 + width, y - 30);
        ctx.lineTo(x + width + 10, y + height + 25);
        ctx.lineTo(x + 220, y + height - 5);
        ctx.lineTo(x + 2, y + height - 15);
        ctx.closePath();
        ctx.stroke();
    },
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
  drawCustomShape: (ctx, x, y, width, height) => {
      ctx.strokeStyle = this.selectedPlayers.includes("Snorlax") ? "white" : "transparent";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(x , y + 10);
      ctx.lineTo(x + width - 3, y - 46);
      ctx.lineTo(x + width - 3, y + height + 35);
      ctx.lineTo(x , y + height - 35);
      ctx.closePath();
      ctx.stroke();
  },
  onClick: () => this.playerSelect("Snorlax"),
});
this.pikachuToken = new Button({
  x: 170,
  y: 800,
  width: 120,
  height: 120,
  backgroundImage: this.assets[5],
});
this.charmanderToken = new Button({
  x: 650,
  y: 750,
  width: 120,
  height: 120,
  backgroundImage: this.assets[6],
});
this.bulbasaurToken = new Button({
  x: 1150,
  y: 750,
  width: 120,
  height: 120,
  backgroundImage: this.assets[7],
});
this.snorlaxToken = new Button({
  x: 1620,
  y: 800,
  width: 140,
  height: 140,
  backgroundImage: this.assets[8],
});

this.confirmButton = new Button({
  x: this.canvas.width / 2 - 100,
  y: 1000,
  width: 200,
  height: 80,
  text: "Confirmar",
  textColor: "white",
  fontSize: 30,
  backgroundImage: this.assets[4],
  onClick: () => this.confirmSelection(),
});
      this.confirmButton.enabled = false;

      this.add(title);
      this.add(pikachu);
      this.add(charmander);
      this.add(bulbasaur);
      this.add(snorlax);
      this.add(this.pikachuToken);
      this.add(this.charmanderToken);
      this.add(this.bulbasaurToken);
      this.add(this.snorlaxToken);
      this.add(this.confirmButton);
  }

  playerSelect(personaje) {
      if (this.selectedPlayers.includes(personaje)) {
          this.selectedPlayers = this.selectedPlayers.filter(p => p !== personaje);
      } else if (this.selectedPlayers.length < 2) {
          this.selectedPlayers.push(personaje);
      }

      // Habilitar o deshabilitar el botón de confirmación
      this.confirmButton.enabled = this.selectedPlayers.length === 2;
      if (this.confirmButton.enabled) {
        this.confirmButton.x = this.canvas.width / 2 - 105,
        this.confirmButton.y = 995  
        this.confirmButton.width = 210,
        this.confirmButton.height = 90,
        this.confirmButton.backgroundImage = this.assets[1],
        this.confirmButton.draw(this.ctx);
    }

      // Redibujar todos los botones para reflejar el estado actual
      this.draw(this.ctx);
  }

  confirmSelection() {
      if (this.selectedPlayers.length === 2) {
          this.onStartGame(this.selectedPlayers);
      }
  }

  draw(ctx) {
      this.ctx = ctx;
      this.fillBackgroundImage(ctx, this.assets[0]);
      this.fillBackgroundImage(ctx, this.assets[3]);
      super.draw(ctx);
  }
}
