class Tablero {

    constructor(x, img, canvas, ctx) {
        this.x = x;
        this.canvas = canvas;
        this.MAXCOLS = x + 3;
        this.MAXFILAS = x + 2;
        this.fichasCount = this.MAXCOLS * this.MAXFILAS
        this.casillas = [];
        this.cellImage = img;
        this.ctx = ctx;
        this.casillasDrop = [];

        // Calcular el tamaño de los casilleros
        this.cellSize = 45;
        this.width = this.cellSize * this.MAXFILAS

        // Calculo cuanto corro el tablero dentro del canvas
        this.offSetX = (this.canvas.width - this.MAXCOLS * this.cellSize) / 2;
        this.offSetY = (500 - this.cellSize * (this.MAXFILAS - 2)) / 2;

        const dropAreaGap = 2.5;
        const dropAreaSize = this.cellSize - 5;
        let dropAreaX = this.offSetX + dropAreaGap;
        const dropAreaY = this.offSetY - dropAreaSize - dropAreaGap;

        for (let i = 0; i < this.MAXCOLS; i++) {

            const dropArea = new CasillaDrop(dropAreaX, dropAreaY, dropAreaGap, dropAreaSize, dropAreaSize, this.ctx);
            this.casillasDrop.push(dropArea);
            dropAreaX += dropAreaSize + dropAreaGap * 2;
        }

        for (let fila = 0; fila < this.MAXFILAS; fila++) {

            const filaCasillas = [];

            for (let col = 0; col < this.MAXCOLS; col++) {
                // Posición de cada casillero
                const x = (col * this.cellSize) + this.offSetX;
                const y = (fila * this.cellSize) + this.offSetY;

                const casilla = new Casilla(x, y, ctx, this.cellImage, null, this.cellSize);

                filaCasillas.push(casilla);

            }

            this.casillas.push(filaCasillas);
        };
    }

    countFichaAndCheck() {
        this.fichasCount -= 1;

        return this.fichasCount <= 0;
    }

    getFichasCount() {
        return this.fichasCount;
    }



    //nuevo
    drawDropAreas() {
        this.casillasDrop.forEach(dropArea => {
            dropArea.draw();

        });

    }

    drawFondo() {
        // Dibujar el tablero con la imagen de casillero
        for (let fila = 0; fila < this.MAXFILAS; fila++) {
            for (let col = 0; col < this.MAXCOLS; col++) {
                this.casillas[fila][col].drawFondo()
            }
        };

    }

    getLowerCasillaByIndex(col) {
        let fila = this.MAXFILAS - 1;
        while (fila >= 0 && this.casillas[fila][col].ficha) {
            fila--;
        }

        if (fila < 0) {
            return null;
        }

        return fila;

    }

    draw() {

        // Dibujar el tablero con la imagen de casillero
        for (let fila = 0; fila < this.MAXFILAS; fila++) {

            for (let col = 0; col < this.MAXCOLS; col++) {
                this.casillas[fila][col].draw()
            }
        };


    }


}