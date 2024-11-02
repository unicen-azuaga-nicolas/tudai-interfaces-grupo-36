class Board {
  constructor(col, fil, ctx, imagen, tamanioCasillero, modoJuego) {
    this.col = col;
    this.fil = fil;
    /** @type {CanvasRenderingContext2D} */
    this.ctx = ctx;
    this.imagen = imagen;
    this.tamanioCasillero = tamanioCasillero;
    this.modoJuego = modoJuego;
    this.matriz = Array.from({ length: fil }, () => Array(col).fill(null));
  }

  // Dibuja el tablero con sus respectivas casillas y fichas
  dibujar() {
    this.ctx.save();
    this.ctx.beginPath();
    const xInicio = Game.canvas.width / 2 - (this.tamanioCasillero * this.col) / 2;
    const yInicio = Game.canvas.height / 2 - (this.tamanioCasillero * this.fil) / 2;

    // Dibujar borde del tablero
    this.ctx.rect(xInicio, yInicio, this.col * this.tamanioCasillero, this.fil * this.tamanioCasillero);
    this.ctx.strokeStyle = "#013636";
    this.ctx.lineWidth = 7;
    this.ctx.stroke();
    this.ctx.closePath();

    // Dibujar cada casilla y la imagen de fondo
    for (let fila = 0; fila < this.fil; fila++) {
      for (let columna = 0; columna < this.col; columna++) {
        this.ctx.beginPath();
        const x = xInicio + columna * this.tamanioCasillero;
        const y = yInicio + fila * this.tamanioCasillero;
        this.ctx.drawImage(this.imagen, x, y, this.tamanioCasillero, this.tamanioCasillero);
        this.ctx.closePath();

        // Dibuja la ficha si existe en esta posición
        if (this.matriz[fila][columna]) {
          this.matriz[fila][columna].dibujar(this.ctx, x + this.tamanioCasillero / 2, y + this.tamanioCasillero / 2);
        }
      }
    }

    this.ctx.restore();
  }

  // Inserta una ficha en la columna especificada
  insertarFicha(columna, ficha) {
    for (let fila = this.fil - 1; fila >= 0; fila--) {
      if (!this.matriz[fila][columna]) {
        this.matriz[fila][columna] = ficha;
        const x = Game.canvas.width / 2 - (this.tamanioCasillero * this.col) / 2 + columna * this.tamanioCasillero + this.tamanioCasillero / 2;
        const y = Game.canvas.height / 2 - (this.tamanioCasillero * this.fil) / 2 + fila * this.tamanioCasillero + this.tamanioCasillero / 2;
        ficha.soltarEn(x, y);
        break;
      }
    }
  }

  // Verifica si hay un ganador
  hayGanador() {
    const direcciones = [
      [0, 1],   // Derecha
      [1, 0],   // Abajo
      [1, 1],   // Diagonal descendente
      [1, -1]   // Diagonal ascendente
    ];

    for (let fila = 0; fila < this.fil; fila++) {
      for (let columna = 0; columna < this.col; columna++) {
        const fichaActual = this.matriz[fila][columna];
        if (!fichaActual) continue;

        // Verificar cada dirección
        for (const [df, dc] of direcciones) {
          let contador = 1;

          for (let paso = 1; paso < this.modoJuego; paso++) {
            const nuevaFila = fila + paso * df;
            const nuevaColumna = columna + paso * dc;

            if (nuevaFila < 0 || nuevaFila >= this.fil || nuevaColumna < 0 || nuevaColumna >= this.col) break;
            if (fichaActual.esIgual(this.matriz[nuevaFila][nuevaColumna])) {
              contador++;
            } else {
              break;
            }
          }

          if (contador === this.modoJuego) return true;
        }
      }
    }

    return false;
  }
}
