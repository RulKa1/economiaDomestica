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
  const tipoClase = tipo.replace(/\s+/g, '_');

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
    setTimeout(limpiarInformacion, 10000);

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
  let fechaFormato = fechaActual.toLocaleString('es-ES', {
    hour12: false
  });

  mostrarGastosTexto = "Fecha: " + fechaFormato + "\n";


  let conteoPagosPorConcepto = [];

  let indices = Array.from(arrayGastos.keys());

  indices.forEach((index) => {
    let concepto = arrayGastos[index];
    let gastoPorConcepto = tiposDeGastos[index];



    conteoPagosPorConcepto[concepto];

    if (gastoPorConcepto > 0) {
      console.log(numVecesConcepto);
      console.log(numVecesConcepto[index]);

      console.log(arrayGastos);
      console.log(indices);
      console.log(tiposDeGastos);
      let gastoMedio = gastoPorConcepto / numVecesConcepto[index];
      mostrarGastosTexto += `${concepto} ---- ${numVecesConcepto[index]} pagos ---- Gasto Medio de ${concepto}: ${gastoMedio}€ ---- ${gastoPorConcepto.toFixed(2)}€\n`;
      gastoTotal += gastoPorConcepto;
    }
  });
  let gastoMedioTotal = gastoTotal / indices.length;
  mostrarGastosTexto += `\nGasto final: ${gastoTotal.toFixed(2)}€\nGasto medio por concepto: ${gastoMedioTotal.toFixed(2)}€`;
  setTimeout(limpiarInformacion, 10000);


  resultado.innerText = mostrarGastosTexto;
  reiniciar();
}

function limpiarInformacion() {
  let resultado = document.getElementById("resultado");
  const divPrecio = document.getElementById("divAvisos");
  resultado.innerText = "";
  divPrecio.innerText = "";
  gastoTotal = 0;
  arrayGastos = [];
  tiposDeGastos = [];
  conteoPagosPorConcepto = [];
}