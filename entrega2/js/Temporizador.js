class Temporizador {
    constructor(posx, posy, width, height, ctx, juego) {
        this.tiempo = 179;
        this.width = width;
        this.height = height;
        this.posx = posx;
        this.posy = posy;
        this.ctx = ctx;
        this.juego = juego
        this.timerUp = false;
        
    }

    restart() {
        this.stop()
        this.iniciarContador()
    }

    stop() {
        clearInterval(this.timerInterval);
        clearInterval(this.drawInterval);
    }

    iniciarContador() {
        this.timerUp = false;
        this.visible = true;
        this.tiempo = 179

        this.timerInterval = setInterval(() => {
            if (!this.timerUp) {
                this.tiempo--;
                if (this.tiempo == 0) {

                    this.timerUp = true;
                    this.juego.endGameTimeUp()
                }
            } else {
                clearInterval(this.timerInterval)
            }
        }, 1000);

        this.drawInterval = setInterval(() => {
            this.draw();
        }, 1000)
    }

    draw() {
        if (!this.visible) {
            return
        }
        const offsetY = 8;
        const padding = 20; 
        const backgroundWidth = this.width + padding * 2; // Ancho del fondo con padding
        const backgroundHeight = 33; // Alto del fondo
        const backgroundPosX = this.posx - 20;
        const borderRadius = 15; 

        this.ctx.fillStyle = "#911813"; 
        this.ctx.beginPath();

        // Dibuja el rectángulo con esquinas redondeadas
        this.ctx.moveTo(backgroundPosX + borderRadius, this.posy + offsetY - backgroundHeight);
        this.ctx.lineTo(backgroundPosX + backgroundWidth - borderRadius, this.posy + offsetY - backgroundHeight);
        this.ctx.arcTo(backgroundPosX + backgroundWidth, this.posy + offsetY - backgroundHeight, backgroundPosX + backgroundWidth, this.posy + offsetY - backgroundHeight + backgroundHeight, borderRadius);
        this.ctx.lineTo(backgroundPosX + backgroundWidth, this.posy + offsetY - backgroundHeight + backgroundHeight - borderRadius);
        this.ctx.arcTo(backgroundPosX + backgroundWidth, this.posy + offsetY - backgroundHeight + backgroundHeight, backgroundPosX + backgroundWidth - borderRadius, this.posy + offsetY - backgroundHeight + backgroundHeight, borderRadius);
        this.ctx.lineTo(backgroundPosX + borderRadius, this.posy + offsetY - backgroundHeight + backgroundHeight);
        this.ctx.arcTo(backgroundPosX, this.posy + offsetY - backgroundHeight + backgroundHeight, backgroundPosX, this.posy + offsetY - backgroundHeight + backgroundHeight - borderRadius, borderRadius);
        this.ctx.lineTo(backgroundPosX, this.posy + offsetY - backgroundHeight + borderRadius);
        this.ctx.arcTo(backgroundPosX, this.posy + offsetY - backgroundHeight, backgroundPosX + borderRadius, this.posy + offsetY - backgroundHeight, borderRadius);
        this.ctx.closePath();
        this.ctx.fill(); 

        // Dibuja el borde del rectángulo con esquinas redondeadas
        this.ctx.strokeStyle = "black"; 
        this.ctx.lineWidth = 3; 
        this.ctx.stroke(); // Dibuja el borde
        
        // Configura el estilo del texto
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px monospace";

        const minutos = Math.floor(this.tiempo / 60);
        const segundos = Math.floor(this.tiempo % 60);
        const mText = minutos > 9 ? `${minutos}` : `0${minutos}`
        const sText = segundos > 9 ? `${segundos}` : `0${segundos}`

        // Dibuja el contador en el canvas
        const textX = this.posx + padding; // Posición X del texto con padding
        const textY = this.posy + offsetY - 10; // Posición Y del texto
        this.ctx.fillText(`${mText}:${sText}`, this.posx, this.posy);
    }
}