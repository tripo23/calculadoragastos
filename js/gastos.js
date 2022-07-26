import {
    fechaHoy,
    populateSelect,
    calculadoraDeCuotas,
    ultimaCuota,    
    primeraCuota,
    fechaCierreTC
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
let inputFechaCierre = document.getElementById("fechaCierre");
let lblFechaCierre = document.getElementById("lblFechaCierre");
let apiGastos = "62c4c0c64bccf21c2ecf4b68";
let apiMP = "62c4c5a54bccf21c2ecf5393";
let fechaMovimiento;
let fechaInicio;
let fechaFin;





/* Populo los select */
populateSelect(apiGastos, listCategoria);
populateSelect(apiMP, listMpago);
fechaHoy(inputFecha);
fechaCierreTC(inputFechaCierre);

inputMonto.focus();

/* Si cambio el medio de pago a TC se habilitan las opciones de cuotas */
listMpago.onchange = () => {
    if (listMpago.value == "tc") {
        lblMonto.innerHTML = "Monto total";
        lblCuotas.style.display = "block";
        inputCuotas.style.display = "block";
        lblMontoCuota.style.display = "block";
        inputMontoCuota.style.display = "block";
        lblFechaCierre.style.display = "block";
        inputFechaCierre.style.display = "block";

    } else if (listMpago.value == "ft") {
        inputCuotas.value = 0;
        inputMontoCuota.value = "";
        lblMonto.innerHTML = "Monto";
        lblCuotas.style.display = "none";
        inputCuotas.style.display = "none";
        lblMontoCuota.style.display = "none";
        inputMontoCuota.style.display = "none";
        lblFechaCierre.style.display = "none";
        inputFechaCierre.style.display = "none";
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

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones */
formularioTransaccion.onsubmit = () => {

    fechaMovimiento = new Date(inputFecha.value);
    fechaMovimiento.setDate(fechaMovimiento.getDate()+1);
    fechaMovimiento.setHours(0,0,0,0);
    let fechaCierre = new Date (`${inputFechaCierre.value}T00:00:00`);

    if (inputCuotas.value > 0) {

        // Pago TC
        console.log(fechaCierre);
        fechaInicio = primeraCuota (fechaMovimiento, fechaCierre);
        fechaFin = ultimaCuota(fechaMovimiento, fechaCierre, inputCuotas.value);

        
        validarFormulario(event, formularioTransaccion, "Gasto", fechaMovimiento, inputDescripcion.value, listCategoria.value, listMpago.value, inputMonto.value, inputCuotas.value, inputMontoCuota.value, new Date(), "", "", fechaFin, fechaInicio);

    } else {
        // Pago cash
        validarFormulario(event, formularioTransaccion, "Gasto", fechaMovimiento, inputDescripcion.value, listCategoria.value, listMpago.value, inputMonto.value, inputCuotas.value, inputMontoCuota.value, new Date(), "", "", "","");
    }
  
}