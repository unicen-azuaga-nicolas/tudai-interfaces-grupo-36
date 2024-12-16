import GameObject from "../abstract/GameObject.js";
import Game from "../Game.js";
import Button from "./Button.js";

class ExitButtonComposite extends GameObject {
  constructor(options) {
    super(options.x, options.y, options.width, options.height);
    this.button = new Button({
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      textColor: options.textColor,
      fontSize: options.fontSize,
      fontFamily: options.fontFamily,
      background: options.background,
      onClick: options.onClick,
      backgroundImage: Game.assets[10],
    });

    this.icon = new Button({
      x: options.x + 25,
      y: options.y + 25,
      width: 40,
      height: 30,
      color: options.iconColor,
      onClick: options.onClick,
      backgroundImage: Game.assets[13],
    });
  }

  draw(ctx) {
    this.button.draw(ctx);
    this.icon.draw(ctx);
  }

  onClick() {
    console.log("ExitButtonComposite.onClick", event);
    this.button.onClick();
    this.icon.onClick();
  }
}

export default ExitButtonComposite;
