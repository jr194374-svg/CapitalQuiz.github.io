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

let cronometroActivo = false;
let tiempoInicio = 0;
let intervaloCronometro = null;
let tiempoFinal = 0;

let idAnimacionPuntos = 0;

let modoJuego = "capital";
let modoPrincipal = "capital";

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

const interruptorCronometro =
    document.getElementById("interruptorCronometro");

const resultadoTiempo =
    document.getElementById("resultadoTiempo");

const menuPrincipal =
    document.getElementById("menuPrincipal");

const botonCapitales =
    document.getElementById("botonCapitales");

const botonBanderas =
    document.getElementById("botonBanderas");

const botonVolverMenu =
    document.getElementById("botonVolverMenu");

const modoCapital =
    document.getElementById("modoCapital");

const modoPais =
    document.getElementById("modoPais");

const selectorRespuesta =
    document.getElementById("selectorRespuesta");

const selectorModo =
    document.querySelector(".selectorModo");

const opcionesRespuesta =
    document.getElementById("opcionesRespuesta");

// =====================================================
// FUNCIONES
// =====================================================

// =====================================================
// COMENZAR JUEGO
// =====================================================

function comenzarJuego() {

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

    // =================================================
    // CRONÓMETRO
    // =================================================

    cronometroActivo =
        interruptorCronometro.checked;


    if (cronometroActivo) {

        document.getElementById(
            "cronometro"
        ).style.display = "block";

        iniciarCronometro();

    }

    else {

        document.getElementById(
            "cronometro"
        ).style.display = "none";

        clearInterval(
            intervaloCronometro
        );
    }

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

function mostrarBandera() {

    const bandera =
        document.getElementById("banderaPregunta");

    if (!bandera) {
        return;
    }

    bandera.src =
        `https://flagcdn.com/w320/${paisActual.codigoBandera.toLowerCase()}.png`;

    bandera.alt =
        "Bandera del país";

    bandera.style.display =
        "block";
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

    const bandera =
    document.getElementById("banderaPregunta");

    if (bandera) {
        bandera.style.display = "none";
        bandera.src = "";
    }


    // Número de pregunta
    numeroPreguntaTexto.textContent =
        `Pregunta ${numeroPregunta} / ${preguntas.length}`;


    // =================================================
    // PREGUNTA SEGÚN EL MODO
    // =================================================

    if (modoJuego === "capital") {

        pregunta.textContent =
            `¿Cuál es la capital de ${paisActual.pais}?`;

    }

    else if (modoJuego === "pais") {

        const capital =
            Array.isArray(paisActual.capital)
                ? paisActual.capital[0]
                : paisActual.capital;

        pregunta.textContent =
            `¿De qué país es la capital ${capital}?`;

    }

    else if (modoJuego === "bandera") {

        pregunta.textContent =
            "¿De qué país es esta bandera?";

        mostrarBandera();
    }


    // =================================================
    // LIMPIAR
    // =================================================

    respuesta.value = "";
    resultado.textContent = "";


    // =================================================
    // MOSTRAR MÉTODO DE RESPUESTA
    // =================================================

    if (selectorRespuesta.value === "opciones") {

        respuesta.style.display = "none";

        opcionesRespuesta.style.display =
            "block";

        generarOpciones();

    }

    else {

        respuesta.style.display =
            "inline-block";

        opcionesRespuesta.style.display =
            "none";

    }


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

        idAnimacionPuntos++;
        const idActual = idAnimacionPuntos;

        const duracion =
            700;

        const tiempoInicial =
            performance.now();


        function actualizarPuntos(tiempo) {

            if (idActual !== idAnimacionPuntos) {
                return;
            }
            
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


    // =================================================
    // COMPROBAR SEGÚN EL MODO
    // =================================================

    let esCorrecta = false;


    // =================================================
    // MODO: ADIVINA LA CAPITAL
    // =================================================

    if (modoJuego === "capital") {

        const capitalesCorrectas =
            Array.isArray(
                paisActual.capital
            )
                ? paisActual.capital
                : [paisActual.capital];


        esCorrecta =
            capitalesCorrectas.some(
                capital =>
                    normalizar(
                        capital
                    ) ===
                    respuestaUsuario
            );
    }


    // =================================================
    // MODO: ADIVINA EL PAÍS
    // =================================================

    else if (
        modoJuego === "pais" ||
        modoJuego === "bandera"
    ) {

        esCorrecta =
            normalizar(
                paisActual.pais
            ) ===
            respuestaUsuario;
    }


    // =================================================
    // RESPUESTA VACÍA
    // =================================================

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

            const mensaje =
                document.getElementById(
                    "mensajeResultado"
                );


            if (mensaje) {

                mensaje.style.opacity = "0";
                mensaje.innerHTML = "";
            }


            if (
                numeroPregunta >=
                preguntas.length
            ) {

                setTimeout(() => {

                    siguientePregunta();

                }, 400);

            }

            else {

                siguientePregunta();

            }

        }, 1550);
    }


    // =================================================
    // INCORRECTA
    // =================================================

    else {

        // Para bandera y país → mostrar PAÍS
        // Para capital → mostrar CAPITAL

        let respuestaCorrecta;


        if (
            modoJuego === "capital"
        ) {

            respuestaCorrecta =
                Array.isArray(
                    paisActual.capital
                )
                    ? paisActual.capital.join(" o ")
                    : paisActual.capital;

        }

        else {

            respuestaCorrecta =
                paisActual.pais;
        }


        resultado.textContent =
            "✘ Incorrecto. Intente de nuevo";


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
// CRONÓMETRO
// =====================================================

function iniciarCronometro() {

    // Detener cualquier cronómetro anterior
    clearInterval(intervaloCronometro);


    // Guardar momento de inicio
    tiempoInicio = Date.now();


    // Reiniciar tiempo
    tiempoFinal = 0;


    // Actualizar inmediatamente
    actualizarCronometro();


    // Actualizar cada segundo
    intervaloCronometro =
        setInterval(
            actualizarCronometro,
            1000
        );
}


// =====================================================
// ACTUALIZAR CRONÓMETRO
// =====================================================

function actualizarCronometro() {

    const tiempoActual =
        Date.now();


    const segundos =
        Math.floor(
            (tiempoActual - tiempoInicio) / 1000
        );


    const minutos =
        Math.floor(
            segundos / 60
        );


    const segundosRestantes =
        segundos % 60;


    const minutosTexto =
        String(minutos)
            .padStart(2, "0");


    const segundosTexto =
        String(segundosRestantes)
            .padStart(2, "0");


    document.getElementById(
        "cronometro"
    ).textContent =
        `⏱️ ${minutosTexto}:${segundosTexto}`;
}


// =====================================================
// DETENER CRONÓMETRO
// =====================================================

function detenerCronometro() {

    if (!cronometroActivo) {
        return;
    }


    clearInterval(
        intervaloCronometro
    );


    tiempoFinal =
        Date.now() -
        tiempoInicio;


    actualizarCronometro();
}

// =====================================================
// TERMINAR JUEGO
// =====================================================

function terminarJuego() {
    
    detenerCronometro();

    if (cronometroActivo) {

    resultadoTiempo.textContent =
        formatearTiempo(tiempoFinal);

    }

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


    // =================================================
    // OBTENER RESPUESTA CORRECTA
    // =================================================

    let respuestaCorrecta;


    if (
        modoJuego === "capital"
    ) {

        respuestaCorrecta =
            Array.isArray(
                paisActual.capital
            )
                ? paisActual.capital.join(" o ")
                : paisActual.capital;

    }

    else {

        // País y Bandera
        respuestaCorrecta =
            paisActual.pais;
    }


    resultado.textContent =
        `⏭️ Pregunta pasada. La respuesta era: ${respuestaCorrecta}`;


    // Romper racha
    racha = 0;

    marcadorRacha.textContent =
        racha;


    // Desactivar
    respuesta.disabled = true;

    botonResponder.disabled =
        true;

    botonPasar.disabled =
        true;


    // Continuar
    setTimeout(() => {

        siguientePregunta();

    }, 1500);
}

// =====================================================
// FORMATEAR TIEMPO
// =====================================================

function formatearTiempo(milisegundos) {

    const segundos =
        Math.floor(milisegundos / 1000);

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        segundos % 60;

    return (
        String(minutos).padStart(2, "0") +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );
}

// =====================================================
// ABRIR CAPITAL QUIZ
// =====================================================

function abrirCapitalQuiz() {

    modoPrincipal = "capital";

    menuPrincipal.style.display = "none";

    pantallaInicio.style.display = "block";

    selectorModo.style.display = "flex";
}

function abrirBanderaQuiz() {

    modoPrincipal = "bandera";
    modoJuego = "bandera";

    menuPrincipal.style.display = "none";

    pantallaInicio.style.display = "block";

    selectorModo.style.display = "none";
}

// =====================================================
// SELECCIONAR MODO
// =====================================================

function seleccionarModo(modo) {

    modoJuego = modo;


    // Quitar selección

    modoCapital.classList.remove(
        "modoSeleccionado"
    );

    modoPais.classList.remove(
        "modoSeleccionado"
    );


    // Activar seleccionado

    if (modo === "capital") {

        modoCapital.classList.add(
            "modoSeleccionado"
        );

    }

    else {

        modoPais.classList.add(
            "modoSeleccionado"
        );
    }
}

// =====================================================
// VOLVER AL MENÚ PRINCIPAL
// =====================================================

function volverAlMenuPrincipal() {

    pantallaInicio.style.display = "none";
    pantallaJuego.style.display = "none";
    pantallaFinal.style.display = "none";

    menuPrincipal.style.display = "block";

    respuesta.value = "";
    resultado.textContent = "";
}

function generarOpciones() {

    const respuestas = [];

    // =====================================================
    // MODO: BANDERAS
    // =====================================================

    if (modoPrincipal === "bandera") {

        const respuestaCorrecta =
            paisActual.pais;

        respuestas.push(
            respuestaCorrecta
        );


        // Obtener países disponibles como opciones falsas
        const candidatos =
            paises.filter(pais =>
                pais !== paisActual
            );


        // Mezclar candidatos
        candidatos.sort(
            () => Math.random() - 0.5
        );


        // Agregar 3 países incorrectos
        for (
            let i = 0;
            i < candidatos.length &&
            respuestas.length < 4;
            i++
        ) {

            const pais =
                candidatos[i].pais;

            if (
                !respuestas.includes(pais)
            ) {

                respuestas.push(pais);
            }
        }


        // Mezclar las 4 respuestas
        respuestas.sort(
            () => Math.random() - 0.5
        );


        // Crear botones
        opcionesRespuesta.innerHTML = "";

        respuestas.forEach(opcion => {

            const boton =
                document.createElement("button");

            boton.className =
                "opcionRespuesta";

            boton.textContent =
                opcion;

            boton.addEventListener(
                "click",
                () => seleccionarOpcion(
                    opcion,
                    boton,
                    respuestaCorrecta
                )
            );

            opcionesRespuesta.appendChild(
                boton
            );
        });

        return;
    }


    // =====================================================
    // MODO: ADIVINA LA CAPITAL
    // =====================================================

    if (modoJuego === "capital") {

        const respuestaCorrecta =
            Array.isArray(paisActual.capital)
                ? paisActual.capital[0]
                : paisActual.capital;

        respuestas.push(
            respuestaCorrecta
        );


        const candidatos =
            preguntas.filter(pais =>
                pais !== paisActual
            );


        candidatos.sort(
            () => Math.random() - 0.5
        );


        for (
            let i = 0;
            i < candidatos.length &&
            respuestas.length < 4;
            i++
        ) {

            const capital =
                Array.isArray(candidatos[i].capital)
                    ? candidatos[i].capital[0]
                    : candidatos[i].capital;

            if (
                !respuestas.includes(capital)
            ) {

                respuestas.push(capital);
            }
        }


        respuestas.sort(
            () => Math.random() - 0.5
        );


        opcionesRespuesta.innerHTML = "";

        respuestas.forEach(opcion => {

            const boton =
                document.createElement("button");

            boton.className =
                "opcionRespuesta";

            boton.textContent =
                opcion;

            boton.addEventListener(
                "click",
                () => seleccionarOpcion(
                    opcion,
                    boton,
                    respuestaCorrecta
                )
            );

            opcionesRespuesta.appendChild(
                boton
            );
        });

        return;
    }


    // =====================================================
    // MODO: ADIVINA EL PAÍS POR SU CAPITAL
    // =====================================================

    const respuestaCorrecta =
        paisActual.pais;

    respuestas.push(
        respuestaCorrecta
    );


    const candidatos =
        preguntas.filter(pais =>
            pais !== paisActual
        );


    candidatos.sort(
        () => Math.random() - 0.5
    );


    for (
        let i = 0;
        i < candidatos.length &&
        respuestas.length < 4;
        i++
    ) {

        const pais =
            candidatos[i].pais;

        if (
            !respuestas.includes(pais)
        ) {

            respuestas.push(pais);
        }
    }


    respuestas.sort(
        () => Math.random() - 0.5
    );


    opcionesRespuesta.innerHTML = "";

    respuestas.forEach(opcion => {

        const boton =
            document.createElement("button");

        boton.className =
            "opcionRespuesta";

        boton.textContent =
            opcion;

        boton.addEventListener(
            "click",
            () => seleccionarOpcion(
                opcion,
                boton,
                respuestaCorrecta
            )
        );

        opcionesRespuesta.appendChild(
            boton
        );
    });
}   

function seleccionarOpcion(
    opcionSeleccionada,
    botonSeleccionado,
    respuestaCorrecta
) {

    const botones =
        document.querySelectorAll(
            ".opcionRespuesta"
        );


    // Desactivar todos
    botones.forEach(boton => {

        boton.disabled = true;

    });


    // =================================================
    // ¿ES CORRECTA?
    // =================================================

    if (
        opcionSeleccionada ===
        respuestaCorrecta
    ) {

        botonSeleccionado.classList.add(
            "correcta"
        );


        // Reutilizar sistema existente
        respuesta.value =
            opcionSeleccionada;


        comprobarRespuesta();

    }

    else {

        // Marcar la opción seleccionada como incorrecta
        botonSeleccionado.classList.add(
            "incorrecta"
        );


        // Resaltar la respuesta correcta
        botones.forEach(boton => {

            if (
                boton.textContent ===
                respuestaCorrecta
            ) {

                boton.classList.add(
                    "correcta"
                );

            }

        });


        // No revelar la respuesta en texto
        resultado.textContent =
            "✘ Incorrecto";


        incorrectas++;

        marcadorIncorrectas.textContent =
            incorrectas;


        // Romper racha
        racha = 0;

        marcadorRacha.textContent =
            racha;


        // Dar tiempo para ver la respuesta correcta
        setTimeout(() => {

            siguientePregunta();

        }, 1500);
    }
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

botonCapitales.addEventListener(
    "click",
    abrirCapitalQuiz
);

botonBanderas.addEventListener(
    "click",
    abrirBanderaQuiz
);

botonVolverMenu.addEventListener(
    "click",
    volverAlMenuPrincipal
);

modoCapital.addEventListener(
    "click",
    function() {

        seleccionarModo("capital");

    }
);

modoPais.addEventListener(
    "click",
    function() {

        seleccionarModo("pais");

    }
);


