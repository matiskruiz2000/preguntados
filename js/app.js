function mostrarInfo(){

    alert(
`App realizada para la Materia Arquitectura y Diseño de interfaces
~Preguntados~`
    );

}


function seleccionarCategoria(categoria){

    localStorage.setItem("categoria", categoria);

    window.location.href = "quiz.html";

}

if(window.location.pathname.includes("resultado.html")){

    const puntaje = Number(localStorage.getItem("puntaje"));

    const categoria = localStorage.getItem("categoria");

    const total = Number(localStorage.getItem("totalPreguntas"));

    const porcentaje = Math.round((puntaje / total) * 100);

    document.getElementById("puntaje").innerHTML =
        `${puntaje} / ${total}`;

    document.getElementById("porcentaje").innerHTML =
        porcentaje + "% de respuestas correctas";

    let mensaje = "";

    if(porcentaje >= 90){

        mensaje = "🌟 ¡Excelente trabajo!";

    }else if(porcentaje >= 70){

        mensaje = "👏 ¡Muy buen resultado!";

    }else if(porcentaje >= 50){

        mensaje = "🙂 Nada mal, podés mejorar.";

    }else{

        mensaje = "📚 ¡Seguí practicando!";

    }

    document.getElementById("mensaje").innerHTML = mensaje;

}

function guardarRanking(){

    const nombre = document.getElementById("nombreJugador").value.trim();

    if(nombre === ""){

        alert("Ingresá un nombre.");

        return;

    }

    const puntaje = Number(localStorage.getItem("puntaje"));

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({

        nombre: nombre,

        puntaje: puntaje

    });

    ranking.sort((a,b)=>b.puntaje-a.puntaje);

    ranking = ranking.slice(0,10);

    localStorage.setItem("ranking",JSON.stringify(ranking));

    mostrarRanking();

    document.getElementById("nombreJugador").disabled=true;

}

function mostrarRanking(){

    const contenedor=document.getElementById("ranking");

    if(!contenedor) return;

    const ranking=JSON.parse(localStorage.getItem("ranking"))||[];

    let html="<ol class='list-group list-group-numbered'>";

    ranking.forEach(function(jugador){

        html+=`

<li class="list-group-item d-flex justify-content-between">

<span>${jugador.nombre}</span>

<strong>${jugador.puntaje}</strong>

</li>

`;

    });

    html+="</ol>";

    contenedor.innerHTML=html;

}

mostrarRanking();