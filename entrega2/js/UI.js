class UI {
    constructor(botonMenu, botonReiniciar, temporizador) {
        this.botonMenu = botonMenu
        this.botonReiniciar = botonReiniciar
        this.temporizador = temporizador
    }
    
    restaurarPosiciones(){
        this.botonMenu.posx = this.botonMenu.initialX
        this.botonMenu.posy = this.botonMenu.initialY
        this.botonReiniciar.posx = this.botonReiniciar.initialX
        this.botonReiniciar.posy = this.botonReiniciar.initialY
    }
    


    draw(){
        this.botonMenu.draw()
        this.botonReiniciar.draw()
        this.temporizador.draw()
    }

}