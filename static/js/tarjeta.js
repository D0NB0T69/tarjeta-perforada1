// Filas de la tarjeta de arriba hacia abajo
const FILAS = ["12", "11", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const NUMERO_COLUMNAS = 80;

const entradaTexto = document.getElementById("entradaTexto");
const tarjeta = document.getElementById("tarjeta");

// Construye la tarjeta completa: numeros, etiquetas y 80 columnas de agujeros
function crearTarjeta() {
  // Fila de numeros de columna (1 a 80)
  let numeros = '<div class="numeros"><span class="espacio"></span>';
  for (let n = 1; n <= NUMERO_COLUMNAS; n++) {
    numeros += `<span>${n}</span>`;
  }
  numeros += "</div>";

  // Etiquetas de filas (12, 11, 0 a 9)
  let etiquetas = '<div class="etiquetas">';
  for (const fila of FILAS) {
    etiquetas += `<span>${fila}</span>`;
  }
  etiquetas += "</div>";

  // 80 columnas, cada una con 12 agujeros
  let columnas = '<div class="zona-columnas">';
  for (let i = 0; i < NUMERO_COLUMNAS; i++) {
    columnas += '<div class="columna">';
    for (const fila of FILAS) {
      columnas += `<div class="agujero" data-fila="${fila}"></div>`;
    }
    columnas += "</div>";
  }
  columnas += "</div>";

  tarjeta.innerHTML = numeros + '<div class="cuerpo">' + etiquetas + columnas + "</div>";
}

// Perfora la tarjeta con la respuesta del servidor
function dibujarColumnas(columnasRespuesta) {
  const columnas = document.querySelectorAll(".columna");

  columnas.forEach((columna, i) => {
    // Si no hay dato para esta columna, queda vacia
    const datos = columnasRespuesta[i];
    const filas = datos ? datos.filas : [];
    const error = datos ? datos.error : false;

    columna.classList.toggle("error", error);
    columna.querySelectorAll(".agujero").forEach(agujero => {
      agujero.classList.toggle("perforado", filas.includes(agujero.dataset.fila));
    });
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

  if (respuesta.ok) {
    dibujarColumnas(datos.columnas);
  } else {
    console.error(datos.error);
  }
}

// Cada vez que el usuario escribe, se pide la nueva perforacion
entradaTexto.addEventListener("input", () => pedirPerforacion(entradaTexto.value));

// Al cargar la pagina se crea la tarjeta vacia
crearTarjeta();
dibujarColumnas([]);