class Fichero {
    constructor(player, x, nombre, fichaImg, fichasCount, turno, posx, posy, ctx) {
        this.x = x;
        this.player = player;
        this.posx = posx;
        this.posy = posy;
        this.width = 100;
        this.height = 225;
        this.nombre = nombre;
        this.fichaImg = fichaImg;
        this.turno = turno;
        this.fillColor = '#02020267';
        this.borderColor = '#02020267';
        this.ctx = ctx;
        this.fichasCount = fichasCount;
        this.fichas = [];

        // Inicializamos las fichas con espaciado ajustado
        let fichaX = this.posx + this.width - 20 / 2;
        let fichaVerticalGap = this.calculateFichaGap();
        let fichaY = this.posy + this.height - 30;

        for (let fichaIndex = 0; fichaIndex < this.fichasCount; fichaIndex++) {
            const ficha = new Ficha(this.player, fichaX, fichaY, 20, this, fichaIndex);
            this.fichas.push(ficha);
            fichaY -= fichaVerticalGap;
        }
    }

    calculateFichaGap() {
        // Calcula el espacio entre fichas según el número de fichas
        switch (this.x) {
            case 4: return 8;
            case 5: return 6;
            case 6: return 4.5;
            case 7: return 3.6;
            case 8: return 3;
            case 9: return 2.5;
            default: return 2.1;
        }
    }

    draw() {
        // Dibujamos el fondo con gradiente
        const gradient = this.ctx.createLinearGradient(this.posx, this.posy, this.posx, this.posy + this.height);
        gradient.addColorStop(0, '#333');
        gradient.addColorStop(1, '#111');

        this.ctx.fillStyle = gradient;

        if (this.turno) {
            this.ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
            this.ctx.shadowBlur = 20;
        } else {
            this.ctx.shadowColor = 'rgba(255, 255, 255, 0.25)';
            this.ctx.shadowBlur = 10;

        }
        this.drawRoundedRect(this.posx + 50, this.posy, this.width - 20, this.height, 20);
        this.ctx.fill();

        // Dibujamos el borde del rectángulo principal
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.stroke();

        // Dibujamos el rectángulo del nombre con sombra y borde
        const rectX = this.posx;
        const rectY = this.posy - 70;
        const rectWidth = this.width + 70;
        const rectHeight = 50;

        // Aplicamos sombra al rectángulo del nombre

        // Dibujamos el fondo del rectángulo del nombre
        this.ctx.fillStyle = '#333333BB';
        this.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 15);
        this.ctx.fill();

        // Dibujamos el borde del rectángulo del nombre
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#02020267';
        this.ctx.stroke();

        // Dibujamos el texto del nombre
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 24px 'Roboto', sans-serif";
        const title = this.nombre;
        const textWidth = this.ctx.measureText(title).width;
        const textX = rectX + (rectWidth / 2) - (textWidth / 2);
        const textY = rectY + (rectHeight / 2) + 8;
        this.ctx.fillText(title, textX, textY);

        // Restablecemos las propiedades de sombra para evitar efectos no deseados en otros elementos
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
    }


    drawRoundedRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
}
