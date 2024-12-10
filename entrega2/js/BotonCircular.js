class BotonCircular {
    constructor(posx, posy, radio, image) {
        this.posx = posx;
        this.initialX = posx;
        this.posy = posy;
        this.initialY = posy;
        this.radio = radio;
        this.img = image;
    }

    draw() {
        const bkgColor = "#FFFFFF"; // Color de fondo por defecto si es necesario

        this.img.onload = () => {
            ctx.save();

            ctx.beginPath();
            ctx.arc(this.posx, this.posy, this.radio, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.clip();

            const scale = 0.8; 
            const imgWidth = this.radio * 2 * scale;
            const imgHeight = this.radio * 2 * scale;

            const imgX = this.posx - imgWidth / 2;
            const imgY = this.posy - imgHeight / 2;

            ctx.drawImage(this.img, imgX, imgY, imgWidth, imgHeight);

            ctx.restore();
        };

        if (this.img.complete) {
            this.img.onload();
        }
    }

    // Verificar si un punto (x, y) está dentro del botón
    isClicked(x, y) {
        const dist = Math.sqrt((x - this.posx) ** 2 + (y - this.posy) ** 2);
        return dist <= this.radio;
    }
}
