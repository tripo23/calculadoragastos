import {
    mediosDePago
} from "./mediosDePago.js";

import {
    categoriasGastos
} from './categorias.js';

import {
    fechaHoy,
    populateSelect
} from './functions.js';

import {
    validarFormulario
} from './checkout.js'


let inputFecha = document.getElementById("fechaGasto");
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


inputMonto.focus();

/* FUNCIONES */


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

/* Valido que el contenido de MONTO sea número */

inputMonto.onchange = () => {

    if (isNaN(inputMonto.value)) {
        /* Por lo que estuve leyendo, el evento onChange no funciona cuando tipeas caracteres de tipo texto en un textbox de tipo número */
        alert("Por favor ingresá solo números");
        inputMonto.value="";
        inputMonto.focus();
    }

    if (!inputCuotas.value < 1) {
        inputMontoCuota.value = calculadoraDeCuotas(parseInt(inputMonto.value), parseInt(inputCuotas.value));
    }
}



/* COMPLETO EL FORM EN VALORES DEFAULT */

/* Populo los select con los array */
populateSelect(categoriasGastos, listCategoria);
populateSelect(mediosDePago, listMpago);

fechaHoy(inputFecha);

/* CHECKOUT */

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */

formularioTransaccion.onsubmit = () => {

    validarFormulario(event, formularioTransaccion,"gasto",inputFecha.value, inputDescripcion.value, listCategoria.value,listMpago.value,inputMonto.value,inputCuotas.value,inputMontoCuota.value,new Date ());

}
