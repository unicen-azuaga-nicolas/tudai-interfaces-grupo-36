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
  constructor({ x, y, width, height, radius, backgroundImage }) {
    super(x, y, width, height);
    this.radius = radius;
    this.backgroundImage = backgroundImage;
    this.isDragging = false;
    this.isLocked = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.player = null;
    this.name = "Token";
    this.falling = false;
    this.fallSpeed = 0;
    this.gravity = 980; // Aceleración debida a la gravedad en píxeles por segundo^2
    this.targetY = null;
    this.rebound = false;
    this.reboundSpeed = 0;
    this.friction = 0.25;
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

      if (this.y >= this.targetY) {
        this.y = this.targetY;
        this.falling = false;
        this.rebound = true;
        this.reboundSpeed = -this.fallSpeed * this.friction; // Calcular la velocidad de rebote
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
        }
      }
    }
  }

  isClicked(x, y) {
    const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    return distance <= this.radius;
    // return (
    //   x >= this.x &&
    //   x <= this.x + this.width &&
    //   y >= this.y &&
    //   y <= this.y + this.height
    // );
  }

  isMouseOver(x, y) {
    return this.isClicked(x, y);
  }

  onClick() {
    console.log("Token clicked");
  }

  startDragging(mouseX, mouseY) {
    this.isDragging = true;
    this.offsetX = mouseX - this.x;
    this.offsetY = mouseY - this.y;
  }

  drag(mouseX, mouseY) {
    if (this.isDragging) {
      this.setPos(mouseX - this.offsetX, mouseY - this.offsetY);
    }
  }

  drop(targetY) {
    this.isDragging = false;
    this.falling = true;
    this.fallSpeed = 0; // Reiniciar la velocidad de caída
    this.targetY = targetY;
  }
}

export default Token;
