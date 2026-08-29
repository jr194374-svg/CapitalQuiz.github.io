// =====================================================
// VARIABLES
// =====================================================

let paisActual = null;

let correctas = 0;
let incorrectas = 0;
let puntos = 0;

let preguntas = [];
let numeroPregunta = 0;

let racha = 0;
let mejorRacha = 0;

let pasadas = 0;
let maximoPuntos = 0;


// =====================================================
// ELEMENTOS DE LA PÁGINA
// =====================================================

const pantallaInicio =
    document.getElementById("pantallaInicio");

const pantallaJuego =
    document.getElementById("pantallaJuego");

const pantallaFinal =
    document.getElementById("pantallaFinal");

const numeroPreguntaTexto =
    document.getElementById("numeroPregunta");

const pregunta =
    document.getElementById("pregunta");

const respuesta =
    document.getElementById("respuesta");

const resultado =
    document.getElementById("resultado");

const botonComenzar =
    document.getElementById("botonComenzar");

const botonResponder =
    document.getElementById("botonResponder");

const botonJugarDeNuevo =
    document.getElementById("botonJugarDeNuevo");

const botonTerminar =
    document.getElementById("botonTerminar");

const botonPasar =
    document.getElementById("botonPasar");

const marcadorCorrectas =
    document.getElementById("correctas");

const marcadorIncorrectas =
    document.getElementById("incorrectas");

const marcadorPuntos =
    document.getElementById("puntos");

const marcadorRacha =
    document.getElementById("racha");

const marcadorPasadas =
    document.getElementById("pasadas");

const selectorContinente =
    document.getElementById("selectorContinente");

const selectorDificultad =
    document.getElementById("selectorDificultad");

const selectorPreguntas =
    document.getElementById("selectorPreguntas");

const botonIrMenu =
    document.getElementById("botonIrMenu");

const resultadoPuntos =
    document.getElementById("resultadoPuntos");

const resultadoMejorRacha =
    document.getElementById("resultadoMejorRacha");

const resultadoCorrectas =
    document.getElementById("resultadoCorrectas");

const resultadoIncorrectas =
    document.getElementById("resultadoIncorrectas");

const resultadoPasadas =
    document.getElementById("resultadoPasadas");

const resultadoTotal =
    document.getElementById("resultadoTotal");

const resultadoRango =
    document.getElementById("resultadoRango");

const resultadoPorcentaje =
    document.getElementById("resultadoPorcentaje");


// =====================================================
// COMENZAR JUEGO
// =====================================================

function comenzarJuego() {
    alert("El botón sí está funcionando");
    // Reiniciar estadísticas
    correctas = 0;
    incorrectas = 0;
    puntos = 0;

    racha = 0;
    mejorRacha = 0;

    numeroPregunta = 0;
    pasadas = 0;


    // Obtener filtros
    const continenteSeleccionado =
        selectorContinente.value;

    const dificultadSeleccionada =
        selectorDificultad.value;

    const cantidadPreguntas =
        selectorPreguntas.value;


    // Filtrar países
    preguntas = paises.filter(pais => {

        const coincideContinente =
            continenteSeleccionado === "Todos" ||
            pais.continente === continenteSeleccionado;

        const coincideDificultad =
            dificultadSeleccionada === "Todas" ||
            pais.dificultad === dificultadSeleccionada;

        return (
            coincideContinente &&
            coincideDificultad
        );
    });


    // Mezclar aleatoriamente
    preguntas.sort(
        () => Math.random() - 0.5
    );


    // Limitar cantidad
    if (cantidadPreguntas !== "todos") {

        preguntas =
            preguntas.slice(
                0,
                Number(cantidadPreguntas)
            );
    }


    // Verificar preguntas
    if (preguntas.length === 0) {

        alert(
            "No hay países que coincidan con estos filtros."
        );

        return;
    }


    // Calcular máximo
    maximoPuntos =
        calcularMaximoPuntos();


    // Actualizar marcador
    actualizarMarcadores();


    // Cambiar pantalla
    pantallaInicio.style.display = "none";
    pantallaFinal.style.display = "none";
    pantallaJuego.style.display = "block";


    // Mostrar primera pregunta
    siguientePregunta();
}


// =====================================================
// ACTUALIZAR MARCADORES
// =====================================================

function actualizarMarcadores() {

    marcadorCorrectas.textContent =
        correctas;

    marcadorIncorrectas.textContent =
        incorrectas;

    marcadorPuntos.textContent =
        puntos;

    marcadorRacha.textContent =
        racha;

    marcadorPasadas.textContent =
        pasadas;
}


// =====================================================
// SIGUIENTE PREGUNTA
// =====================================================

function siguientePregunta() {

    // ¿Terminó el juego?
    if (
        numeroPregunta >=
        preguntas.length
    ) {

        terminarJuego();

        return;
    }


    // Obtener país
    paisActual =
        preguntas[numeroPregunta];

    numeroPregunta++;


    // Número de pregunta
    numeroPreguntaTexto.textContent =
        `Pregunta ${numeroPregunta} / ${preguntas.length}`;


    // Pregunta
    pregunta.textContent =
        `¿Cuál es la capital de ${paisActual.pais}?`;


    // Limpiar
    respuesta.value = "";
    resultado.textContent = "";


    // Activar controles
    respuesta.disabled = false;
    botonResponder.disabled = false;
    botonPasar.disabled = false;


    respuesta.focus();
}


// =====================================================
// PUNTOS POR DIFICULTAD
// =====================================================

function obtenerPuntos(dificultad) {

    if (dificultad === "Fácil") {
        return 100;
    }

    if (dificultad === "Media") {
        return 200;
    }

    if (dificultad === "Difícil") {
        return 300;
    }

    return 0;
}


// =====================================================
// BONUS POR RACHA
// =====================================================

function obtenerBonusRacha(rachaActual) {

    if (rachaActual === 1) {
        return 0;
    }

    return rachaActual * 5;
}


// =====================================================
// MOSTRAR RESULTADO Y ANIMAR PUNTOS
// =====================================================

function mostrarResultado(puntosBase, bonusRacha) {

    const mensaje =
        document.getElementById("mensajeResultado");

    const marcador =
        document.querySelector(".marcadorPuntos");

    const total =
        puntosBase + bonusRacha;


    // =========================================
    // CREAR MENSAJE
    // =========================================

    mensaje.innerHTML = `

        <div class="correctoTitulo">
            ✔ ¡CORRECTO!
        </div>

        <div class="puntosDetalle">

            <span class="puntosBase">
                +${puntosBase}
            </span>

            <span class="puntosBonus">
                🔥 +${bonusRacha}
            </span>

        </div>

        <div class="puntosCombinados">
            +${total}
        </div>

    `;

    mensaje.style.opacity = "1";


    const titulo =
        mensaje.querySelector(".correctoTitulo");

    const detalle =
        mensaje.querySelector(".puntosDetalle");

    const combinado =
        mensaje.querySelector(".puntosCombinados");

    // =========================================
    // ETAPA 1 — APARECEN
    // =========================================

    detalle.style.opacity = "0";
    detalle.style.transform = "scale(0.85)";

    setTimeout(() => {

        detalle.style.opacity = "1";
        detalle.style.transform = "scale(1)";

    }, 50);


    // =========================================
    // ETAPA 2 — FUSIÓN
    // =========================================

    setTimeout(() => {

        // Desaparece el "¡CORRECTO!"
        titulo.style.opacity = "0";

        // Los puntos comienzan a juntarse
        detalle.classList.add("fusionando");

    }, 300);


    // =========================================
    // ETAPA 3 — DESAPARECEN Y APARECE EL TOTAL
    // =========================================

    setTimeout(() => {

        // Los dos puntos ya terminaron de juntarse
        detalle.style.display = "none";


        // Aparece el total
        combinado.classList.add("mostrar");

    }, 620);


    // =========================================
    // ETAPA 4 — TOTAL VUELA AL MARCADOR
    // =========================================

    setTimeout(() => {

        if (!marcador) return;


        // Obtener posición actual del total
        const origen =
            combinado.getBoundingClientRect();


        // Obtener posición del marcador
        const destino =
            marcador.getBoundingClientRect();


        // Centro del total
        const origenX =
            origen.left +
            origen.width / 2;

        const origenY =
            origen.top +
            origen.height / 2;


        // Centro del marcador
        const destinoX =
            destino.left +
            destino.width / 2;

        const destinoY =
            destino.top +
            destino.height / 2;


        // =========================================
        // CREAR COPIA DEL TOTAL
        // =========================================

        const puntosVolando =
            document.createElement("div");

        puntosVolando.className =
            "puntosVolando";

        puntosVolando.textContent =
            `+${total}`;


        document.body.appendChild(
            puntosVolando
        );


        // =========================================
        // POSICIÓN INICIAL
        // =========================================

        puntosVolando.style.left =
            `${origenX}px`;

        puntosVolando.style.top =
            `${origenY}px`;

        puntosVolando.style.transform =
            "translate(-50%, -50%) scale(1)";

        puntosVolando.style.opacity =
            "1";


        // Ocultar el original
        combinado.style.opacity = "0";


        // Forzar al navegador
        void puntosVolando.offsetWidth;


        // =========================================
        // VOLAR AL MARCADOR
        // =========================================

        requestAnimationFrame(() => {

            puntosVolando.style.left =
                `${destinoX}px`;

            puntosVolando.style.top =
                `${destinoY}px`;

            puntosVolando.style.transform =
                "translate(-50%, -50%) scale(0.35)";

            puntosVolando.style.opacity =
                "0";

        });


        // =========================================
        // ANIMAR CONTADOR
        // =========================================

        const puntosIniciales =
            puntos;

        const duracion =
            700;

        const tiempoInicial =
            performance.now();


        function actualizarPuntos(tiempo) {

            const progreso =
                Math.min(
                    (tiempo - tiempoInicial) /
                    duracion,
                    1
                );


            const suavizado =
                1 -
                Math.pow(
                    1 - progreso,
                    3
                );


            puntos =
                Math.floor(
                    puntosIniciales +
                    total * suavizado
                );


            marcadorPuntos.textContent =
                puntos;


            if (progreso < 1) {

                requestAnimationFrame(
                    actualizarPuntos
                );

            } else {

                puntos =
                    puntosIniciales + total;

                marcadorPuntos.textContent =
                    puntos;
            }
        }


        requestAnimationFrame(
            actualizarPuntos
        );


        // =========================================
        // PULSO AL LLEGAR
        // =========================================

        setTimeout(() => {

            marcador.classList.remove(
                "recibiendo"
            );

            void marcador.offsetWidth;

            marcador.classList.add(
                "recibiendo"
            );

        }, 650);


        // =========================================
        // ELIMINAR TOTAL VOLANDO
        // =========================================

        setTimeout(() => {

            puntosVolando.remove();

        }, 750);


    }, 850);


    // =========================================
    // LIMPIAR MENSAJE
    // =========================================

}

// =====================================================
// VOLAR TOTAL AL MARCADOR
// =====================================================

function volarTotalAlMarcador(
    elemento,
    cantidad
) {

    const marcador =
        document.querySelector(
            ".marcadorPuntos"
        );


    if (!marcador || !elemento) {
        return;
    }


    // =================================================
    // OBTENER POSICIONES
    // =================================================

    const origen =
        elemento.getBoundingClientRect();

    const destino =
        marcador.getBoundingClientRect();


    const origenX =
        origen.left +
        origen.width / 2;

    const origenY =
        origen.top +
        origen.height / 2;

    const destinoX =
        destino.left +
        destino.width / 2;

    const destinoY =
        destino.top +
        destino.height / 2;


    // =================================================
    // CREAR COPIA QUE VOLARÁ
    // =================================================

    const volando =
        document.createElement("div");

    volando.className =
        "puntosVolando";

    volando.textContent =
        `+${cantidad}`;


    document.body.appendChild(
        volando
    );


    // =================================================
    // POSICIÓN INICIAL
    // =================================================

    volando.style.left =
        `${origenX}px`;

    volando.style.top =
        `${origenY}px`;

    volando.style.transform =
        "translate(-50%, -50%) scale(1)";

    volando.style.opacity =
        "1";


    // =================================================
    // FORZAR AL NAVEGADOR A REGISTRAR POSICIÓN
    // =================================================

    void volando.offsetWidth;


    // =================================================
    // VOLAR
    // =================================================

    requestAnimationFrame(() => {

        volando.style.left =
            `${destinoX}px`;

        volando.style.top =
            `${destinoY}px`;

        volando.style.transform =
            "translate(-50%, -50%) scale(0.35)";

        volando.style.opacity =
            "0";
    });


    // =================================================
    // ACTUALIZAR CONTADOR
    // =================================================

    animarContador(
        cantidad
    );


    // =================================================
    // PULSO DEL MARCADOR
    // =================================================

    setTimeout(() => {

        marcador.classList.remove(
            "recibiendo"
        );

        void marcador.offsetWidth;

        marcador.classList.add(
            "recibiendo"
        );

    }, 650);


    // =================================================
    // ELIMINAR
    // =================================================

    setTimeout(() => {

        volando.remove();

    }, 800);
}


// =====================================================
// ANIMAR CONTADOR
// =====================================================

function animarContador(
    cantidad
) {

    const puntosIniciales =
        puntos;

    const duracion =
        700;

    const tiempoInicial =
        performance.now();


    function actualizar(tiempo) {

        const progreso =
            Math.min(
                (tiempo - tiempoInicial) /
                duracion,
                1
            );


        // Suavizado
        const suavizado =
            1 -
            Math.pow(
                1 - progreso,
                3
            );


        puntos =
            Math.floor(
                puntosIniciales +
                cantidad * suavizado
            );


        marcadorPuntos.textContent =
            puntos;


        if (progreso < 1) {

            requestAnimationFrame(
                actualizar
            );

        } else {

            puntos =
                puntosIniciales +
                cantidad;

            marcadorPuntos.textContent =
                puntos;
        }
    }


    requestAnimationFrame(
        actualizar
    );
}


// =====================================================
// CALCULAR MÁXIMO DE PUNTOS
// =====================================================

function calcularMaximoPuntos() {

    let maximo = 0;


    for (
        let i = 0;
        i < preguntas.length;
        i++
    ) {

        const dificultad =
            preguntas[i].dificultad;


        const puntosBase =
            obtenerPuntos(
                dificultad
            );


        const rachaMaxima =
            i + 1;


        const bonusRacha =
            obtenerBonusRacha(
                rachaMaxima
            );


        maximo +=
            puntosBase +
            bonusRacha;
    }


    return maximo;
}


// =====================================================
// OBTENER RANGO
// =====================================================

function obtenerRango(
    porcentaje
) {

    if (porcentaje >= 100) {
        return "🌎👑 DIOS DE LAS CAPITALES";
    }

    if (porcentaje >= 95) {
        return "🔥 Maestro absoluto";
    }

    if (porcentaje >= 85) {
        return "👑 Leyenda de la geografía";
    }

    if (porcentaje >= 75) {
        return "🎓 Maestro de las capitales";
    }

    if (porcentaje >= 60) {
        return "🌍 Conocedor del mundo";
    }

    if (porcentaje >= 40) {
        return "🧭 Viajero";
    }

    if (porcentaje >= 20) {
        return "🌎 Explorador";
    }

    return "🗺️ Turista perdido";
}


// =====================================================
// COMPROBAR RESPUESTA
// =====================================================

function comprobarRespuesta() {

    // Normalizar texto
    const normalizar =
        texto => {

            return texto
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .toLowerCase()
                .trim();
        };


    const respuestaUsuario =
        normalizar(
            respuesta.value
        );


    // Obtener capitales válidas
    const capitalesCorrectas =
        Array.isArray(
            paisActual.capital
        )
            ? paisActual.capital
            : [paisActual.capital];


    // Comprobar respuesta
    const esCorrecta =
        capitalesCorrectas.some(
            capital =>
                normalizar(
                    capital
                ) ===
                respuestaUsuario
        );


    // Respuesta vacía
    if (
        respuestaUsuario === ""
    ) {

        resultado.textContent =
            "⚠️ Escribe una respuesta.";

        return;
    }


    // =================================================
    // CORRECTA
    // =================================================

    if (esCorrecta) {

        correctas++;

        marcadorCorrectas.textContent =
            correctas;


        // Aumentar racha
        racha++;


        if (
            racha >
            mejorRacha
        ) {

            mejorRacha =
                racha;
        }


        marcadorRacha.textContent =
            racha;


        // Calcular puntos
        const puntosBase =
            obtenerPuntos(
                paisActual.dificultad
            );


        const bonusRacha =
            obtenerBonusRacha(
                racha
            );


        const puntosGanados =
            puntosBase +
            bonusRacha;


        // Mostrar animación
        mostrarResultado(
            puntosBase,
            bonusRacha
        );


        // Desactivar controles
        botonResponder.disabled = true;
        botonPasar.disabled = true;
        respuesta.disabled = true;


        setTimeout(() => {

            // Limpiar completamente la animación
            const mensaje =
                document.getElementById("mensajeResultado");

            if (mensaje) {
                mensaje.style.opacity = "0";
                mensaje.innerHTML = "";
            }

            // Ahora sí cambiar de pregunta
            siguientePregunta();

        }, 1550);
    }


    // =================================================
    // INCORRECTA
    // =================================================

    else {

        resultado.textContent =
            "✘ Incorrecto, intenta nuevamente.";


        incorrectas++;


        marcadorIncorrectas.textContent =
            incorrectas;


        // Romper racha
        racha = 0;


        marcadorRacha.textContent =
            racha;
    }
}


// =====================================================
// TERMINAR JUEGO
// =====================================================

function terminarJuego() {

    pantallaJuego.style.display =
        "none";

    pantallaFinal.style.display =
        "block";


    // Calcular porcentaje
    const porcentaje =
        maximoPuntos > 0
            ? (
                puntos /
                maximoPuntos
            ) * 100
            : 0;


    // Obtener rango
    const rango =
        obtenerRango(
            porcentaje
        );


    // Mostrar resultados
    resultadoRango.textContent =
        rango;

    resultadoPorcentaje.textContent =
        porcentaje.toFixed(1);

    resultadoPuntos.textContent =
        puntos;

    resultadoMejorRacha.textContent =
        mejorRacha;

    resultadoCorrectas.textContent =
        correctas;

    resultadoIncorrectas.textContent =
        incorrectas;

    resultadoPasadas.textContent =
        pasadas;

    resultadoTotal.textContent =
        preguntas.length;
}


// =====================================================
// SALIR AL MENÚ
// =====================================================

function salirAlMenu() {

    pantallaJuego.style.display =
        "none";

    pantallaFinal.style.display =
        "none";

    pantallaInicio.style.display =
        "block";


    respuesta.value = "";
    resultado.textContent = "";


    // Limpiar animación por si quedó activa
    const mensaje =
        document.getElementById(
            "mensajeResultado"
        );

    if (mensaje) {

        mensaje.style.opacity = "0";
        mensaje.innerHTML = "";
    }
}


// =====================================================
// PASAR PREGUNTA
// =====================================================

function pasarPregunta() {

    // Contar pasada
    pasadas++;


    marcadorPasadas.textContent =
        pasadas;


    // Obtener capital
    const capitales =
        Array.isArray(
            paisActual.capital
        )
            ? paisActual.capital.join(
                " o "
            )
            : paisActual.capital;


    resultado.textContent =
        `⏭️ Pregunta pasada. La respuesta era: ${capitales}`;


    // Romper racha
    racha = 0;


    marcadorRacha.textContent =
        racha;


    // Desactivar
    respuesta.disabled = true;
    botonResponder.disabled = true;
    botonPasar.disabled = true;


    // Continuar
    setTimeout(() => {

        siguientePregunta();

    }, 1500);
}


// =====================================================
// BOTONES
// =====================================================

botonComenzar.addEventListener(
    "click",
    comenzarJuego
);


botonResponder.addEventListener(
    "click",
    comprobarRespuesta
);


botonJugarDeNuevo.addEventListener(
    "click",
    comenzarJuego
);


respuesta.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            comprobarRespuesta();
        }
    }
);


botonTerminar.addEventListener(
    "click",
    salirAlMenu
);


botonIrMenu.addEventListener(
    "click",
    salirAlMenu
);


botonPasar.addEventListener(
    "click",
    pasarPregunta
);
