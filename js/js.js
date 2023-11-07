//Raul Calvo Hdez
var arrayGastos = [];
var tiposDeGastos = [];
var gasto = 0;

function creandoArrayGastos() {
  let gastos = Array.from(document.getElementsByTagName("img"));
  gastos.forEach((element) => {
    arrayGastos.push(element.alt);
    tiposDeGastos.push(0);
  });
  arrayGastos.sort();
  arrayGastos.reverse();
}

function hacerGastos(tipo, precio) {
  let creandoGasto = arrayGastos.findIndex((palabra) => palabra === tipo.alt);
  tiposDeGastos[creandoGasto] += 1;
  gasto1(precio);

  limpiarResultado();
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
var arrayGastos = ["Luz", "Agua", "Fruta", "Medicos", "Transporte", "Telefono", "Colegio", "Internet", "Comunidad de Vecinos", "Netflix"];
var tiposDeGastos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var gastoTotal = 0;

function hacerGastos(tipo, precio) {
  // Solicitar al usuario el importe del pago mediante un prompt
  var cantidad = prompt("Ingrese el importe del pago para " + tipo.alt + " en €:");
  
  // Verificar si la cantidad ingresada es un número válido y mayor a cero
  if (cantidad !== null && !isNaN(parseFloat(cantidad)) && parseFloat(cantidad) > 0) {
    // Convertir la cantidad a número y realizar el pago
    cantidad = parseFloat(cantidad);
    var index = arrayGastos.indexOf(tipo.alt);
    tiposDeGastos[index] += cantidad;
    gastoTotal += cantidad;
    actualizarVisualizacion();
  } else {
    // Mostrar un mensaje si la cantidad ingresada no es válida
    alert("Por favor, ingrese un importe válido mayor a cero.");
  }
}

function actualizarVisualizacion() {
  let resultado = document.getElementById("resultado");
  let detallePagos = document.getElementById("detallePagos");
  resultado.innerText = "Cantidad Total: " + gastoTotal + " €";

  let detalleHtml = "";
  arrayGastos.forEach((concepto, index) => {
    let cantidad = tiposDeGastos[index];
    if (cantidad > 0) {
      detalleHtml += concepto + ": " + cantidad + "€<br>";
    }
  });
  detallePagos.innerHTML = detalleHtml;
}

function mostrarGastos() {
  // Lógica para mostrar los gastos realizados
  // ...
}
