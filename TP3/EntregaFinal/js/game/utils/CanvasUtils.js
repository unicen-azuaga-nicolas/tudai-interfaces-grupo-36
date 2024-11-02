import Game from "../Game.js";

class CanvasUtils {
  // Método estático para establecer x de manera relativa
  static setRelativeX(xPercent) {
    return (Game.canvas.width * xPercent) / 100;
  }

  // Método estático para establecer y de manera relativa
  static setRelativeY(yPercent) {
    return (Game.canvas.height * yPercent) / 100;
  }

  // Método estático para establecer width de manera relativa
  static setRelativeWidth(widthPercent) {
    return (Game.canvas.width * widthPercent) / 100;
  }

  // Método estático para establecer height de manera relativa
  static setRelativeHeight(heightPercent) {
    return (Game.canvas.height * heightPercent) / 100;
  }
}

export default CanvasUtils;
