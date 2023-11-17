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
    });}
    async function nuevoTramite(pagos) {
  // if (event) {
  //   event.preventDefault();
  // }
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
  creandoArrayGastos();
}
async function mostrarGastos() {
  let arrayPagos = [];
  let resultado = document.getElementById("resultado");
  let mostrarGastosTexto = "";
  let gastoTotal = 0;
  let fechaActual = new Date();
  let fechaFormato = fechaActual.toLocaleString('es-ES', { hour12: false });
  mostrarGastosTexto = "Fecha: " + fechaFormato + "\n";

  // Ordenar los índices por el número de veces que cada concepto ha sido gastado, de mayor a menor
  let indices = Array.from(arrayGastos.keys()).sort((a, b) => numVecesConcepto[b] - numVecesConcepto[a]);

  for (let index of indices) {
    let concepto = arrayGastos[index];
    let gastoPorConcepto = tiposDeGastos[index];
    let numPagos = numVecesConcepto[index];

    if (gastoPorConcepto > 0) {
      let gastoMedio = gastoPorConcepto / numPagos;
      mostrarGastosTexto += `${concepto} ---- ${numPagos} pagos ---- Gasto Medio de ${concepto}: ${gastoMedio.toFixed(2)}€ ---- Total: ${gastoPorConcepto.toFixed(2)}€\n`;

      let idDelConcepto = await obtenerIdConcepto(concepto); 
      arrayPagos.push({
        idConcepto: idDelConcepto,
        importeTotal: gastoPorConcepto.toFixed(2),
        numPagos: numPagos
      });

      gastoTotal += gastoPorConcepto;
    }
  }

  let gastoMedioTotal = gastoTotal / indices.length;
  mostrarGastosTexto += `\nGasto final: ${gastoTotal.toFixed(2)}€\nGasto medio por concepto: ${gastoMedioTotal.toFixed(2)}€`;
  resultado.innerText = mostrarGastosTexto;

   await nuevoTramite(arrayPagos);
  // setTimeout(limpiarResultado, 10000);
  // setTimeout(limpiarInformacion, 10000);
}


function limpiarInformacion() {

  const divPrecio = document.getElementById("divAvisos");

  divPrecio.innerText = "";
  let resultado = document.getElementById("resultado");
  resultado.innerText = "";

}