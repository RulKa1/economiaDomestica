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
  creandoArrayGastos();
}

function mostrarGastos() {
  let resultado = document.getElementById("resultado");
  let mostrarGastosTexto = "";
  let gastoTotal = 0;

  let fechaActual = new Date();
  let fechaFormato = fechaActual.toLocaleString('es-ES', { hour12: false });

  mostrarGastosTexto = "Fecha: " + fechaFormato + "\n";

  // Ordenar los índices de arrayGastos por la cantidad de pagos, de mayor a menor
  let indicesOrdenados = Array.from(arrayGastos.keys()).sort((a, b) => numVecesConcepto[b] - numVecesConcepto[a]);

  indicesOrdenados.forEach((index) => {
    let concepto = arrayGastos[index];
    let gastoPorConcepto = tiposDeGastos[index];
    let numeroPagos = numVecesConcepto[index];
    setTimeout(limpiarInformacion, 10000);


    if (gastoPorConcepto > 0) {
      console.log(arrayGastos);
      let gastoMedio = gastoPorConcepto / numeroPagos;
      mostrarGastosTexto += `${concepto} ---- ${numeroPagos} pagos ---- Gasto Medio de ${concepto}: ${gastoMedio.toFixed(2)}€ ---- ${gastoPorConcepto.toFixed(2)}€\n`;
      gastoTotal += gastoPorConcepto;
        resultado.innerText = mostrarGastosTexto;

    }
  });

  let gastoMedioTotal = gastoTotal / arrayGastos.length;
  mostrarGastosTexto += `\nGasto final: ${gastoTotal.toFixed(2)}€\nGasto medio por concepto: ${gastoMedioTotal.toFixed(2)}€`;

  resultado.innerText = mostrarGastosTexto;
  reiniciar();
}

function limpiarInformacion() {
  let resultado = document.getElementById("resultado");
  const divPrecio = document.getElementById("divAvisos");
  resultado.innerText = "";
  divPrecio.innerText = "";
  // Mantener los datos, solo limpiar la visualización
  // gastoTotal = 0;
  // arrayGastos = [];
  // tiposDeGastos = [];
  // conteoPagosPorConcepto = [];
}
