import {
    categoriasIngresos
} from './categorias.js';

import {
    fechaHoy,
    populateSelect
} from './functions.js';

import {
    validarFormulario
} from './checkout.js'




let mensajeModal = document.getElementById("mensajeModal");
let inputDescripcion = document.getElementById("descripcionIngreso");
let inputMonto = document.getElementById("montoIngreso");

let timestamp = new Date();
let listCategoria = document.getElementById("categoriaIngreso");
let inputFecha = document.getElementById("fechaIngreso");
let formularioTransaccion = document.getElementById("ingresarContainerIngreso");

populateSelect(categoriasIngresos, listCategoria);
fechaHoy(inputFecha);

/* CHECKOUT */

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */

//formularioTransaccion.addEventListener("submit", validarFormulario(formularioTransaccion,"ingreso",inputFecha.ariaValueMax, inputDescripcion.value, listCategoria.value,"",inputMonto.value,"","",new Date()));

formularioTransaccion.onsubmit = () => {
    validarFormulario(formularioTransaccion,"ingreso",inputFecha.value, inputDescripcion.value, listCategoria.value,"",inputMonto.value,"","",timestamp);
}


