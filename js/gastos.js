import {
    fechaHoy,
    populateSelect,
    calculadoraDeCuotas,    
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
let apiGastos = "62c4c0c64bccf21c2ecf4b68";
let apiMP = "62c4c5a54bccf21c2ecf5393";


inputMonto.focus();


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
populateSelect(apiGastos, listCategoria);
populateSelect(apiMP, listMpago);
fechaHoy(inputFecha);



/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */
formularioTransaccion.onsubmit = () => {
    validarFormulario(event, formularioTransaccion, "Gasto", inputFecha.value, inputDescripcion.value, listCategoria.value, listMpago.value, inputMonto.value, inputCuotas.value, inputMontoCuota.value, new Date());
}