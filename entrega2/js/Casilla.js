
class Casilla {

    constructor(x,y,ctx,imagen,ficha,cellSize) {
        this.posx = x;
        this.posy = y;
        this.ctx = ctx
        this.img = imagen;
        this.ficha = ficha;
        this.cellSize = cellSize;
    }

    draw() {
        // Dibujar la img del casillero
        this.ctx.drawImage(this.img, this.posx, this.posy, this.cellSize, this.cellSize);
    }

    drawFondo() {
        this.ctx.fillStyle = "rgb(0,0,0,0.85)";
        // Dibujar la img del casillero
        this.ctx.fillRect(this.posx, this.posy, this.cellSize, this.cellSize);
    }
}