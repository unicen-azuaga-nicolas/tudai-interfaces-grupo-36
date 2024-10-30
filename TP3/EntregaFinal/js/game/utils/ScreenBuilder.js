class ScreenBuilder {
  /**
   *
   * @param {BaseScreen} screen
   */
  constructor(screen) {
    /**
     * @type {BaseScreen}
     */
    this.screen = screen;
    this.elements = [];
    this.backgroundColor = "white";
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
    return this;
  }

  addTitle(x, y, width, height, text, fontSize) {
    const title = new Title(x, y, width, height, text, fontSize);
    this.elements.push(title);
    return this;
  }

  addButton(x, y, width, height, text, onClick) {
    const button = new Button({ x, y, width, height, text, onClick });
    this.elements.push(button);
    return this;
  }

  build() {
    this.screen.setBackgroundColor(this.backgroundColor);
    this.elements.forEach((element) => this.screen.add(element));
  }
}
