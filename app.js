//alcance o ambito de la variable
let numeroSecreto = 0;
let intentos = 0;
//Vamos a almacenar en la siguiente lista todos los numeros sorteados para que vuelva a ser usado
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//funcion para darle valor a elementos dentro del archivo HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    //es normal y buena practica dejar un return en todas las funciones
    return; 
}
//funcion para verificar si numero input de usuario es igual a numero secreto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(intentos);
     //triple igual compara tanto valor como tipo de dato (int con int, string con string, etc)
    if(numeroDeUsuario === numeroSecreto) {
        //se puede poner template strings en parametros también! y aplicamos operador ternario para la palabra vez y veces
        asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'}`);
        //en el HTML el boton reiniciar esta disabled, vamos a quitar el atributo de disabled solamente cuando se acierte en el intento
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El numero secreto es menor');
        } else {
            asignarTextoElemento('p', ' El numero secreto es mayor');
        }
        //incrementar el número del intento cuando falle usuario
        intentos++;
        limpiarCaja();
    }
    return;
}

//funcion afuera para limpiar caja de intentos
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

//funcion para generar numero secreto
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los numeros vamos a poner un validador (o clausula de salida)
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    } else {
        //Si el numero generado esta incluido en la lista la funcion va a llamarse a si misma de nuevo, invocando el concepto de recursividad de las funciones en JS
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    /*return significa cuando ejecutamos la funcion nos devolvará el valor que crea la funcion, 
    para esta funcion no era necesario definir una variable, solamente usando return podemos generar el mismo resultado*/
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto 2.0');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();    
    intentos = 1;
}

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de numeros
    //Generar numero aleatorio nuevo, no declarar numero secreto nuevo, solo invocar nuevamente la funcion
    //Reiniciar numero de intentos
    condicionesIniciales();
    //Deshabilitar boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}


condicionesIniciales();

