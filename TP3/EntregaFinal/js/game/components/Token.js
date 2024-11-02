"use strict";

import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";

class Token extends GameObject {
  /**
   * @param {Object} param
   * @param {number} param.x
   * @param {number} param.y
   * @param {number} param.width
   * @param {number} param.height
   * @param {number} param.radius
   * @param {string} param.backgroundImage
   */
  constructor({ x, y, width, height, radius, backgroundImage }) {
    super(x, y, width, height);
    this.radius = radius;
    this.backgroundImage = backgroundImage;
    this.isDragging = false;
    this.isLocked = true;
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  drag() {
    this.isDragging = true;
  }

  drop() {
    this.isDragging = false;
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
    // Cuando arrastramos el token, actualizamos su posición
    if (this.isDragging && !this.isLocked) {
      this.x = this.x + mouseX - lastMouseX;
      this.y = this.y + mouseY - lastMouseY;
    }
  }

  isClicked(x, y) {
    const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    return distance < this.radius;
  }

  isMouseOver(x, y) {
    return this.isClicked(x, y);
  }
}

export default Token;
