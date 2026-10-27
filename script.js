/* =========================================
   REFERENCIAS A ELEMENTOS DE LA PÁGINA
   (los guardamos una vez al principio para usarlos después)
   ========================================= */
const bienvenida = document.querySelector("#bienvenida");
const app = document.querySelector("#app");
const contenedor = document.querySelector("#AbrirContenedor");
const superior = document.querySelector(".superior");
const mensaje = document.querySelector(".mensaje");
const corazon = document.querySelector(".corazon");
const btnAbrir = document.querySelector("#Abrir");
const btnCerrar = document.querySelector("#Cerrar");
const linkEntrar = document.querySelector("#link-entrar");


/* =========================================
   PANTALLA 1: EL SOBRE
   Antes el código de abrir estaba copiado dos veces
   (botón y clic en el sobre). Ahora es una función
   y se llama desde los dos sitios.
   ========================================= */
let cartaAbierta = false;

function abrirCarta() {
    if (cartaAbierta) return;   // si ya está abierta, no hacemos nada
    cartaAbierta = true;

    superior.classList.add("abrir-superior");
    bienvenida.classList.add("titulo-arriba");
    corazon.classList.add("quieto");

    // Esperamos a que la solapa termine de girar y entonces sale la carta
    setTimeout(() => {
        mensaje.classList.add("abrir-mensaje");
        superior.style.zIndex = -1;
    }, 700);
}

function cerrarCarta() {
    if (!cartaAbierta) return;
    cartaAbierta = false;

    mensaje.classList.remove("abrir-mensaje");

    // Esperamos a que la carta baje y entonces se cierra la solapa
    setTimeout(() => {
        bienvenida.classList.remove("titulo-arriba");
        corazon.classList.remove("quieto");
        superior.style.zIndex = 0;
        superior.classList.remove("abrir-superior");
    }, 700);
}

btnAbrir.addEventListener("click", abrirCarta);
btnCerrar.addEventListener("click", cerrarCarta);
contenedor.addEventListener("click", abrirCarta);


/* =========================================
   DE LA BIENVENIDA A LA APP
   ========================================= */
function entrarApp() {
    bienvenida.classList.add("saliendo");        // se desvanece (0.5s)

    setTimeout(() => {
        bienvenida.classList.add("oculta");
        app.classList.remove("oculta");
        window.scrollTo(0, 0);
    }, 500);
}

linkEntrar.addEventListener("click", (e) => {
    e.preventDefault();      // que el "#" no mueva la página
    e.stopPropagation();     // que no cuente como clic en el sobre
    entrarApp();
});


/* =========================================
   PANTALLA 2: NAVEGACIÓN ENTRE VISTAS
   ========================================= */
const botonesNav = document.querySelectorAll(".nav-boton");
const vistas = document.querySelectorAll(".vista");

function cambiarVista(nombre) {
    vistas.forEach((vista) => {
        vista.classList.toggle("activa", vista.id === "vista-" + nombre);
    });
    botonesNav.forEach((boton) => {
        boton.classList.toggle("activo", boton.dataset.vista === nombre);
    });
}

botonesNav.forEach((boton) => {
    boton.addEventListener("click", () => cambiarVista(boton.dataset.vista));
});


/* =========================================
   LA BATERÍA
   Cada remedio distinto que abre suma un trocito.
   ========================================= */
const bateriaNivel = document.querySelector("#bateria-nivel");
const bateriaTexto = document.querySelector("#bateria-texto");
const bateriaMensaje = document.querySelector("#bateria-mensaje");

const remediosAbiertos = new Set();   // un Set no repite elementos
const totalRemedios = document.querySelectorAll(".tarjeta").length;

// Un mensaje distinto según cuántos lleva abiertos (0, 1, 2, 3, 4)
const mensajesBateria = [
    "Abre los remedios para cargar la batería 🔋",
    "Ya hay algo de energía ⚡",
    "Vas por la mitad, sigue 💪",
    "Casi casi… 😏",
    "¡Batería al 100%! Ya puedes con todo 💚",
];

function actualizarBateria() {
    const porcentaje = Math.round((remediosAbiertos.size / totalRemedios) * 100);

    bateriaNivel.style.width = porcentaje + "%";
    bateriaTexto.textContent = porcentaje + "%";
    bateriaMensaje.textContent = mensajesBateria[remediosAbiertos.size];
}


/* =========================================
   LOS REMEDIOS (tarjetas + ventanita)
   ========================================= */
const modal = document.querySelector("#modal");
const modalContenido = document.querySelector("#modal-contenido");
const modalCerrar = document.querySelector("#modal-cerrar");

// Lo que se ve dentro de la ventanita para cada remedio.
// Para añadir uno nuevo: pones aquí su contenido y una tarjeta en el HTML.
const contenidos = {
    audio: `
        <h3>Qué gracia me hace este audio</h3>
        <div class="modal-emoji">💚</div>
        <audio controls>
            <source src="audiote suyi.m4a" type="audio/mp4">
            Tu navegador no soporta audio :(
        </audio>
    `,

    fotos: `
        <h3>📸</h3>
        <div class="collage">
            <img src="suyisenderismo.jpeg" alt="Foto de Suyi">
            <img src="suyibeso.jpg" alt="Foto de Suyi">
            <img src="suyifeli.jpg" alt="Foto de Suyi">
            <img src="suyimiedo.jpeg" alt="Foto de Suyi">
            <img src="suyitusudadera.jpeg" alt="Foto de Suyi">
            <img src="suyiojopez.jpeg" alt="Foto de Suyi">
        </div>
    `,

    mensaje: `
        <h3>💌</h3>
        <p class="texto-mensaje">
            La vida se vive una vez y me apetece tanto tanto tanto tanto
            vivirla toda todita contigo. Me encantas desde el primer momento
            en el que me fijé en ti. No cambies nunca. Sigue siendo el Gabriel
            que yo siempre quise encontrar.
            <br>Te quiero.
        </p>
        <h3>💌</h3>
    `,
};

function abrirModal(nombre) {
    modalContenido.innerHTML = contenidos[nombre];
    modal.classList.remove("oculta");
}

function cerrarModal() {
    modal.classList.add("oculta");
    modalContenido.innerHTML = "";    // así también se para el audio
}

modalCerrar.addEventListener("click", cerrarModal);

// Clic en la parte oscura de fuera = cerrar
modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

// Tecla Escape = cerrar
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
});

// Clic en cada tarjeta
document.querySelectorAll(".tarjeta").forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
        const nombre = tarjeta.dataset.remedio;

        if (nombre === "cancion") {
            window.open("https://youtu.be/AS_T47NqNYY", "_blank");
        } else {
            abrirModal(nombre);
        }

        // Marcamos la tarjeta como abierta y subimos la batería
        tarjeta.classList.add("abierta");
        remediosAbiertos.add(nombre);
        actualizarBateria();
    });
});
