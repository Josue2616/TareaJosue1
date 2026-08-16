$(document).ready(function () {

   


   
    // ESTADO ACTUAL DEL PERSONAJE


    let personajeActual = "ghast";



    // 1. MOSTRAR / OCULTAR INFORMACIÓN


    $("#btnInfo").on("click", function () {

        $("#extraInfo").slideToggle(500);

    });



    // 2. CAMBIAR TEMA


    $("#btnTema").on("click", function () {

        $("body").toggleClass("light-mode");

    });



    // 3. CAMBIAR PERSONAJE


    $("#btnCharacter").on("click", function () {
        if (personajeActual === "ghast") {

            $("#characterImage").fadeOut(300, function () {

                // Cambiar imagen
                $("#characterImage").attr(
                    "src",
                    "img/creeper.png"
                );

                // Cambiar texto alternativo
                $("#characterImage").attr(
                    "alt",
                    "Creeper de Minecraft"
                );

                // Cambiar nombre
                $("#characterName").text("CREEPER");

                // Cambiar categoría
                $("#characterCategory").text("OVERWORLD");

                // Cambiar descripción
                $("#characterDescription").text(
                    "Una criatura hostil conocida por acercarse silenciosamente."
                );

                // Mostrar nuevamente la imagen
                $("#characterImage").fadeIn(300);

            });

            // Actualizar estado
            personajeActual = "creeper";
   

        } else {

            $("#characterImage").fadeOut(300, function () {

                // Cambiar imagen
                $("#characterImage").attr(
                    "src",
                    "img/ghast.png"
                );

                // Cambiar texto alternativo
                $("#characterImage").attr(
                    "alt",
                    "Ghast de Minecraft"
                );

                // Cambiar nombre
                $("#characterName").text("GHAST");

                // Cambiar categoría
                $("#characterCategory").text("NETHER");

                // Cambiar descripción
                $("#characterDescription").text(
                    "Una criatura flotante que habita en las profundidades del Nether."
                );

                // Mostrar nuevamente la imagen
                $("#characterImage").fadeIn(300);

            });

            // Actualizar estado
            personajeActual = "ghast";

        }

    });

    // cambiar hora


    $("#btnTime,#btnTema").on("click", function () {

        changeTime();

    });

});

