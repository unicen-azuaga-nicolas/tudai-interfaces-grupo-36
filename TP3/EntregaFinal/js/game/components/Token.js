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
  }

  drag() {
    this.isDragging = true;
  }

  draw(ctx) {
    const radius = 30;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
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
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  isMouseOver(x, y) {
    return this.isClicked(x, y);
  }
}
