
//animacion de carga
let carritoCount = 0;

inicializarCarrouseles()
let juegosCount = 0;
let carrouselesCount = 0;

async function inicializarCarrouseles() {

    const carrouselRecomendadosNode = document.getElementById("carrouseles-recomendados");
    const carrouselCategoriasNode = document.getElementById("carrouseles-categorias");

    const data = await (await fetch("./carrouseles.json")).json();
    const carrouselesRecomendadosData = data.carrouselesRecomendados;

    carrouselesRecomendadosData.forEach(carr => {

        const carrousel = crearCarrousel(carr);

        carrouselRecomendadosNode.appendChild(carrousel);
    });



    const carrouselesCategoriasData = data.carrouselesCategorias;

    carrouselesCategoriasData.forEach(carr => {

        const carrousel = crearCarrousel(carr);

        carrouselCategoriasNode.appendChild(carrousel);
    });


    inicializarCarritoFuncionalidad();

    inicializarFavoritosFuncionalidad();

    const tracks = document.getElementsByClassName('carrousel');
    const flechasL = document.getElementsByClassName('flecha-l');
    const flechasR = document.getElementsByClassName('flecha-r');

    const cardWidth = 240;

    const moveBy = 3; // Avanzar o retroceder 3 cards

    let startX = [0, 0, 0];
    let scrollLeft = [0, 0, 0];


    for (let i = 0; i < tracks.length; i++) {
        tracks[i].addEventListener('mousedown', (e) => {
            startX[i] = e.pageX - tracks[i].offsetLeft;
            scrollLeft[i] = tracks[i].scrollLeft;
            tracks[i].classList.add('dragging');
        });

        tracks[i].addEventListener('mouseleave', () => {
            tracks[i].classList.remove('dragging');
        });

        document.addEventListener('mouseup', () => {
            tracks[i].classList.remove('dragging');
        });

        tracks[i].addEventListener('mousemove', (e) => {
            if (!tracks[i].classList.contains('dragging')) return;

            if (tracks[i].scrollLeft == 0) {
                flechasL[i].classList.add("hidden")
            } else {
                flechasL[i].classList.remove("hidden")

            }

            if (tracks[i].scrollLeft < (tracks[i].scrollWidth - tracks[i].clientWidth)) {
                flechasR[i].classList.remove("hidden")
            } else {
                flechasR[i].classList.add("hidden")

            }

            const x = e.pageX - tracks[i].offsetLeft;
            const walk = x - startX[i];
            tracks[i].scrollLeft = scrollLeft[i] - walk;

        });

        flechasL[i].addEventListener('click', (e) => {

            const j = e.target.id.split("-")[1];

            flechasR[j].classList.remove("hidden");

            const walk = cardWidth * moveBy

            if (tracks[i].scrollLeft - walk <= 0) {
                flechasL[j].classList.add("hidden")
            }

            moveCarousel(tracks[j], -walk);

        });

        flechasR[i].addEventListener('click', (e) => {


            const j = e.target.id.split("-")[1];

            flechasL[j].classList.remove("hidden")

            const walk = cardWidth * moveBy

            if (tracks[i].scrollLeft + walk >= (tracks[i].scrollWidth - tracks[i].clientWidth)) {
                flechasR[j].classList.add("hidden")
            }

            moveCarousel(tracks[j], walk);
        });

        /* 
                // Compatibilidad con dispositivos móviles (touch)
                tracks[i].addEventListener('touchstart', (e) => {
                    startX[i] = e.touches[0].pageX - tracks[i].offsetLeft;
                    scrollLeft[i] = tracks[i].scrollLeft;
                });
        
                tracks[i].addEventListener('touchmove', (e) => {
                    const x = e.touches[0].pageX - tracks[i].offsetLeft;
                    const walk = (x - startX[i]);
                    tracks[i].scrollLeft = scrollLeft[i] - walk;
                }); */
    }


    // Función para mover el carrusel
    function moveCarousel(track, walk) {


        // Si esta al principio o al final no deja mover.
        let canScroll = true;

        if (walk < 0 && track.scrollLeft == 0 || walk > 0 && Math.floor(track.scrollLeft) == (track.scrollWidth - track.clientWidth)) {
            canScroll = false;
        }

        if (!canScroll) {
            return
        }

        let walkAmount = walk;

        if (walk > 0 && walk > track.scrollWidth - track.clientWidth - track.scrollLeft) {

            walkAmount = track.scrollWidth - track.clientWidth - track.scrollLeft;
        } /* else if (walk < 0 && track.scrollLeft + walk < 0) {
            walkAmount = walk + track.scrollLeft;
            console.log(walkAmount);
        } */

        //track.style.transform = `translateX(${-walkAmount}px)`;

        tracks[track.id.split("-")[2]].scrollBy({ left: walkAmount, behavior: "smooth" })

        //if(track.scrollLeft < (track.scrollWidth - track.clientWidth))

        //const trackWidth = track.getBoundingClientRect().width;
        //const containerWidth = track.parentElement.getBoundingClientRect().width;

        //const x = e.pageX - tracks[i].offsetLeft;
        //const walk = x - startX[i];

        //tracks[i].scrollLeft = scrollLeft[i] - walk;

        // Calcula el movimiento deseado
        // let moveAmount = -((cardWidth) * index);

        /* moveAmount = moveAmount < -(containerWidth - trackWidth) ? moveAmount : -(containerWidth - trackWidth);
        if (moveAmount == -(containerWidth - trackWidth)) {
            document.getElementById(`flechaR_div-${track.id.split("-")[2]}`).classList.add("hidden")
        } */
        // Si el movimiento se pasa del límite, ajusta para que no haya espacio vacío

        //track.offsetLeft = -moveAmount
    }

}


function inicializarCarritoFuncionalidad() {

    updateCarritoCount();

    const botonesNodes = document.getElementsByClassName("cardBotonPlay");
    for (let i = 0; i < botonesNodes.length; i++) {
        const btnVenta = botonesNodes[i];
        if (btnVenta.classList.contains("btn-venta")) {
            btnVenta.addEventListener("click", addToCart)
        }
    }

}

function inicializarFavoritosFuncionalidad() {


    const favoritoNodes = document.getElementsByClassName("card-tag-fav");


    for (let i = 0; i < favoritoNodes.length; i++) {
        const fav = favoritoNodes[i];
        if (fav.classList.contains("favorito")) {
            fav.addEventListener("click", removeFavorito);
        } else {
            fav.addEventListener("click", addFavorito);
        }
    }

}

// Al apretar el boton del carrito en una card, añaden al carrito el juego 
function addToCart(event) {
    if (carritoCount == 0) {
        // cambiar el icono del carrito al que tiene el cartelito
    }

    carritoCount++;

    // cambiar el icono de la card por carrito seleccionado
    let gameId = event.target.offsetParent.children[1].id;
    changeIconToAdded(gameId);
    updateCarritoCount();

}

function removeFromCart(event) {
    if (carritoCount > 0) {
        carritoCount--;
    }
    if (carritoCount == 0) {
        // cambiar el icono del carrito al que esta vacio

    }

    // cambiar el icono de la card por carrito seleccionado
    let gameId = event.target.offsetParent.children[1].id;
    changeIconBack(gameId);
    updateCarritoCount();
}

function updateCarritoCount() {
    const textCarritoNode = document.getElementById("carrito-text");

    textCarritoNode.innerText = carritoCount;

    if (carritoCount == 0) {
        textCarritoNode.classList.add("hidden");
        return;
    }
    textCarritoNode.classList.remove("hidden");

}

function changeIconToAdded(gameId) {
    const cardButton = document.getElementById(gameId)

    //intercambio el evento del click
    cardButton.removeEventListener("click", addToCart)
    cardButton.addEventListener("click", removeFromCart)

    let img = cardButton.children[0]
    img.src = "./images/iconos/carritoCardSeleccionado.png";

}

function changeIconBack(gameId) {
    const cardButton = document.getElementById(gameId)

    //intercambio el evento del click
    cardButton.removeEventListener("click", removeFromCart)
    cardButton.addEventListener("click", addToCart)

    let img = cardButton.children[0]
    img.src = "./images/iconos/carritoCard.png";

}

function addFavorito(e) {

    const favNode = document.getElementById(`card-fav-${e.target.offsetParent.id.split("-")[2]}`);

    favNode.removeEventListener("click", addFavorito)
    favNode.addEventListener("click", removeFavorito)

    favNode.children[0].src = "./images/tags/tag-fav-blanco.png"
    favNode.children[1].src = "./images/iconos/favoritoSeleccionado.png";
}

function removeFavorito(e) {

    const favNode = document.getElementById(`card-fav-${e.target.offsetParent.id.split("-")[2]}`);

    favNode.removeEventListener("click", removeFavorito)
    favNode.addEventListener("click", addFavorito)

    favNode.children[0].src = "./images/tags/tag-fav-gris.png"
    favNode.children[1].src = "./images/iconos/favorito.png";
}

function crearCarrousel(carr) {

    const carrDiv = document.createElement("div");
    carrDiv.classList.add(`carrousel-container`);

    const titulo = document.createElement("h2");
    titulo.innerText = carr.titulo;
    carrDiv.appendChild(titulo);

    const flechaL_div = document.createElement("div");
    const flechaR_div = document.createElement("div");

    flechaL_div.classList.add("flecha-l");
    flechaL_div.classList.add("hidden");

    const flechaL_img = document.createElement("img");
    flechaL_img.id = `imgFlechaL-${carrouselesCount}`
    flechaL_img.classList.add("img_flecha_carrousel");
    flechaL_img.src = "./images/iconos/flecha.png";
    flechaL_div.appendChild(flechaL_img);

    const flechaR_img = document.createElement("img");
    flechaR_img.id = `imgFlechaR-${carrouselesCount}`
    flechaR_img.classList.add("img_flecha_carrousel");
    flechaR_img.classList.add("img-invertida");
    flechaR_img.src = "./images/iconos/flecha.png";
    flechaR_div.appendChild(flechaR_img);

    flechaL_div.id = `flechaL-${carrouselesCount}`
    flechaR_div.classList.add("flecha-r");

    flechaR_div.id = `flechaR-${carrouselesCount}`

    const carrJuegos = document.createElement("div");

    carrDiv.appendChild(flechaL_div)
    carrDiv.appendChild(flechaR_div)

    carrJuegos.id = `carrousel-recomendado-${carrouselesCount++}`;
    carrJuegos.classList.add("carrousel");

    carr.juegos.forEach(juego => {

        const card = crearCard(juego);

        carrJuegos.innerHTML += card;

    });

    carrDiv.appendChild(carrJuegos);

    return carrDiv;

}

function crearCard(juego) {
    let cardType = "card-free";
    if (juego.precio > 0) {
        cardType = juego.jugable ? "card-owned" : "card-venta";
    }

    let btnVentaClass = " ";
    if (juego.precio > 0 && !juego.jugable) {
        btnVentaClass = "btn-venta";
    }

    let link = juego.nombre == "4 en Línea Superhéroes" ? "<a href='./html/juego.html'>" : "";
    let linkCierre = juego.nombre == "4 en Línea Superhéroes" ? "</a>" : "";

    let priceText = juego.precio > 0 ? "$" + juego.precio : "Free";

    let favTagFondo = juego.fav ? "tag-fav-blanco.png" : "tag-fav-gris.png"

    let favTagIcono = juego.fav ? "favoritoSeleccionado.png" : "favorito.png"

    let topTagFondo = juego.jugable ? "tag-disponible.png" : "tag-precio.png";

    let playBotonIcon = juego.jugable ? "playIcon.png" : "carritoCard.png";

    let card = `<div class="card ${cardType}">
                        <div class="card-top">
                            <div class="card-tag-disp">
                                <img class="card-tag-disp-fondo" src="./images/tags/${topTagFondo}" alt="fondo de etiqueta superior">
                                <img class="card-tag-disp-icono" src="./images/iconos/comprado.png" alt="fondo de etiqueta superior">
                                <p class="textoLabel cardTagDispText">
                                    ${priceText}
                                </p>
                            </div>

                            <div id="card-fav-${juegosCount}" class="card-tag-fav ${juego.fav ? "favorito" : ""} ">

                                <img src="./images/tags/${favTagFondo}" alt="favorito">
                                <img class="card-tag-fav-icono" src="./images/iconos/${favTagIcono}" alt="">
                            </div>

                        </div>

                        <img class="card-imagen" src="./images/${juego.img}" alt="imagen del juego">

                        <div class="card-bottom">

                            <h3 class="card-titulo">${juego.nombre}</h3>
                            ${link}
                            <div class="cardBotonPlay ${btnVentaClass}" id="gamecard-${juegosCount++}">
                                

                                <img src="./images/iconos/${playBotonIcon}" alt="">
                            </div>
                            ${linkCierre}
                        </div>


                    </div>`;

    return card;
}