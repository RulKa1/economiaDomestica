var arrayGastos = [];
var tiposDeGastos = [];
var gasto = 0;
var ultimoConcepto = "";
var numVecesConcepto = [];

function peticionGetJson(precio) {
  const url = 'http://localhost:3000/conceptos';

  const options = {
    method: "GET"
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log('Precio recibido:', precio);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function peticionPostJson(endPoint, precio) {
  const url = 'http://localhost:3000' + endPoint;
  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(end)
  };
  fetch(url, opciones)
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
async function nuevoTramite(pagos) {

  let fechaTramite = prompt("Ingrese la fecha del trámite (formato MM/AAAA):");
  const url = 'http://localhost:3000/registros';
  let tramite = {
    //  id: tramites()?.length,
    fecha: fechaTramite,
    pagos: await pagos
  };
  const opciones = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tramite)
  };
  fetch(url, opciones)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
async function obtenerIdConcepto(nombreConcepto) {
  const url = 'http://localhost:3000/conceptos?nombre=' + encodeURIComponent(nombreConcepto);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    const data = await response.json();
    return data.length > 0 ? data[0].id : null;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function creandoArrayGastos() {
  let gastos = Array.from(document.getElementsByTagName("img"));
  gastos.forEach((element) => {
    arrayGastos.push(element.alt);
    tiposDeGastos.push(0);
    numVecesConcepto.push(0);
  });
  arrayGastos.sort();
  arrayGastos.reverse();
}

function tramites() {
  const url = 'http://localhost:3000/registros';
  let arrayRegistros = [];

  const options = {
    method: "GET"
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      arrayRegistros = data
    })
    .catch(error => {
      console.error('Error:', error);
    });
  console.log(arrayRegistros);
  return arrayRegistros;
}

function creandoArrayGastos() {
  let gastos = Array.from(document.getElementsByTagName("img"));
  gastos.forEach((element) => {
    arrayGastos.push(element.alt);
    tiposDeGastos.push(0);
    numVecesConcepto.push(0);
  });
  arrayGastos.sort();
  arrayGastos.reverse();
}

function hacerGastos(tipo, precio) {
  var precio = prompt("Ingrese el importe del pago para " + tipo.alt + " en €:");
  if (precio !== null && !isNaN(parseFloat(precio)) && parseFloat(precio) > 0) {
    precio = parseFloat(precio);
    mostrarPrecioEnDiv(tipo.alt, precio);
    let indice = arrayGastos.indexOf(tipo.alt);
    if (indice !== -1) {
      tiposDeGastos[indice] += precio;
      ++numVecesConcepto[indice];
    }
  } else {
    alert("Por favor, ingrese un importe válido mayor a cero.");
  }
  limpiarResultado();

}

function mostrarPrecioEnDiv(tipo, precio) {
  const divPrecio = document.getElementById("divAvisos");
  const tipoClase = tipo.replace();

  if (ultimoConcepto) {
    divPrecio.querySelectorAll(`.${ultimoConcepto}`).forEach(el => {
      el.classList.remove('resaltado');
    });
  }
  const nuevoElemento = document.createElement('span');
  nuevoElemento.classList.add(tipoClase);
  nuevoElemento.innerHTML = `${tipo} ${precio}€<br><br>`;
  divPrecio.appendChild(nuevoElemento);
  divPrecio.querySelectorAll(`.${tipoClase}`).forEach(el => {
    el.classList.add('resaltado');
  });
  ultimoConcepto = tipoClase;
}

function gasto1(gastando) {
  gasto += gastando;
}

function limpiarResultado() {
  let resultado = document.getElementById("resultado");
  resultado.innerText = "";
}

function reiniciar() {
  gasto = 0;
  arrayGastos = [];
  tiposDeGastos = [];
  numVecesConcepto = [];
  let gastos = Array.from(document.getElementsByTagName("img"));
  gastos.forEach((element) => {
    arrayGastos.push(element.alt);
    tiposDeGastos.push(0);
    numVecesConcepto.push(0);
  });
  arrayGastos.sort();
  arrayGastos.reverse();
}
async function mostrarGastos() {
  let arrayPagos = [];
  let resultado = document.getElementById("resultado");
  let mostrarGastosTexto = "";
  let fechaActual = new Date();
  let fechaFormato = fechaActual.toLocaleString('es-ES', {
    hour12: false
  });
  mostrarGastosTexto = "Fecha: " + fechaFormato + "\n";

  let indices = Array.from(arrayGastos.keys()).sort((a, b) => numVecesConcepto[b] - numVecesConcepto[a]);

  let gastoTotal = 0;
  let pagosTotales = 0;

  for (let index of indices) {
    let concepto = arrayGastos[index];
    let gastoPorConcepto = tiposDeGastos[index];
    let numPagos = numVecesConcepto[index];

    if (gastoPorConcepto > 0) {
      let gastoMedioPorConcepto = gastoPorConcepto / numPagos;
      mostrarGastosTexto += `${concepto} ---- ${numPagos} pagos ---- Gasto Medio de ${concepto}: ${gastoMedioPorConcepto.toFixed(2)}€ ---- Total: ${gastoPorConcepto.toFixed(2)}€\n`;

      let idDelConcepto = await obtenerIdConcepto(concepto);
      arrayPagos.push({
        idConcepto: idDelConcepto,
        importeTotal: gastoPorConcepto.toFixed(2),
        numPagos: numPagos
      });

      gastoTotal += gastoPorConcepto;
      pagosTotales += numPagos;
    }
  }

  let gastoMedioTotal = pagosTotales > 0 ? gastoTotal / pagosTotales : 0;
  mostrarGastosTexto += `\nGasto final: ${gastoTotal.toFixed(2)}€\nGasto medio total: ${gastoMedioTotal.toFixed(2)}€/pago`;

  resultado.innerText = mostrarGastosTexto;

 await nuevoTramite(arrayPagos); // si se comenta la siguiente linea de codigo, si que va a mostrar los gastos. (Es debido al error Indicado)
   mostrarVentanaEmergente();
  setTimeout(() => {
    limpiarResultado();
    limpiarInformacion();
    reiniciar();
  }, 10000);

}


function mostrarVentanaEmergente() {
  let ventana = window.open("", "Pagos Realizados", "width=600,height=400");
  ventana.document.title = "Detalle de Pagos";
  let contenido = "<h1>Pagos Realizados</h1>";
  const descripciones = {
    luz: "un gasto imprescindible de categoría Servicios Básicos<hr>",
    agua: "un gasto imprescindible de categoría Servicios Básicos<hr>",
    fruta: "un gasto prescindible de categoría Alimentos<hr>",
    medicos: "un gasto imprescindible de categoría DEP<hr>",
    transporte: "un gasto prescindible de categoría Servicios Básicos<hr>",
    telefono: "un gasto imprescindible de categoría Servicios Básicos<hr>",
    colegio: "un gasto prescindible de categoría Cultura<hr>",
    internet: "un gasto imprescindible de categoría Servicios Básicos<hr>",
    comunidad: "un gasto imprescindible de categoría Servicios Básicos<hr>",
    netflix: "un gasto prescindible de categoría Ocio<hr>",
  };
  arrayGastos.forEach((concepto, index) => {
    if (tiposDeGastos[index] > 0 && descripciones[concepto.toLowerCase()]) {
      contenido += `<p>${concepto}</p> es ${descripciones[concepto.toLowerCase()]}.<br>`;
    }
  });

  ventana.document.body.innerHTML = contenido;
  reiniciar();
}


function limpiarInformacion() {

  const divPrecio = document.getElementById("divAvisos");

  divPrecio.innerText = "";
  let resultado = document.getElementById("resultado");
  resultado.innerText = "";

}