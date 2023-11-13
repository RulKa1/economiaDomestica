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
    .then(response => response.json())
    .then(data => {
      console.log('Precio recibido:', precio); // Muestra el precio recibido del servidor en la consola
    })
    .catch(error => {
      console.error('Error:', error); // Maneja los errores si la solicitud no se completa correctamente
    });
}
function peticionPostJson(endPoint , precio) {
   // URL a la que quieres enviar la solicitud POST
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

    // Llamada a la nueva función para mostrar el precio en el div
    mostrarPrecioEnDiv(precio);

    let creandoGasto = arrayGastos.findIndex((palabra) => palabra === tipo.alt);
    peticionGetJson(tipo.alt, precio);
    tiposDeGastos[creandoGasto] += 1;
    gasto1(precio);
  } else {
    alert("Por favor, ingrese un importe válido mayor a cero.");
  }
  limpiarResultado();
}
function mostrarPrecioEnDiv(precio) {
  // Obtén el div donde quieres mostrar el precio
  const divPrecio = document.getElementById("divAvisos");

  // Agrega el nuevo precio al contenido existente del div
  divPrecio.innerHTML += "Precio ingresado: " + precio + "€<br>";
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
      // Updated the format for displaying expenses
      mostrarGastos += `${element} ---- ${cuota} pago${cuota > 1 ? "s" : ""} ---- ${gasto1(cuota)}€\n`;
      GastosRealizadas += cuota;
    }
  });

  // Updated the format for displaying the final and average expenses
  resultado.innerText = mostrarGastos + "\n" + `Gasto final: ${gasto}€\n` + `Gasto medio: ${gasto / GastosRealizadas}€/concept`;

  reiniciar();
}
