//*variables
let numeroMaximoPosible = 10
let numeroSecreto = Math.floor(Math.random() * 10) + 1;
let numeroUsuario = 0;
let intentos = 1;
let maximoIntentos = 3;
//let n = "aaaaaaaaaa";
console.log(numeroSecreto)
//console.log(n)

while (numeroUsuario != numeroSecreto) {
  numeroUsuario = prompt("dime un numero entre 1 y " + numeroMaximoPosible);
  console.log("numero usuario es " + numeroUsuario);

  //condicional
  if (numeroUsuario == numeroSecreto) {
    alert("acertaste el numero es: " + numeroUsuario + " lo hiciste en " + intentos+ " intentos");
  } else {
    if (numeroUsuario > numeroSecreto) {
      alert("el numero secreto es  menor");
    } else {
      alert("el numero secreto es mayor");
    }
    //incrementamos el contador cuando no acierta
    intentos++;
    if (intentos > maximoIntentos) {
        alert("no lo lograste");
        break;
    }
  }
}




