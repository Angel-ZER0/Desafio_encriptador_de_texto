//Ubicando en elemento textarea en donde se entrará el texto a ser cifrado/descrifrado
const ENCRIPTADOR = document.getElementById("encriptador");

//Párrafo en donde saldrá el texto encriptado/desencriptado
const TEXTO_ENCRIPTADO = document.getElementById("encriptado");

//Ubicando contenedor con los botones que activarán el escriptado o desencriptado de texto
const MODOS = document.getElementsByClassName("modos")[0];

//Botón modo encriptar
const ACTIVAR_ENCRIPTADOR = document.getElementById("encriptar");

//Botón modo desencriptar
const ACTIVAR_DESENCRIPTADOR = document.getElementById("desencriptar");

//Arreglo de elementos con clase consola
const ARREGLO_CONSOLAS = document.getElementsByClassName("consola");

//Ubicando primer elemento del arreglo anterior
const CONSOLA_ENTRADA = ARREGLO_CONSOLAS[0];

//Ubicando segundo elemento del arreglo anterior
const CONSOLA_SALIDA = ARREGLO_CONSOLAS[1];

/*Creando botón que llamará a la función que de desencriptará el texto
se añade este botón a un contenedor que tendrá la clase .contenedorBoton
para acomodarlo dentro del mismo*/
const BOTON_DESENCRIPTAR = document.createElement("button");
BOTON_DESENCRIPTAR.textContent = "Desifrar mensaje";
const CONTENEDOR_BOTON_1 = document.createElement("div");
CONTENEDOR_BOTON_1.setAttribute("class", "contenedorBoton");
CONTENEDOR_BOTON_1.appendChild(BOTON_DESENCRIPTAR);

/*/*Creando botón que llamará a la función que copirá el texto
del párrado encriptado y se le la añade la clase .contenedorBoton
a su contenedor acomodarlo dentro del mismo*/
//Creacion párrafo de aviso
const CARACTER_INVALIDO = document.createElement("p");
CARACTER_INVALIDO.className = "advertencia";
const BOTON_COPIAR = document.createElement("button");
BOTON_COPIAR.textContent = "Copiar texto";
const CONTENEDOR_BOTON_2 = document.createElement("div");
CONTENEDOR_BOTON_2.setAttribute("class", "contenedorBoton");
CONTENEDOR_BOTON_2.appendChild(BOTON_COPIAR);

//objeto usado en la función encriptarTexto para reemplazar las vocales por sus contrapartes cifradas
const PALABRAS = Object.freeze ({
    "\n": "<br>",
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
});

//objeto usado en la función reemplazarCifrados para reemplazar los cifradas por sus contrapartes vocales
const VOCALES = Object.freeze ({
    "\n": "<br>",
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
});

//objeto que contiene los caracteres válidos para la encriptación
const ALFABETO = Object.freeze({
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
  h: 'h',
  i: 'i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  ñ: 'ñ',
  o: 'o',
  p: 'p',
  q: 'q',
  r: 'r',
  s: 's',
  t: 't',
  u: 'u',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 'z',
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "0",
  " ": " ",
  "¡": "¡",
  "!": "!",
  "¿": "¿",
  "?": "?",
  "'": "'",
  '"': '"',
  ",": ",",
  ".": ".",
  "\n": "\n",
  ":": ":",
  "(": "(",
  ")": ")"
});

//Función que controla el texto y aparicion del botón para copiar el texto cifrado/descifrado
function aparicionBoton () {
    BOTON_COPIAR.textContent = "Copiar texto";
    if (ENCRIPTADOR.value.length === 0 && [...CONSOLA_SALIDA.childNodes].includes(CONTENEDOR_BOTON_2) || TEXTO_ENCRIPTADO.textContent === "Eliminar caracteres inválidos antes de continuar." && [...CONSOLA_SALIDA.childNodes].includes(CONTENEDOR_BOTON_2)) {
        CONSOLA_SALIDA.removeChild(CONTENEDOR_BOTON_2);
    } else if (ENCRIPTADOR.value.length > 0 && TEXTO_ENCRIPTADO.textContent !== "Eliminar caracteres inválidos antes de continuar.") {
        CONSOLA_SALIDA.appendChild(CONTENEDOR_BOTON_2);
    }
}

/*Función que verifica que el elemento ENCRIPTADOR no contenga caracteres no
 deseados en el texto de salida*/
function verifivadorCaracteres() {
    let arregloTexto = ENCRIPTADOR.value.split("");
    let arregloCaracteresInvalidos = [];
    for (let caracter of arregloTexto) {
        if (ALFABETO.hasOwnProperty(caracter) === false) {
            arregloCaracteresInvalidos.push(caracter);
        }
    }
    if (arregloCaracteresInvalidos.length > 0) {
        CARACTER_INVALIDO.innerHTML = "Caracter inválido introducido, favor de eliminar el/los siguiente(s) caracter(es): <span class='azul'>" + arregloCaracteresInvalidos.join(" ").toString() + "</span>";
        CONSOLA_ENTRADA.appendChild(CARACTER_INVALIDO);
    } else {
        CARACTER_INVALIDO.remove();
    }
}

/*Función que encripta el texto en el elemento textarea del html mediante el método .split
 sobre el value del mismo para convertirlo en un arreglo de caracteres e iterar sobre el
 buscando las vocales para reemplazarlas según sea el caso con su contraparte cifrada declarada
 en el objeto PALABRAS y arroja el resultado unido de nuevo y transformado a una cadena en el
 elemento TEXTO_ENCRIPTADO*/
function encriptarTexto () {
    //llamada a la función verifivadorCaracteres
    verifivadorCaracteres();
    //condicional que no permite visualizar texto cifrado si este el elemento ENCRIPTADOR contiene caracteres inválidos
    if ([...CONSOLA_ENTRADA.childNodes].includes(CARACTER_INVALIDO)) {
        TEXTO_ENCRIPTADO.innerText = "Eliminar caracteres inválidos antes de continuar.";
    //condicional que a permite la ejecución del encriptado de manera correcta
    } else {
        let arregloTexto = ENCRIPTADOR.value.split("");
        for (let caracter of arregloTexto) {
            if (PALABRAS.hasOwnProperty(caracter)) {
                arregloTexto.splice(arregloTexto.indexOf(caracter), 1, PALABRAS[caracter]);
            }
        }
        TEXTO_ENCRIPTADO.innerHTML = arregloTexto.join("").toString();
    }
    aparicionBoton();
}

/*Función que toma el texto del elemento ENCRIPTADOR y reemplaza los fragmentos encriptados
 meditante un ciclo y el objeto VOCALES para después arrojar el resultado al elemento TEXTO_ENCRIPTADO*/
function reemplazarCifrados() {
    let textoDescifrado = ENCRIPTADOR.value;
    //condicional que no permite visualizar texto descifrado si este el elemento ENCRIPTADOR contiene caracteres inválidos
    if ([...CONSOLA_ENTRADA.childNodes].includes(CARACTER_INVALIDO)) {
        TEXTO_ENCRIPTADO.innerText = "Eliminar caracteres inválidos antes de continuar.";
    } else {
        for (const vocal in VOCALES) {
            const regex = new RegExp(vocal, 'g');
            textoDescifrado = textoDescifrado.replace(regex, VOCALES[vocal]);
        }
        TEXTO_ENCRIPTADO.innerHTML = textoDescifrado;
    }
    aparicionBoton();
}

/*añadidor de eventos al elemento ubicado en la constate MODOS:*/
MODOS.addEventListener("click", () => {
    //Si el botón clickeado es el ubicado en ACTIVAR_ENCRIPTADOR
    if (event.target === ACTIVAR_ENCRIPTADOR) {
        ENCRIPTADOR.removeEventListener("keyup", verifivadorCaracteres);
        //Coloca la clase .activo a este botón
        ACTIVAR_ENCRIPTADOR.className = "activo";
        //Borra el texto dentro del elemento ENCRIPTADOR
        ENCRIPTADOR.value = "";
        //reemplaza el texto del atributo placeholder del elemento encriptador
        ENCRIPTADOR.placeholder = "Introducir texto a encriptar";
        //Borra el texto que pudiera tener el párrado TEXTO_ENCRIPTADO
        TEXTO_ENCRIPTADO.textContent = "";
        /*Condicinal que hace que si el elemento CONSOLA_SALIDA tiene dentro de si
        el elemento CONTENEDOR_BOTON_2 lo elimine*/
        if ([...CONSOLA_SALIDA.childNodes].includes(CONTENEDOR_BOTON_2)) {
            CONTENEDOR_BOTON_2.remove();
        }
        //añade el evento tipo "keyup" al elemento encriptador
        ENCRIPTADOR.addEventListener("keyup", encriptarTexto);
        //condicional que desactiva la clase .activo del botón ACTIVAR_DESENCRIPTADOR
        if (ACTIVAR_DESENCRIPTADOR.classList.contains("activo")) {
            ACTIVAR_DESENCRIPTADOR.classList.toggle("activo");
        }
        /*Condicinal que remueve el elemento CONTENEDOR_BOTON_1 y el parráfo CARACTER_INVALIDO
        de la CONSOLA_ENTRADA si cuenta con el*/
        if ([...CONSOLA_ENTRADA.childNodes].includes(CONTENEDOR_BOTON_1) || [...CONSOLA_ENTRADA.childNodes].includes(CARACTER_INVALIDO)) {
            CONSOLA_ENTRADA.removeChild(CONTENEDOR_BOTON_1);
            CONSOLA_ENTRADA.removeChild(CARACTER_INVALIDO);
        }
    //condicional de la función en caso que se clickeé el BOTON_DESENCRIPTAR
    } else if (event.target === ACTIVAR_DESENCRIPTADOR) {
        //Coloca la clase .activo a este botón
        ACTIVAR_DESENCRIPTADOR.className = "activo";
        //elimina el eventListener del elemento ENCRIPTADOR
        ENCRIPTADOR.removeEventListener("keyup", encriptarTexto);
        //elimina el contenido del elemento ENCRIPTADOR
        ENCRIPTADOR.value = "";
        //Reemplaza el placeholder del elemento encriptador para indicar este modo
        ENCRIPTADOR.placeholder = "Introducir texto a desencriptar";
        //borra el contenido del párrafo que muestra  el texto encriptado/desencriptado
        TEXTO_ENCRIPTADO.textContent = "";
        //añade el contenedor del BOTON_DESENCRIPTAR a la CONSOLA_ENTRADA
        CONSOLA_ENTRADA.appendChild(CONTENEDOR_BOTON_1);
        /*añade un eventListener al botón BOTON_DESENCRIPTAR de tipo click que llama
        la función para desencriptar el texto escrito en ENCRIPTADOR*/
        BOTON_DESENCRIPTAR.addEventListener("click", () => {
            verifivadorCaracteres();
            reemplazarCifrados();
        });
        //añade un eventListener de tipo keyup al elemento encriptador
        ENCRIPTADOR.addEventListener("keyup", verifivadorCaracteres);
        //Condicinal que elimina el contenedor del botón copiar en caso de tenerlo
        if ([...CONSOLA_SALIDA.childNodes].includes(CONTENEDOR_BOTON_2)) {
            CONSOLA_SALIDA.removeChild(CONTENEDOR_BOTON_2);
        }
        //condicional que remueve el párrafo que indica los caracteres inválidos
        if ([...CONSOLA_ENTRADA.childNodes].includes(CARACTER_INVALIDO)) {
            CONSOLA_ENTRADA.removeChild(CARACTER_INVALIDO);
        }
        //condicional que desactiva la clase .activo del botón ACTIVAR_ENCRIPTADOR
        if (ACTIVAR_ENCRIPTADOR.classList.contains("activo")) {
            ACTIVAR_ENCRIPTADOR.classList.toggle("activo");
        }
    }
});

/*añadir eventListener al BOTON_COPIAR de tipo click, que ejecuta la función
declarada dentro de la misma que copia el texto del elemento TEXTO_ENCRIPTADO
y cambia el texto del mismo al ser clickeado*/
BOTON_COPIAR.addEventListener("click", () => {
    navigator.clipboard.writeText(TEXTO_ENCRIPTADO.innerText);
    BOTON_COPIAR.textContent = "Texto copiado";
});
