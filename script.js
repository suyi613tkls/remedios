/* =========================================
   todas las refs a los elementos que uso, para q esten una sola vez y no repetir cod
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
   el sobre que se abre y se cierra
   ========================================= */
let cartaAbierta = false;

function abrirCarta() {
    if (cartaAbierta) return;   // esto es si está abierta la carta
    cartaAbierta = true;

    superior.classList.add("abrir-superior");
    bienvenida.classList.add("titulo-arriba");
    corazon.classList.add("quieto");


    setTimeout(() => {
        mensaje.classList.add("abrir-mensaje");
        superior.style.zIndex = -1;
    }, 700);
}

function cerrarCarta() {
    if (!cartaAbierta) return;
    cartaAbierta = false;

    mensaje.classList.remove("abrir-mensaje");


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
   lo que se ve al entrar a la app
   ========================================= */
function entrarApp() {
    bienvenida.classList.add("saliendo");

    setTimeout(() => {
        bienvenida.classList.add("oculta");
        app.classList.remove("oculta");
        window.scrollTo(0, 0);
    }, 500);
}

linkEntrar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    entrarApp();
});


/* =========================================
   navegar entre las vistas de la app
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
   gestión del bloque de la batería y como se va cargando
   ========================================= */
const bateriaNivel = document.querySelector("#bateria-nivel");
const bateriaTexto = document.querySelector("#bateria-texto");
const bateriaMensaje = document.querySelector("#bateria-mensaje");

const remediosAbiertos = new Set();   // un Set no repite elementos
let confetiLanzado = false;           // para que el confeti salga una sola vez
const totalRemedios = document.querySelectorAll(".tarjeta").length;

// mensajito que sale según va abriendo remedios
const mensajesBateria = [
    "abre los remedios para cargar la bateríaaaa",
    "ves como si que recargan",
    "seguro que ya lo vas notando, 50% es un montón",
    "casi casi… queda poco",
    "batería al 100%, jssjsjs, ya puedes con todo y más, te quiero",
];

function actualizarBateria() {
    const porcentaje = Math.round((remediosAbiertos.size / totalRemedios) * 100);

    bateriaNivel.style.width = porcentaje + "%";
    bateriaTexto.textContent = porcentaje + "%";
    bateriaMensaje.textContent = mensajesBateria[remediosAbiertos.size];

    // si ya están todos abiertos, confeti (solo la primera vez)
    if (remediosAbiertos.size === totalRemedios && !confetiLanzado) {
        confetiLanzado = true;
        lanzarConfeti();
    }
}


/* =========================================
   confeti cuando la batería llega al 100%
   ========================================= */
const coloresConfeti = ["#a6f0c6", "#3fb070", "#ddc4ff", "#eae2b7", "#ff9ecb", "#ffd86b"];

function lanzarConfeti() {
    for (let i = 0; i < 90; i++) {
        const trozo = document.createElement("div");
        trozo.classList.add("confeti");

        // cada trozo sale con valores al azar para que no caigan todos igual
        trozo.style.left = Math.random() * 100 + "vw";
        trozo.style.background = coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)];
        trozo.style.animationDuration = 2.5 + Math.random() * 2 + "s";
        trozo.style.animationDelay = Math.random() * 0.8 + "s";
        trozo.style.setProperty("--vaiven", (Math.random() * 200 - 100) + "px");

        // algunos redondos y de distinto tamaño
        const tam = 6 + Math.random() * 8;
        trozo.style.width = tam + "px";
        trozo.style.height = tam * 1.5 + "px";
        if (Math.random() < 0.3) trozo.style.borderRadius = "50%";

        // cuando termina de caer lo borro para no llenar la página de divs
        trozo.addEventListener("animationend", () => trozo.remove());

        document.body.appendChild(trozo);
    }
}


/* =========================================
   la parte de los remedios y la ventana modal
   ========================================= */
const modal = document.querySelector("#modal");
const modalContenido = document.querySelector("#modal-contenido");
const modalCerrar = document.querySelector("#modal-cerrar");

// lo que se ve dentro de cada remedio
const contenidos = {
    audio: `
        <h3>Qué gracia me hace este audio</h3>
        <div class="modal-emoji">💚</div>
        <audio controls>
            <source src="audiote_suyi.m4a" type="audio/mp4">
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
    modalContenido.innerHTML = "";
}

modalCerrar.addEventListener("click", cerrarModal);

// esto cierra si clicas fuera
modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

// tecla Escape = cerrar
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
});

// clic en cada tarjeta
document.querySelectorAll(".tarjeta").forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
        const nombre = tarjeta.dataset.remedio;

        if (nombre === "cancion") {
            window.open("https://youtu.be/AS_T47NqNYY", "_blank");
        } else {
            abrirModal(nombre);
        }

        // la tarjeta como abierta y se actualiza lo de la batería
        tarjeta.classList.add("abierta");
        remediosAbiertos.add(nombre);
        actualizarBateria();
    });
});
