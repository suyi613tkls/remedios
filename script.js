const btnAbrir = document.querySelector("#Abrir");
const btnCerrar = document.querySelector("#Cerrar");


// Abrir Carta
btnAbrir.addEventListener("click", ()=>{
    const ElementoSuperior = document.querySelector(".superior");
    ElementoSuperior.classList.add("abrir-superior");

    const h1 = document.querySelector("h1");
    const ps = document.querySelectorAll(".psorpresa, .ppsorpresa");

    h1.style.transform = "translateY(-120px)";
    h1.style.transition = "transform 0.65s ease-in-out";

    ps.forEach(p => {
        p.style.transform = "translateY(-120px)";
        p.style.transition = "transform 0.65s ease-in-out";
    });

    const IconoCorazon = document.querySelector(".bx");
    IconoCorazon.classList.add("bx-rotada");

    setTimeout(()=>{
        const ElementoMensaje = document.querySelector(".mensaje");
        ElementoMensaje.classList.add("abrir-mensaje");
        ElementoSuperior.style.zIndex = -1;
    }, 700);
});


// Cerrar Carta
btnCerrar.addEventListener("click", ()=>{
    const ElementoSuperior = document.querySelector(".superior");

    const ElementoMensaje = document.querySelector(".mensaje");
    ElementoMensaje.classList.remove("abrir-mensaje");
    
    //Oculta el cuadradito donde se ve el cont de la carta
    visor.style.display = "none"; 

    setTimeout(()=>{
        const h1 = document.querySelector("h1");
        const ps = document.querySelectorAll(".psorpresa, .ppsorpresa");

        h1.style.transform = "translateY(0px)";
        h1.style.transition = "transform 0.65s ease-in-out";

        ps.forEach(p => {
            p.style.transform = "translateY(0px)";
            p.style.transition = "transform 0.65s ease-in-out";
        });

        const IconoCorazon = document.querySelector(".bx");
        IconoCorazon.classList.remove("bx-rotada");

        ElementoSuperior.style.zIndex = 0;
        ElementoSuperior.classList.remove("abrir-superior");

    }, 700);

});


// Con Click Carta
const Contenedor = document.querySelector("#AbrirContenedor");

Contenedor.addEventListener("click", (e)=>{
    e.stopPropagation();
    const ElementoSuperior = document.querySelector(".superior");
    ElementoSuperior.classList.add("abrir-superior");

    const h1 = document.querySelector("h1");
    const ps = document.querySelectorAll(".psorpresa, .ppsorpresa");

    h1.style.transform = "translateY(-120px)";
    h1.style.transition = "transform 0.65s ease-in-out";

    ps.forEach(p => {
        p.style.transform = "translateY(-120px)";
        p.style.transition = "transform 0.65s ease-in-out";
    });

    const IconoCorazon = document.querySelector(".bx");
    IconoCorazon.classList.add("bx-rotada");

    setTimeout(()=>{
        const ElementoMensaje = document.querySelector(".mensaje");
        ElementoMensaje.classList.add("abrir-mensaje");
        ElementoSuperior.style.zIndex = -1;
    }, 700);
});

// Visor Muestra Contenido Carta
const visor = document.querySelector("#visor");

// AUDIO
document.querySelector("#link-audio").addEventListener("click", (e)=>{
    e.stopPropagation();
    e.preventDefault();
    visor.style.display = "block";
    visor.innerHTML = `
        <div style="text-align:center;">
            <h3 style="margin-bottom:5px;">Qué gracia me hace este audio</h3>
            <div style="font-size:20px; margin-bottom:10px;">💚</div>
            <audio controls>
                <source src="audiote suyi.m4a" type="audio/mp4">
                Tu navegador no soporta audio :(
            </audio>
        </div>
    `;
});

// FOTO
document.querySelector("#link-foto").addEventListener("click", (e)=>{
    e.stopPropagation();
    e.preventDefault();
    visor.style.display = "block";
    visor.innerHTML = `
        <div style="text-align:center;">
            <h3>📸</h3>
            <div class="collage">
                <img src="suyisenderismo.jpeg">
                <img src="suyibeso.jpg">
                <img src="suyifeli.jpg">
                <img src="suyimiedo.jpeg">
                <img src="suyitusudadera.jpeg">
                <img src="suyiojopez.jpeg">
            </div>
        </div>
    `;
});


// MENSAJITO
document.querySelector("#link-texto").addEventListener("click", (e)=>{
    e.stopPropagation();
    e.preventDefault();
    visor.style.display = "block";
    visor.innerHTML = `
        <div style="text-align:center;">
            <h3>💌</h3>
            <p style="font-size:18px; line-height:1.4;">
                La vida se vive una vez y me apetece tanto tanto tanto tanto
                vivirla toda todita contigo. Me encantas desde el primer momento
                en el que me fijé en ti. No cambies nunca. Sigue siendo el Gabriel
                que yo siempre quise encontrar.
                <br>Te quiero.
            </p>
            <h3>💌</h3>
        </div>
    `;
});


// YOUTUBE
document.querySelector("#link-youtube").addEventListener("click", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    window.open("https://youtu.be/AS_T47NqNYY", "_blank");
});

