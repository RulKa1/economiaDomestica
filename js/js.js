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
function peticionGetJson(nombreConcepto, precio) {

  const url = 'http://localhost:3000/conceptos';

  const options = {
    method: "GET"
  };
fetch(url, options)
  .then(response => {
    console.log(response.json());
    console.log(response);
  })
  .then(data => {
    console.log('Datos recibidos:', data); // Muestra los datos recibidos del servidor en la consola
  })
  .catch(error => {
    console.error('Error:', error); // Maneja los errores si la solicitud no se completa correctamente
  });

  
}
function peticionPostJson(endPoint , precio) {
   // URL a la que quieres enviar la solicitud POST
const url = 'http://localhost:3000' + endPoint;

// Datos que deseas enviar en la solicitud POST (pueden ser un objeto o un formulario serializado)

// Configuración de la solicitud
const opciones = {
  method: 'POST', // Método de la solicitud
  headers: {
    'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
  },
  body: JSON.stringify(end) // Convierte el objeto de datos a formato JSON
};

// Realiza la solicitud Fetch
fetch(url, opciones)
  .then(response => response.json()) // Parsea la respuesta a JSON
  .then(data => {
    console.log('Respuesta del servidor:', data); // Muestra la respuesta del servidor en la consola
  })
  .catch(error => {
    console.error('Error:', error); // Maneja los errores si la solicitud no se completa correctamente
  });
  
}
function hacerGastos(tipo, precio) {
 var precio = prompt("Ingrese el importe del pago para " + tipo.alt + " en €:");
  
  if (precio !== null && !isNaN(parseFloat(precio)) && parseFloat(precio) > 0) {
    precio = parseFloat(precio);
    let creandoGasto = arrayGastos.findIndex((palabra) => palabra === tipo.alt);
    peticionGetJson(tipo.alt, precio);
    tiposDeGastos[creandoGasto] += 1;
    gasto1(precio);
  } else {
    alert("Por favor, ingrese un importe válido mayor a cero.");
  }
  limpiarResultado();
}
// function hacerGastos(tipo, precio) {
//   let creandoGasto = arrayGastos.findIndex((palabra) => palabra === tipo.alt);
//   tiposDeGastos[creandoGasto] += 1;
//   gasto1(precio);

//   limpiarResultado();
// }


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


  resultado.innerText = mostrarGastos + "\n" + "precio Media:" + gasto / GastosRealizadas + "€" + "\n" + "precio Final: " + gasto + " € ";


  reiniciar();
}
