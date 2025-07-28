let listaNumerosSorteados = [];
let numeroSecreto = GenerarNumeroSecreto();
let intentos = 1;
const numeroMaximo = 10;

mensajesIniciales();

function asignarTextoElemento(elemento, texto) {
  let titulo = document.querySelector(elemento);
  titulo.innerHTML = texto;
}

function GenerarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * 10) + 1;

  console.log(numeroGenerado);
  console.log(listaNumerosSorteados);
  //si ya sortemaos todos los numeros
  if (listaNumerosSorteados.length === numeroMaximo) {
    asignarTextoElemento("p", "Se sortearon todos los numeros");
    
  }else{
    //si el numero geerado esta en la lista de numeros sorteados
    if (listaNumerosSorteados.includes(numeroGenerado)) {
        return GenerarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
   }
   
  }
    
  
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
