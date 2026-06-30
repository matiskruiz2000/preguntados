// Obtener la categoría seleccionada
const categoria = localStorage.getItem("categoria");

// Copiar las preguntas de esa categoría
let lista = [...questions[categoria]];

// Mezclar preguntas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Mezclar y tomar solo 10 preguntas (o menos si no hay 10)
shuffle(lista);
lista = lista.slice(0, 10);

// Variables del juego
let indice = 0;
let puntaje = 0;
let tiempo = 20;
let intervalo;

// Iniciar temporizador
function iniciarTemporizador() {

    tiempo = 20;

    document.getElementById("timer").textContent = tiempo + " s";

    intervalo = setInterval(() => {

        tiempo--;

        document.getElementById("timer").textContent = tiempo + " s";

        if (tiempo <= 0) {

            clearInterval(intervalo);

            siguientePregunta();

        }

    }, 1000);

}

// Mostrar una pregunta
function mostrarPregunta() {

    clearInterval(intervalo);

    iniciarTemporizador();

    const p = lista[indice];

    document.getElementById("progress").textContent =
        `Pregunta ${indice + 1} / ${lista.length}`;

    document.getElementById("question").textContent =
        p.question;

    document.getElementById("progressBar").style.width =
        ((indice + 1) / lista.length) * 100 + "%";

    const contenedor = document.getElementById("answers");

    contenedor.innerHTML = "";

    p.answers.forEach((respuesta, i) => {

        const boton = document.createElement("button");

        boton.className = "btn btn-outline-primary w-100 mb-3";

        boton.textContent = respuesta;

        boton.onclick = function () {

            responder(i);

        };

        contenedor.appendChild(boton);

    });

}

// Cuando el usuario responde
function responder(opcion) {

    clearInterval(intervalo);

    const botones = document.querySelectorAll("#answers button");

    // Deshabilitar todos los botones
    botones.forEach(boton => {
        boton.disabled = true;
    });

    // Pintar la respuesta correcta e incorrecta
    botones.forEach((boton, i) => {

        if(i === lista[indice].correct){

            boton.classList.remove("btn-outline-primary");
            boton.classList.add("btn-success");

        }

        if(i === opcion && opcion !== lista[indice].correct){

            boton.classList.remove("btn-outline-primary");
            boton.classList.add("btn-danger");

        }

    });

    // Sumar punto si acertó
    if(opcion === lista[indice].correct){

        puntaje++;

    }

    // Esperar 1 segundo antes de pasar
    setTimeout(() => {

        siguientePregunta();

    },1000);

}
// Pasar a la siguiente pregunta
function siguientePregunta() {

    indice++;

    if (indice >= lista.length) {

        localStorage.setItem("puntaje", puntaje);

        localStorage.setItem("totalPreguntas", lista.length);

        window.location.href = "resultado.html";

        return;

    }

    mostrarPregunta();

}

// Iniciar juego
mostrarPregunta();