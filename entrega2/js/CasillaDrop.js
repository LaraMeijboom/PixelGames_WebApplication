class CasillaDrop {
    constructor(posx, posy, gap, width, height, ctx) {
        this.posx = posx;
        this.posy = posy;
        this.gap = gap;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.fillColor = 'rgba(0,0,0,0.5)';
        this.visible = false;
        // Propiedades para el movimiento de la flecha
        this.arrowOffset = 0; // Desplazamiento de la flecha
        this.arrowDirection = 1; // Dirección del movimiento (1 = abajo, -1 = arriba)
    }

    draw() {
        if (this.visible) {
            // Dibujar el rectángulo del área de drop
            this.ctx.fillStyle = this.fillColor;
            this.drawRoundedRect(this.posx, this.posy, this.width, this.height, 20);
            this.ctx.fill();

            // Calcular las coordenadas centrales para la flecha y aplicar el desplazamiento
            const centerX = this.posx + (this.width / 2);
            const centerY = this.posy + (this.height / 2) - 10 + this.arrowOffset;

            // Dibujar la flecha con desplazamiento animado
            this.dibujarFlecha(centerX, centerY);

            // Actualizar el desplazamiento para animar el movimiento de la flecha
            this.updateArrowPosition();
        }
    }

    dibujarFlecha(x, y) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(Math.PI);

        // Dibuja la línea de la flecha
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -20);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Dibuja la punta de la flecha
        this.ctx.beginPath();
        this.ctx.moveTo(-5, -15);
        this.ctx.lineTo(0, -25);
        this.ctx.lineTo(5, -15);
        this.ctx.fillStyle = "white";
        this.ctx.fill();

        this.ctx.restore();
    }

    updateArrowPosition() {
        // Cambia el valor de arrowOffset para mover la flecha hacia arriba y abajo
        const maxOffset = 5; // Máximo desplazamiento de la flecha
        const speed = 0.5;   // Velocidad de la animación

        this.arrowOffset += this.arrowDirection * speed;

        // Cambia la dirección cuando llega al límite de desplazamiento
        if (this.arrowOffset >= maxOffset || this.arrowOffset <= -maxOffset) {
            this.arrowDirection *= -1;
        }
    }


    isPointInsideSquare(px, py) {

        return (
            px >= this.posx &&               // El punto está a la derecha del borde izquierdo del cuadrado
            px <= this.posx + this.width &&   // El punto está a la izquierda del borde derecho del cuadrado
            py >= this.posy &&                // El punto está debajo del borde superior del cuadrado
            py <= this.posy + this.width      // El punto está arriba del borde inferior del cuadrado
        );
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