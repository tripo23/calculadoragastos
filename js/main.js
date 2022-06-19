import {
    mediosDePago
} from "./mediosDePago.js";
import {
    categorias
} from './categorias.js';
import {
    modal,
    modalContent
} from './modal.js';

/* Constructor del array principal */
class Transaccion {
    constructor(tipo, descripcion, categoria, metodoDePago, monto, qCuotas, montoCuota, timestamp) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.metodoDePago = metodoDePago;
        this.monto = parseFloat(monto);
        this.qCuotas = parseInt(qCuotas);
        this.montoCuota = montoCuota;
        this.timestamp = timestamp;
    }
}


const transacciones = [];
let tipo;
let descripcion;
let categoria;
let metodoDePago;
let monto;
let montoCuota;
let timestamp;
let transaccionesAnteriores;
let formularioTransaccion = document.getElementById("ingresarContainer");
let listCategoria = document.getElementById("categoria");
let listMpago = document.getElementById("mPago");
let inputDescripcion = document.getElementById("descripcion");
let inputMonto = document.getElementById("monto");
let lblCuotas = document.getElementById("lblCuotas");
let inputCuotas = document.getElementById("cuotas");
let lblMonto = document.getElementById("lblMonto");
let lblMontoCuota = document.getElementById("lblMontoCuota");
let inputMontoCuota = document.getElementById("valCuota");




/* FUNCIONES */


/* Función para rellenar los select */
const populateSelect = (arreglo, select) => {
    for (const c of arreglo) {
        let option = document.createElement("option");
        option.value = c.value;
        option.textContent = c.text;
        select.appendChild(option);
    }
}

/* Función para calcular cuotas */
const calculadoraDeCuotas = (monto, cuotas) => parseFloat((monto / cuotas).toFixed(2));



/* ACCIONES EN FUNCIÓN DE EVENTOS */

/* Capturar la tecla ENTER y no hacer nada, para evitar errores en el formulario */

document.onkeyup = function (e) {
    if (e.key === 'Enter') {
        // no hago nada
        console.log("presionó enter, me hago el gil");
    }

}

/* Si cambio el medio de pago a TC se habilitan las opciones de cuotas */
listMpago.onchange = () => {
    if (listMpago.value == "tc") {
        lblMonto.innerHTML = "Monto total";
        lblCuotas.style.display = "block";
        inputCuotas.style.display = "block";
        lblMontoCuota.style.display = "block";
        inputMontoCuota.style.display = "block";

    } else if (listMpago.value == "ft") {
        inputCuotas.value = 0;
        inputMontoCuota.value = "";
        lblMonto.innerHTML = "Monto";
        lblCuotas.style.display = "none";
        inputCuotas.style.display = "none";
        lblMontoCuota.style.display = "none";
        inputMontoCuota.style.display = "none";
    }
}

/* Calculo el valor de la cuota, cuando el usuario interactua con el monto o la cantidad de cuotas */
inputCuotas.onchange = () => {
    if (!inputCuotas.value < 1) {
        inputMontoCuota.value = calculadoraDeCuotas(parseInt(inputMonto.value), parseInt(inputCuotas.value));
    }
}

inputMonto.onchange = () => {
    if (!inputCuotas.value < 1) {
        inputMontoCuota.value = calculadoraDeCuotas(parseInt(inputMonto.value), parseInt(inputCuotas.value));
    }
}


/* Populo los select con los array */
populateSelect(categorias, listCategoria);
populateSelect(mediosDePago, listMpago);

/* REVISO SI HAY TRANSACCIONES ANTERIORES EN EL LOCALSTORAGE */

transaccionesAnteriores = JSON.parse(localStorage.getItem("transacciones"));
console.log("las transacciones del localStorage");
console.log(transaccionesAnteriores);

/* CHECKOUT */

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */

formularioTransaccion.addEventListener("submit", validarFormulario);

function validarFormulario(e) {

    e.preventDefault();
    tipo = "gasto";
    descripcion = inputDescripcion.value;
    categoria = listCategoria.value;
    metodoDePago = listMpago.value;
    monto = inputMonto.value;
    cuotas = inputCuotas.value;
    montoCuota = inputMontoCuota.value;
    timestamp = new Date();



    // Acá guardo todo en el array
    transacciones.push(new Transaccion(tipo, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp));

    // Llevo lo del localStorage viejo a las transacciones nuevas
    if (transaccionesAnteriores != null) {

        for (const t of transaccionesAnteriores) {
            console.log("cada t");
            console.log(t);
            console.log(t.mPago);
            transacciones.unshift(new Transaccion(t.tipo, t.descripcion, t.categoria, t.metodoDePago, t.monto, t.cuotas, t.montoCuota, t.timestamp));
        }
    }

    localStorage.setItem("transacciones", JSON.stringify(transacciones));
    console.log("el pusheado");
    console.log(transacciones);

    // // Confirmo transacción
    // alert(`¡${descripcion} se guardó correctamente!`)

    // Limpio el form
    formularioTransaccion.reset();
    // Levanto el modal y lo completo
    let contenidoModal = document.createElement("p");
    contenidoModal.innerHTML = `¡${descripcion} se guardó correctamente! ¿Querés agregar otro gasto?`;

    modalContent[0].prepend(contenidoModal);
    modal.style.display = "block";
}

console.log(modalContent);