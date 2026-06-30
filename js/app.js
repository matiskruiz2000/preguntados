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