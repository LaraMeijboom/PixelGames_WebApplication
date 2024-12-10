
const canvas = document.getElementById("canvas-juego");
const contPlayer1 = document.getElementById("container-player1");
const contPlayer2 = document.getElementById("container-player2");
const ctx = canvas.getContext("2d");

let x = 4;
let player1_selected = false;
let player2_selected = false;
const Xenlinea = document.getElementById("X-en-linea");
Xenlinea.innerText = x;

let playerTurno = 1;
let mouseDown = false;
let fichaActiva = null;
let fichaCayendo = 0;
let offSetX;
let offSetY;
let isInside = false;
let indiceDropArea = 0;
let game = null;

const menu_inicial_node = document.getElementById("menu-inicial");

const btn_jugar = document.getElementById("btn-jugar");

const btn_mas = document.getElementById("X_en_linea_+");
const btn_menos = document.getElementById("X_en_linea_-");

const player_1_ficha_node = document.getElementById("player-1-ficha");
const player_2_ficha_node = document.getElementById("player-2-ficha");
const player_1_name_input = document.getElementById("player-1-name")
const player_2_name_input = document.getElementById("player-2-name")
const juegoDivNodoContainer = document.getElementById("juego-div").getBoundingClientRect();

const fichas_seleccionables = document.querySelectorAll(".ficha-seleccionable");

/* prepara las fichas seleccionables en el menu de seleccion */
for (let i = 0; i < fichas_seleccionables.length; i++) {
    const ficha = fichas_seleccionables[i];

    const player_objetivo_id = ficha.parentElement.id.split("-")[2];
    const ficha_activa = document.getElementById(`player-${player_objetivo_id}-ficha`);

    ficha.addEventListener("click", (e) => {

        const ficha_seleccionada = e.target;
        if (ficha_seleccionada.classList.contains("ficha-selected")) {
            return;
        }

        if (player_objetivo_id == 1) {
            if (!player1_selected) {
                player1_selected = true;
            }
        } else if (player_objetivo_id == 2) {
            if (!player2_selected) {
                player2_selected = true;
            }
        }

        //deseleccionar la que estaba selected para que ahora pueda ser seleccionada nuevamente
        for (let i = 0; i < fichas_seleccionables.length; i++) {
            if (fichas_seleccionables[i].src == ficha_activa.src) {
                fichas_seleccionables[i].classList.remove("ficha-selected")
            }
        }

        //seleccionar la que acaba de ser seleccionada para que no pueda serlo de nuevo
        for (let i = 0; i < fichas_seleccionables.length; i++) {
            if (fichas_seleccionables[i].src == ficha_seleccionada.src) {
                fichas_seleccionables[i].classList.add("ficha-selected")
            }
        }

        ficha_activa.src = ficha_seleccionada.src;


    })

}

/* incrementa x en linea hasta 7 */
btn_mas.addEventListener("click", () => {
    if (x < 7) {
        x++;
        Xenlinea.innerText = x;
    }
})
/* decrementa x en linea hasta 4 */

btn_menos.addEventListener("click", () => {
    if (x > 4) {
        x--;
        Xenlinea.innerText = x;
    }
})

/* Inicia el juego */
btn_jugar.addEventListener("click", () => {

    if (!player1_selected || !player2_selected) {
        return;
    }

    menu_inicial_node.classList.add("hidden");

    iniciarJuego();

})

/* Deberia traernos al menu principal y permitirnos cambiar valores*/
function volverMenu() {
    configuracionDefault()
}

/* Restaura la configuración original default */
function configuracionDefault() {
    x = 4;
    player1_selected = false;
    player2_selected = false;
    playerTurno = 1;
    mouseDown = false;
    fichaActiva = null;
    isInside = false;
    fichaCayendo = 0;
    indiceDropArea = 0;
    game = null;
    Xenlinea.innerText = x;
    player_1_name_input.value = "";
    player_2_name_input.value = "";
    player_1_ficha_node.src = "../images/signo-de-pregunta.png";
    player_2_ficha_node.src = "../images/signo-de-pregunta.png";

    for (let i = 0; i < fichas_seleccionables.length; i++) {
        const fichaNodo = fichas_seleccionables[i];
        fichaNodo.classList.remove("ficha-selected")

    }

}

/* Ejecuta una partida con los datos cargados */
function iniciarJuego() {

    name1 = player_1_name_input.value == "" ? "Jugador1" : player_1_name_input.value ;
    name2 = player_2_name_input.value == "" ? "Jugador2" : player_2_name_input.value ;

    img1 = player_1_ficha_node.src;
    img2 = player_2_ficha_node.src;

    //prepara imagen de tablero
    const tableroImage = new Image();
    tableroImage.src = '../images/casilleroMuro.png';

    tableroImage.onload = () => {
        game = new Juego(x, tableroImage, name1, name2, img1, img2, ctx);

        game.jugar();
        game.redibujarCanvas()

    }
}

function comenzar() {
    document.getElementById("pantalla-inicial").classList.add("hidden");
    document.getElementById("menu-inicial").classList.remove("hidden");
}

class Juego {

    constructor(x, tableroImage, jug1, jug2, ficha1, ficha2, ctx) {
        this.gameOver = false;
        this.ctx = ctx;
        this.x = x;
        this.tablero = new Tablero(x, tableroImage, canvas, ctx);

        let fichasCount = Math.ceil(this.tablero.getFichasCount() / 2);

        this.fichero1 = new Fichero(1, x, jug1, ficha1, fichasCount, true, 25, 250, ctx);
        this.fichero2 = new Fichero(2, x, jug2, ficha2, fichasCount, false, 700, 250, ctx);

        const imgBtnMenu = new Image();
        imgBtnMenu.src = "../images/flecha.png";
        const imgBtnRestart = new Image();
        imgBtnRestart.src = "../images/reiniciar.png";

        this.UI = new UI(
            new BotonCircular(50, 35, 25, imgBtnMenu),
            new BotonCircular(105, 35, 25, imgBtnRestart),
            new Temporizador(420, 40, 60, 50, ctx, this)
        )

    }

    /* Le aplica la animación a la ficha que recibe por parametro (fichaACtiva deberia ser) */
    animarFicha(ficha) {
        if (!ficha.animandose) {
            return;
        }
        // Actualiza la velocidad con la gravedad en cada cuadro
        ficha.velocidadY += ficha.gravedad;

        // Actualiza la posición Y con la velocidad
        ficha.y += ficha.velocidadY;

        // Si la ficha alcanza o supera la posición final, aplica el rebote
        if (ficha.y >= ficha.destinoY) {
            ficha.y = ficha.destinoY; // Asegura que no pase de la posición final
            ficha.velocidadY *= ficha.rebote; // Invierte la velocidad para el rebote

            // Detiene la animación si el rebote es muy pequeño
            if (Math.abs(ficha.velocidadY) < 0.5) { // Pequeño umbral para terminar el rebote

                ficha.velocidadY = 0;
                ficha.y = ficha.destinoY; // Asegura que queda en posición final

                if (fichaCayendo == 1) {
                    game.redibujarCanvas();
                }
                ficha.animandose = false;
                fichaCayendo--;
                return; // Detiene la animación
            }
        }

        game.redibujarCanvas();

        // Solicita el siguiente cuadro de la animación
        requestAnimationFrame(() => this.animarFicha(ficha));
    }

    /* Finaliza el juego por tiempo */
    endGameTimeUp() {

        /* Empate */
        game.gameOver = true;
        game.gameOverScreen = new GameOverScreen(
            ctx,
            false,
            game.UI.botonMenu,
            game.UI.botonReiniciar,
            "TIEMPO AGOTADO"
        )

        game.redibujarCanvas()
    }

    /* Limpia eventListeners para cuando se vuelve al menu */

    limpiarEventListeners() {
        canvas.removeEventListener("mousedown", this.mouseDownCallback);
        canvas.removeEventListener("mouseup", this.mouseUpCallback);
        canvas.removeEventListener("mousemove", this.mouseMoveCallback);
        canvas.removeEventListener("click", this.clickBotonesCallback);
    }

    /* Maneja el evento al clickear el mouse y ejecuta la funcionalidad de los botones de menu y reiniciar */
    clickBotonesCallback(e) {

        const { offsetX: mouseX, offsetY: mouseY } = e;

        if (game.UI.botonMenu.isClicked(mouseX, mouseY)) {
            /* APRETE MENU */

            game.UI.temporizador.stop()
            game.limpiarCanvas()
            game.limpiarEventListeners()

            document.getElementById("menu-inicial").classList.remove("hidden");
            document.getElementById("canvas-juego").classList.add("hidden");
            configuracionDefault()
            return
        } else if (game.UI.botonReiniciar.isClicked(mouseX, mouseY)) {
            /* APRETE REINICIAR */
            game.gameOver = false;
            fichaCayendo = 0;
            game.tablero.casillas.forEach(fila => {
                fila.forEach(casilla => {
                    casilla.ficha = null;

                });
            });

            [...game.fichero1.fichas, ...game.fichero2.fichas].forEach(ficha => {
                playerTurno = 1;
                ficha.x = ficha.initialX
                ficha.radio = ficha.initialRadio
                ficha.y = ficha.initialY
                ficha.colocada = false;
                ficha.animandose = false;
                game.UI.restaurarPosiciones()
                game.UI.temporizador.restart()
                game.UI.temporizador.draw()
            });

            game.fichero1.turno = playerTurno == 1;
            game.fichero2.turno = playerTurno == 2;

            game.redibujarCanvas()
            return

        }
    }

    /* Maneja el evento al apretar el mouse */
    mouseDownCallback(e) {

        game.clickBotonesCallback(e)

        if (!game || game.gameOver) {
            return;
        }

        const { offsetX: mouseX, offsetY: mouseY } = e;
        isInside = false;

        // Buscar si se hizo clic en alguna ficha del jugador 1 o 2
        const fichasAll = [...game.fichero1.fichas, ...game.fichero2.fichas];

        let i = fichasAll.length - 1;

        while (i >= 0 && !fichaActiva) {
            const ficha = fichasAll[i];
            if (ficha.contienePunto(mouseX, mouseY)) {
                if (ficha.colocada) {
                    return;
                }
                if (playerTurno == ficha.player) {

                    fichaActiva = ficha;
                    offSetX = mouseX - ficha.x; // Diferencia X entre el clic y el centro de la ficha
                    offSetY = mouseY - ficha.y; // Diferencia Y entre el clic y el centro de la ficha
                    ficha.isDragging = true;    // Marcar que la ficha está siendo arrastrada
                }
            }
            i--;
        }

        if (fichaActiva) {
            game.tablero.casillasDrop.forEach(dropArea => {
                dropArea.visible = true;
            })
            game.animateDropArea();
            // Mover la ficha
            fichaActiva.x = mouseX;
            fichaActiva.y = mouseY;

        }

    }

    /* Maneja el evento al mover el mouse por el canvas */
    mouseMoveCallback(e) {
        if (game.gameOver) {
            return;
        }
        if (fichaActiva) { // Si hay una ficha arrastrada
            const { offsetX: mouseX, offsetY: mouseY } = e;
            // Mover la ficha
            fichaActiva.x = mouseX;
            fichaActiva.y = mouseY;

            //const dropArea = this.tablero.getDropAreaInPoint(mouseX, mouseY)
            isInside = false;
            indiceDropArea = 0;

            while (indiceDropArea < game.tablero.casillasDrop.length && !isInside) {
                const dropArea = game.tablero.casillasDrop[indiceDropArea];

                isInside = dropArea.isPointInsideSquare(mouseX, mouseY);

                if (!isInside) {
                    indiceDropArea++;
                }
            }

            const dropArea = game.tablero.casillasDrop[indiceDropArea];

            if (isInside) {
                fichaActiva.x = dropArea.posx + (dropArea.width / 2) /* + dropArea.gap */;
                fichaActiva.y = dropArea.posy + (dropArea.width / 2) /* + dropArea.gap */;
                fichaActiva.radio = dropArea.width / 2;
            } else {
                fichaActiva.radio = fichaActiva.initialRadio;

            }

            //game.redibujarCanvas(); // Redibujar el tablero con las nuevas posiciones
        }
    }

    /* Maneja el evento al soltar el mouse */
    mouseUpCallback(e) {

        if (game.gameOver) {
            return;
        }

        if (fichaActiva) {

            fichaActiva.x = fichaActiva.initialX
            fichaActiva.radio = fichaActiva.initialRadio;

            if (isInside) {
                // buscar la fila 
                const fila = game.tablero.getLowerCasillaByIndex(indiceDropArea);
                const casilla = game.tablero.casillas[fila][indiceDropArea]

                if (casilla) {
                    const dropArea = game.tablero.casillasDrop[indiceDropArea];

                    fichaActiva.x = casilla.posx + (casilla.cellSize / 2)
                    fichaActiva.destinoY = casilla.posy + (casilla.cellSize / 2)
                    fichaActiva.radio = dropArea.width / 2;

                    fichaActiva.colocada = true;
                    casilla.ficha = fichaActiva;

                    fichaActiva.animandose = true;
                    fichaCayendo++;
                    game.animarFicha(fichaActiva)
                    const espacioCompleto = game.tablero.countFichaAndCheck();
                    const hayGanador = game.checkWin(fila, indiceDropArea);

                    if (espacioCompleto || hayGanador) {

                        game.gameOver = true;
                        game.UI.temporizador.stop()

                        if (hayGanador) {
                            // Uno gano
                            game.gameOverScreen = new GameOverScreen(
                                ctx,
                                true,
                                game.UI.botonMenu,
                                game.UI.botonReiniciar,
                                `GANADOR-${playerTurno == 1 ? name1 : name2}`
                            )
                        } else {
                            // Empate
                            game.gameOverScreen = new GameOverScreen(
                                ctx,
                                false,
                                game.UI.botonMenu,
                                game.UI.botonReiniciar,
                                "EMPATE"
                            )
                        }

                    }

                    playerTurno = playerTurno == 1 ? 2 : 1;
                    game.fichero1.turno = playerTurno == 1;
                    game.fichero2.turno = playerTurno == 2;
                }
            }

            else {
                fichaActiva.y = fichaActiva.initialY
            }

            game.tablero.casillasDrop.forEach(dropArea => {
                dropArea.visible = false;
            })
            fichaActiva.isDragging = false;
            fichaActiva = null;
        }

        game.redibujarCanvas();
    }
    /* Setea los eventListeners para poder jugar, mover fichas, turnos e inicia el temporizador */
    jugar() {

        this.UI.temporizador.iniciarContador(); // Inicia el contador al crear el juego

        const canvas = document.getElementById("canvas-juego");
        canvas.classList.remove("hidden");

        canvas.addEventListener("click", this.clickBotonesCallback)

        canvas.addEventListener("mousedown", this.mouseDownCallback)

        canvas.addEventListener('mousemove', this.mouseMoveCallback);

        canvas.addEventListener('mouseup', this.mouseUpCallback);

    }

    /* Chequea si el movimiento que se realizó fue un movimiento ganador */
    checkWin(row, col) {
        return this.checkDirection(row, col, 1, 0) || // Horizontal
            this.checkDirection(row, col, 0, 1) || // Vertical
            this.checkDirection(row, col, 1, 1) || // Diagonal ↘
            this.checkDirection(row, col, 1, -1) // Diagonal ↙
    }

    /* Mira una direccion y chequea si hay x en linea */
    checkDirection(row, col, rowIncrement, colIncrement) {
        let count = 1; // Cuenta la ficha inicial
        for (let i = 1; i < this.x; i++) {
            const newRow = row + i * rowIncrement;
            const newCol = col + i * colIncrement;

            if (count >= this.x || newRow < 0 || newRow >= this.tablero.MAXFILAS
                || newCol < 0 || newCol >= this.tablero.MAXCOLS) {

                /* Me fui del tablero */

                break;

            } else if (!this.tablero.casillas[newRow][newCol].ficha) {
                /* No tengo ficha en esa casilla */

                break;

            } else if (this.tablero.casillas[newRow][newCol].ficha.player != playerTurno) {
                /* No es el jugador que tiro la ficha */
                break;
            } else {
                count++;
            }

        }

        for (let i = 1; i < this.x; i++) {
            const newRow = row - i * rowIncrement;
            const newCol = col - i * colIncrement;

            if (count >= this.x || newRow < 0 || newRow >= this.tablero.MAXFILAS
                || newCol < 0 || newCol >= this.tablero.MAXCOLS) {

                /* Me fui del tablero */

                break;

            } else if (!this.tablero.casillas[newRow][newCol].ficha) {
                /* No tengo ficha en esa casilla */

                break;

            } else if (this.tablero.casillas[newRow][newCol].ficha.player != playerTurno) {
                /* No es el jugador que tiro la ficha */
                break;
            } else {
                count++;
            }
        }

        return count >= this.x;
    }

    animateDropArea() {
        if (game && game.tablero.casillasDrop[0].visible) {
            if (fichaCayendo < 1) {
                game.redibujarCanvas();
            }
            requestAnimationFrame(() => this.animateDropArea());
        }
    }

    /* Redibuja todo el canvas, primero borra y luego dibuja en orden los elementos */
    redibujarCanvas() {

        this.limpiarCanvas()

        // this.tablero.drawFondo();

        this.tablero.drawDropAreas();
        this.tablero.drawFondo();

        this.fichero1.draw();
        this.fichero2.draw();

        [...this.fichero1.fichas, ...this.fichero2.fichas].forEach(ficha => {
            if (ficha.colocada) {
                ficha.draw(ctx)
            }
        });

        this.tablero.draw();

        [...this.fichero1.fichas, ...this.fichero2.fichas].forEach(ficha => {
            if (!ficha.colocada) {
                ficha.draw(ctx)
            }
        });

        this.UI.draw();

        if (this.gameOver) {
            this.gameOverScreen.draw()
        }

    }


    limpiarCanvas() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    }
}
