//Raul Calvo Hdez
var arrayGastos = [];
var tiposDeGastos = [];
var gasto = 0;
function creandoArrayGastos() {
let gastos = Array.from(document.getElementsByTagName("img"));
gastos.forEach((element) => { arrayGastos.push(element.alt); tiposDeGastos.push(0);
  }
  );
  arrayGastos.sort();
  arrayGastos.reverse();
  console.log(arrayGastos);
}
function hacerGastos(tipo, precio) {
let creandoGasto = arrayGastos.findIndex((palabra) => palabra === tipo.alt);
tiposDeGastos[creandoGasto] += 1;
gasto1(precio);
console.log(arrayGastos);
console.log(tiposDeGastos);
console.log(gasto);
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
      mostrarGastos +=   cuota + "  Cuota/s de " + element + "\n"  ;
      GastosRealizadas += cuota;
    }
  });


  resultado.innerText = mostrarGastos + "\n" + "Cantidad Media:" + gasto / GastosRealizadas + "€" + "\n" + "Cantidad Final: " + gasto + " € ";

  console.log(mostrarGastos);
  console.log(arrayGastos);
  console.log(tiposDeGastos);
  console.log(gasto);
  reiniciar();
}
