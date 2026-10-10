// Filas de la tarjeta de arriba hacia abajo
const FILAS = ["12", "11", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const NUMERO_COLUMNAS = 80;

// Elementos de la pagina
const entradaTexto = document.getElementById("entradaTexto");
const contenedorTarjeta = document.getElementById("tarjeta");

// Crea la tarjeta vacia: 80 columnas con 12 posiciones cada una
function crearTarjeta() {
  contenedorTarjeta.innerHTML = "";

  for (let indiceColumna = 0; indiceColumna < NUMERO_COLUMNAS; indiceColumna++) {
    const columna = document.createElement("div");
    columna.className = "columna";

    for (const fila of FILAS) {
      const agujero = document.createElement("div");
      agujero.className = "agujero";
      agujero.dataset.fila = fila;
      columna.appendChild(agujero);
    }

    contenedorTarjeta.appendChild(columna);
  }
}

// Quita todas las perforaciones y marcas de error
function limpiarTarjeta() {
  for (const columna of contenedorTarjeta.children) {
    columna.classList.remove("error");
    for (const agujero of columna.children) {
      agujero.classList.remove("perforado");
    }
  }
}

// Dibuja las perforaciones con la respuesta del servidor
function dibujarColumnas(columnas) {
  limpiarTarjeta();

  columnas.forEach(function (datosColumna, indice) {
    const columna = contenedorTarjeta.children[indice];

    // Si el caracter no tiene codigo, la columna se marca con error
    if (datosColumna.error) {
      columna.classList.add("error");
      return;
    }

    // Se perforan solo las filas que indico el servidor
    for (const agujero of columna.children) {
      if (datosColumna.filas.includes(agujero.dataset.fila)) {
        agujero.classList.add("perforado");
      }
    }
  });
}

// Envia el texto al servidor y dibuja la respuesta
async function pedirPerforacion(texto) {
  const respuesta = await fetch("/api/perforar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texto: texto })
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    console.error("Error del servidor:", datos.error);
    return;
  }

  dibujarColumnas(datos.columnas);
}

// Cada vez que el usuario escribe, se pide la nueva perforacion
entradaTexto.addEventListener("input", function () {
  pedirPerforacion(entradaTexto.value);
});

// Al cargar la pagina se crea la tarjeta vacia
crearTarjeta();