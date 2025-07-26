let numeroSecreto = GenerarNumeroSecreto();
let intentos = 1;
mensajesIniciales();

function asignarTextoElemento(elemento, texto) {
  let titulo = document.querySelector(elemento);
  titulo.innerHTML = texto;
}

function GenerarNumeroSecreto() {
  return Math.floor(Math.random() * 10) + 1;
}

function verificarIntento() {
  let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
  console.log(numeroUsuario);
  console.log(numeroSecreto);

  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      "Felicidades, adivinaste el número secreto en " +
        intentos +
        (intentos === 1 ? " intento" : " intentos") +
        "!"
    );
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El numero secreto es menor");
    } else {
      asignarTextoElemento("p", "El numero secreto es mayor");
    }
    intentos++;
    limparCaja();
  }
}

function limparCaja() {
  let valorCaja = document.querySelector("#valorUsuario");
  valorCaja.value = "";
}

function mensajesIniciales() {
  asignarTextoElemento("h1", "Juego del numero secreto");
  asignarTextoElemento(
    "p",
    "Adivina el numero secreto, escoge un numero entre 1 y 10"
  );
}

function reiniciarJuego() {
  //limpiar caja
  limparCaja();
  //reiniciar mensajes
  mensajesIniciales();
  //reiniciar intentos
  intentos = 1;
  //generar numero secreto 
  numeroSecreto = GenerarNumeroSecreto();
  //Desabilitar boton de reinicio
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  
}
