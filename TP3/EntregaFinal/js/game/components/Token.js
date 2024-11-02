"use strict";

import GameObject from "../abstract/GameObject.js";

class Token extends GameObject {
  /**
   * @param {Object} param
   * @param {number} param.x
   * @param {number} param.y
   * @param {number} param.width
   * @param {number} param.height
   * @param {string} param.color
   * @param {boolean} param.isDragging
   */
  constructor({ x, y, width, height, color }) {
    super(x, y, width, height);
    this.color = color;
    this.isDragging = false;
    this.radius = 30;
  }

  drag() {
    this.isDragging = true;
  }

  drop() {
    this.isDragging = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  /**
   * Updates the token state.
   * @param {number} deltaTime
   */
  update(deltaTime) {
    // Cuando arrastramos el token, actualizamos su posición
    if (this.isDragging) {
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
