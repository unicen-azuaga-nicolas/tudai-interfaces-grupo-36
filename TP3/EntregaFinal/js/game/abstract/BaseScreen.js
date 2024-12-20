"use strict";

import Game from "../Game.js";
import GameObject from "./GameObject.js";

/**
 * Clase abstracta para representar una pantalla del juego
 * @abstract
 */
class BaseScreen extends GameObject {
  constructor() {
    super(0, 0, Game.canvas.width, Game.canvas.height);

    /**
     * @type {GameObject[]}
     */
    this.children = [];
    this.backgroundColor = "green";

    this.create();

    if (new.target === BaseScreen) {
      throw new Error("No puedes instanciar BaseScreen directamente");
    }
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  fillBackground() {
    Game.ctx.fillStyle = this.backgroundColor;
    Game.ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Image} image
   */
  fillBackgroundImage(image) {
    Game.ctx.drawImage(image, 0, 0, Game.canvas.width, Game.canvas.height);
  }

  draw() {
    this.children.forEach((child) => child.draw());
  }

  update(deltaTime) {
    this.children.forEach((child) => child.update(deltaTime));
  }

  isClicked(x, y) {
    return this.children.some((child) => child.isClicked(x, y));
  }

  isMouseOver(x, y) {
    return this.children.some((child) => child.isMouseOver(x, y));
  }

  destroy() { 
    this.children = []; 
  }
  /**
   * Método para crear los elementos de la pantalla
   * @abstract
   */
  create() {
    throw new Error("You have to implement the method create!");
  }
}

export default BaseScreen;
