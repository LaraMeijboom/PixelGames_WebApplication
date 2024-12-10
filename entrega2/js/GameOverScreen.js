class GameOverScreen {
    constructor(ctx, winner, botonMenu, botonRestart, text) {
        this.ctx = ctx;
        this.winner = winner;
        this.botonMenu = botonMenu;
        this.botonRestart = botonRestart;
        this.text = text;

        this.hidden = false;

    }

    draw() {

        if (this.hidden) {
            return
        }
        /* Configuramos el font y style */
        this.ctx.fillStyle = "#751500"; // Color del texto
        const fontMayor = "bold 45px Arial"
        const fontMenor = "bold 20px Arial"

        let textW = 0;
        if (this.winner) {
            /* Hay ganador por lo tanto hay que dibujar con doble linea */

            let [texto, ganador] = this.text.split("-")

            this.ctx.font = fontMenor;

            let textX1 = 450 - this.ctx.measureText(texto).width / 2;
            let textW1 = this.ctx.measureText(texto).width;

            let textH1 = 20
            textH1 = textH1 - textH1 / 3;

            this.ctx.font = fontMayor;

            let textW2 = this.ctx.measureText(texto).width;

            let textH2 = 45
            textH2 = textH2 - textH2 / 3;

            let textX2 = 450 - this.ctx.measureText(ganador).width / 2;

            let textH = textH1 + textH2 + 20;

            let textY1 = 250 + textH1 / 2 - textH2 / 2 - 10
            let textY2 = 250 + textH / 2

            textW = textW1 > textW2 ? textW1 : textW2;

            this.dibujarFondo(textW, textH, 250 - textH / 2)

            this.ctx.fillStyle = "white"; // Color del texto
            
            this.ctx.font = fontMenor;
            this.ctx.fillText(texto, textX1, textY1);
            
            this.ctx.font = fontMayor;
            this.ctx.fillText(ganador, textX2, textY2);

        } else {
            /* No hay ganador así que solo hay una linea de texto */

            this.ctx.font = fontMayor;
            textW = this.ctx.measureText(this.text).width

            let textH = 45
            textH = textH - textH / 3;

            let textX = 450 - textW / 2;
            let textY = 250 + textH / 2;

            this.dibujarFondo(textW, textH, 250 - textH / 2)

            this.ctx.fillStyle = "white"; // Color del texto

            this.ctx.fillText(this.text, textX, textY);

        }

    }

    dibujarFondo(textW, textH, textY) {

        this.ctx.fillStyle = "rgb(0, 0 ,0, 0.75)";
        this.ctx.fillRect(0, 0, 900, 500);

        /* Dibujamos el rectangulo del nombre */
        const maxW = 900

        let rectW = textW + 250; // Ancho del rectángulo
        rectW = rectW > maxW ? maxW : rectW

        let rectX = 450 - rectW / 2; // Posición X del rectángulo

        let rectH = textH + 100

        const rectY = textY - 50; // Posición Y del rectángulo

        this.ctx.fillStyle = "gray";

        this.ctx.fillStyle = "#600000"; 
        this.ctx.fillRect(rectX, rectY, rectW, rectH); // Rectángulo del fondo
        
        // Dibuja el borde del rectángulo
        this.ctx.strokeStyle = "black"; 
        this.ctx.lineWidth = 3; 
        this.ctx.strokeRect(rectX, rectY, rectW, rectH); // Rectángulo del borde
        
        this.botonMenu.posx = 450 - this.botonMenu.radio - 15
        this.botonRestart.posx = 450 + this.botonMenu.radio + 15

        this.botonMenu.posy = 250 + rectH / 2 + 50
        this.botonRestart.posy = 250 + rectH / 2 + 50

        this.botonMenu.draw()
        this.botonRestart.draw()

    }

}