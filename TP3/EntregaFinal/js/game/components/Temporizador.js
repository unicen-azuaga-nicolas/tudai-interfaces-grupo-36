export default class Temporizador {
    constructor(tiempo, ctx, fondo) {
        this.tiempo = tiempo;
        this.ctx = ctx;
        this.pausado = true;
        this.fondo = fondo;
        this.intervalo = null; // Guardar el ID del intervalo
    }

    iniciar() {
        if (!this.intervalo) { // Evita iniciar múltiples intervalos
            this.pausado = false;
            this.intervalo = setInterval(() => this.decrementarTiempo(), 1000); // Usar setInterval
        }
    }

    pausar() {
        this.pausado = true;
        if (this.intervalo) {
            clearInterval(this.intervalo); // Detener el intervalo
            this.intervalo = null;
        }
    }

    borrar() {
        // Limpiar el área donde se dibuja el temporizador
        this.ctx.clearRect(70, 20, 420, 150);
    }

    decrementarTiempo() {
        if (!this.pausado) {
            if (this.tiempo <= 0) {
                this.empate();
            } else {
                this.tiempo--;
                this.dibujar();
            }
        }
    }

    empate() {
        console.log("Tiempo terminado: Empate");
        this.pausar(); // Detener el temporizador
    }

    dibujar() {
        this.ctx.save();
        this.ctx.drawImage(this.fondo, 70, 20, 420, 150);
        this.ctx.font = '50px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.formatearTiempo(this.tiempo), 340, 115);
        this.ctx.restore();
    }

    formatearTiempo(tiempo) {
        const minutos = Math.floor(tiempo / 60);
        const segundos = tiempo % 60;
        return `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }
}
