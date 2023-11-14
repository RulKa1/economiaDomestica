var arrayGastos = [];
var tiposDeGastos = [];
var gasto = 0;
var ultimoConcepto = "";



function creandoArrayGastos() {
  let gastos = Array.from(document.getElementsByTagName("img"));
  gastos.forEach((element) => {
    arrayGastos.push(element.alt);
    tiposDeGastos.push(0);
  });
  arrayGastos.sort();
  arrayGastos.reverse();
}
function peticionGetJson(nombreConcepto, precio) {
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
function hacerGastos(tipo, precio) {
  var precio = prompt("Ingrese el importe del pago para " + tipo.alt + " en €:");

  if (precio !== null && !isNaN(parseFloat(precio)) && parseFloat(precio) > 0) {
    precio = parseFloat(precio);

    mostrarPrecioEnDiv(tipo.alt, precio);

  } else {
    alert("Por favor, ingrese un importe válido mayor a cero.");
  }
  limpiarResultado();
}

function mostrarPrecioEnDiv(tipo, precio) {
  const divPrecio = document.getElementById("divAvisos");

  if (ultimoConcepto) {
    divPrecio.querySelectorAll(`.${ultimoConcepto}`).forEach(el => {
      el.classList.remove('resaltado');
    });
  }

  const nuevoElemento = document.createElement('span');
  nuevoElemento.classList.add(tipo.replace(), 'resaltado');
  nuevoElemento.innerHTML = `${tipo} ${precio}€<br><br>`;
  divPrecio.appendChild(nuevoElemento);

  ultimoConcepto = tipo.replace();

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
  let mostrarGastos = "";
  let GastosRealizadas = 0;


  let indices = Array.from(arrayGastos.keys());
  indices.sort((a, b) => tiposDeGastos[b] - tiposDeGastos[a]);

  indices.forEach((index) => {
    let element = arrayGastos[index];
    let cuota = tiposDeGastos[index];

    if (cuota !== 0) {
      mostrarGastos += cuota + "  Cuota/s de " + element + "\n";
      GastosRealizadas += cuota;
    }
  });


  resultado.innerText = mostrarGastos + "\n" + "Cantidad Media:" + gasto / GastosRealizadas + "€" + "\n" + "Cantidad Final: " + gasto + " € ";



  reiniciar();
}
