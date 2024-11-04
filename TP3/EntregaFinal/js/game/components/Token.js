"use strict";

import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";
import Player from "../Player.js";

class Token extends GameObject {
  /**
   * @param {Object} param
   * @param {number} param.x
   * @param {number} param.y
   * @param {number} param.width
   * @param {number} param.height
   * @param {number} param.radius
   * @param {string} param.backgroundImage
   * @param {Player} param.player
   */
  constructor({ x, y, width, height, radius, backgroundImage, player, name }) {
    super(x, y, width, height);
    this.radius = radius;
    this.backgroundImage = backgroundImage;
    this.isDragging = false;
    this.isLocked = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.player = player;
    this.name = name || "";
    this.falling = false;
    this.fallSpeed = 0;
    this.gravity = 980; // Aceleración debida a la gravedad en píxeles por segundo^2
    this.targetY = null;
    this.rebound = false;
    this.reboundSpeed = 0;
    this.friction = 0.25;
    this.isInBoard = false;
    this.returning = false;
    this.returnSpeed = 0.1;
    this.originalX = this.x;
    this.originalY = this.y;
  }

  /**
   *
   * @param {Player} player
   */
  setPlayer(player) {
    this.player = player;
    this.name = player.name;
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  draw() {
    Game.ctx.beginPath();
    Game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    Game.ctx.closePath();
    Game.ctx.fillStyle = "transparent";
    Game.ctx.fill();
    Game.ctx.drawImage(
      this.backgroundImage,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  /**
   * Updates the token state.
   * @param {number} deltaTime
   */
  update(deltaTime) {
    if (this.falling) {
      this.fallSpeed += this.gravity * deltaTime; // Incrementar la velocidad debido a la gravedad
      this.y += this.fallSpeed * deltaTime; // Actualizar la posición
      this.x = this.targetX;

      if (this.y >= this.targetY) {
        this.y = this.targetY;
        this.falling = false;
        this.rebound = true;
        this.reboundSpeed = -this.fallSpeed * this.friction; // Calcular la velocidad de rebote
        console.log(`Token reached (${this.x}, ${this.y})`);
      }
    }

    if (this.rebound) {
      this.reboundSpeed += this.gravity * deltaTime; // Incrementar la velocidad de rebote debido a la gravedad
      this.y += this.reboundSpeed * deltaTime; // Actualizar la posición

      if (this.y >= this.targetY) {
        this.y = this.targetY;
        this.reboundSpeed *= this.friction; // Aplicar fricción para reducir la velocidad de rebote
        if (Math.abs(this.reboundSpeed) < 1) {
          // Si la velocidad de rebote es muy baja, detener el rebote
          this.reboundSpeed = 0;
          this.rebound = false;
          this.isLocked = true;
          console.log(`Token locked at (${this.x}, ${this.y})`);
        }
      }
    }
    if (this.returning) {
      const distX = this.originalX - this.x;
      const distY = this.originalY - this.y;
      const distance = Math.sqrt(distX ** 2 + distY ** 2);
      if (distance > 1) {
        this.x += distX * this.returnSpeed;
        this.y += distY * this.returnSpeed;
      } else {
        this.x = this.originalX;
        this.y = this.originalY;
        this.returning = false;
      }
    }
  }

  isClicked(x, y) {
    const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    return distance <= this.radius;
  }

  isMouseOver(x, y) {
    return this.isClicked(x, y);
  }

  onClick() {
    console.log("Token clicked");
  }

  startDragging(mouseX, mouseY) {
    if (this.isLocked || this.isInBoard) return;
    this.isDragging = true;
    this.offsetX = mouseX - this.x;
    this.offsetY = mouseY - this.y;
  }

  drag(mouseX, mouseY) {
    if (this.isDragging) {
      this.setPos(mouseX - this.offsetX, mouseY - this.offsetY);
    }
  }

  drop(targetX, targetY) {
    this.isDragging = false;
    this.falling = true;
    this.fallSpeed = 0; // Reiniciar la velocidad de caída
    this.targetX = targetX;
    this.targetY = targetY;
    this.isInBoard = true;
    console.log(`Dropping token to (${targetX}, ${targetY})`);
  }

  returnToStack() {
    this.isDragging = false;
    this.returning = true;
  }

  clone({ x, y }) {
    return new Token({
      x,
      y,
      width: this.width,
      height: this.height,
      radius: this.radius,
      backgroundImage: this.backgroundImage,
      player: this.player,
      name: this.name,
    });
  }
}

export default Token;
