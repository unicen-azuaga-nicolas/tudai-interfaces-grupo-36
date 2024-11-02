"use strict";

import BaseScreen from "../abstract/BaseScreen.js";
import Title from "../components/Title.js";
import Button from "../components/Button.js";
import Game from "../Game.js";
import GameCharacter from "../GameCharacter.js";
import Player from "../Player.js";
import Token from "../components/Token.js";

class CharacterSelectScreen extends BaseScreen {
  /**
   *
   * @param {Props} param0
   * @param {Player} param0.player1
   * @param {Player} param0.player2
   * @param {Function} param0.onExitGame
   * @param {Function} param0.onStartGame
   */
  constructor({ player1, player2, onExitGame, onConfirmSelection }) {
    super();
    this.onExitGame = onExitGame;
    this.onConfirmSelection = onConfirmSelection;
    /**
     * @type {string[]}
     */
    this.selectedCharacters = []; // Lista de personajes seleccionados
    /**
     * @type {Player}
     */
    this.player1 = player1;
    this.player1.setCharacter(null);
    /**
     * @type {Player}
     */
    this.player2 = player2;
    this.player2.setCharacter(null);
    /**
     * @type {Object.<string, GameCharacter>}
     */

    /**
     * @type {Player}
     */
    this.currentPlayer = this.player1;
  }

  nextPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  getStrokeColorByPlayer(characterName) {
    if (
      this.player1.hasCharacterSelected() &&
      this.player1.characterSelected.name === characterName
    ) {
      return this.player1.color;
    } else if (
      this.player2.hasCharacterSelected() &&
      this.player2.characterSelected.name === characterName
    ) {
      return this.player2.color;
    } else {
      return "transparent";
    }
  }

  create() {
    const CHARACTERS = {
      PIKACHU: new GameCharacter({
        name: "Pikachu",
        token: new Token({
          x: 170,
          y: 800,
          width: 120,
          height: 120,
          radius: 60,
          backgroundImage: Game.assets[5],
        }),
      }),
      CHARMANDER: new GameCharacter({
        name: "Charmander",
        token: new Token({
          x: 650,
          y: 750,
          width: 120,
          height: 120,
          radius: 60,
          backgroundImage: Game.assets[6],
        }),
      }),
      BULBASAUR: new GameCharacter({
        name: "Bulbasaur",
        token: new Token({
          x: 1150,
          y: 750,
          width: 120,
          height: 120,
          radius: 60,
          backgroundImage: Game.assets[7],
        }),
      }),
      SNORLAX: new GameCharacter({
        name: "Snorlax",
        token: new Token({
          x: 1650,
          y: 800,
          width: 140,
          height: 140,
          radius: 60,
          backgroundImage: Game.assets[8],
        }),
      }),
    };

    const title = new Title({
      x: Game.canvas.width / 2 - 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Selecciona tus personajes",
      fontSize: 40,
      color: "white",
    });

    // Configuración de cada botón de personaje
    const pikachuBtn = new Button({
      x: 0,
      y: 260,
      width: 480,
      height: 700,
      textColor: "black",
      fontSize: 70,
      background: "transparent",
      drawCustomShape: (ctx, x, y, width, height) => {
        // el color de la linea debe ser la del color del jugador que lo seleccionó al personaje
        ctx.strokeStyle = this.getStrokeColorByPlayer("Pikachu");
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(x + 3, y - 60);
        ctx.lineTo(x + width, y - 2);
        ctx.lineTo(x + width, y + height - 45);
        ctx.lineTo(x + 3, y + height + 30);
        ctx.closePath();
        ctx.stroke();
      },
      onClick: () => this.playerSelect(CHARACTERS.PIKACHU),
    });

    const charmanderBtn = new Button({
      x: 485,
      y: 290,
      width: 470,
      height: 600,
      textColor: "black",
      fontSize: 70,
      background: "transparent",
      drawCustomShape: (ctx, x, y, width, height) => {
        ctx.strokeStyle = ctx.strokeStyle =
          this.getStrokeColorByPlayer("Charmander");
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
      onClick: () => this.playerSelect(CHARACTERS.CHARMANDER),
    });

    const bulbasaurBtn = new Button({
      x: 960,
      y: 290,
      width: 470,
      height: 600,
      textColor: "black",
      fontSize: 70,
      background: "transparent",
      drawCustomShape: (ctx, x, y, width, height) => {
        ctx.strokeStyle = this.getStrokeColorByPlayer("Bulbasaur");
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
      onClick: () => this.playerSelect(CHARACTERS.BULBASAUR),
    });

    const snorlaxBtn = new Button({
      x: 1440,
      y: 250,
      width: 480,
      height: 700,
      textColor: "black",
      fontSize: 70,
      background: "transparent",
      drawCustomShape: (ctx, x, y, width, height) => {
        ctx.strokeStyle = this.getStrokeColorByPlayer("Snorlax");
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x + width - 3, y - 46);
        ctx.lineTo(x + width - 3, y + height + 35);
        ctx.lineTo(x, y + height - 35);
        ctx.closePath();
        ctx.stroke();
      },
      onClick: () => this.playerSelect(CHARACTERS.SNORLAX),
    });

    this.confirmButton = new Button({
      x: Game.canvas.width / 2 - 100,
      y: 1000,
      width: 200,
      height: 80,
      text: "Confirmar",
      textColor: "white",
      fontSize: 30,
      backgroundImage: Game.assets[4],
      onClick: () => this.confirmSelection(),
    });
    this.confirmButton.enabled = false;

    this.add(title);
    this.add(pikachuBtn);
    this.add(charmanderBtn);
    this.add(bulbasaurBtn);
    this.add(snorlaxBtn);
    this.add(CHARACTERS.PIKACHU);
    this.add(CHARACTERS.CHARMANDER);
    this.add(CHARACTERS.BULBASAUR);
    this.add(CHARACTERS.SNORLAX);
    this.add(this.confirmButton);
    // this.add(this.characters.charmander.getToken());
    // this.add(this.characters.bulbasaur.getToken());
    // this.add(this.characters.snorlax.getToken());
    // this.add(this.confirmButton);
  }

  /**
   *
   * @param {GameCharacter} personaje
   */
  playerSelect(personaje) {
    /**
     * Lógica para guardar el personaje seleccionado por el jugador 1
     * y el jugador 2, y habilitar el botón de confirmación
     */
    if (this.currentPlayer.hasCharacterSelected()) {
      this.currentPlayer.setCharacter(null);
    } else {
      this.currentPlayer.setCharacter(personaje);
    }

    this.nextPlayer();

    // if (this.selectedCharacters.includes(personaje.name)) {
    //   this.selectedCharacters = this.selectedCharacters.filter(
    //     (p) => p !== personaje.name
    //   );
    // } else if (this.selectedCharacters.length < 2) {
    //   this.selectedCharacters.push(personaje.name);
    // }

    // Habilitar o deshabilitar el botón de confirmación

    if (
      this.player1.hasCharacterSelected() &&
      this.player2.hasCharacterSelected()
    ) {
      this.confirmButton.enabled = true;
    } else {
      this.confirmButton.enabled = false;
    }

    if (this.confirmButton.enabled) {
      (this.confirmButton.x = Game.canvas.width / 2 - 105),
        (this.confirmButton.y = 995);
      (this.confirmButton.width = 210),
        (this.confirmButton.height = 90),
        (this.confirmButton.backgroundImage = Game.assets[1]),
        this.confirmButton.draw(this.ctx);
    } else {
      (this.confirmButton.x = Game.canvas.width / 2 - 100),
        (this.confirmButton.y = 1000);
      (this.confirmButton.width = 200),
        (this.confirmButton.height = 80),
        (this.confirmButton.backgroundImage = Game.assets[4]),
        this.confirmButton.draw(this.ctx);
    }

    // Redibujar todos los botones para reflejar el estado actual
    this.draw();
  }

  confirmSelection() {
    if (this.confirmButton.enabled) {
      this.onConfirmSelection(this.selectedCharacters);
    }
  }

  draw() {
    this.fillBackgroundImage(Game.assets[0]);
    this.fillBackgroundImage(Game.assets[3]);
    super.draw();
  }
}

export default CharacterSelectScreen;
