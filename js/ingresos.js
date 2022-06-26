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



let inputDescripcion = document.getElementById("descripcionIngreso");
let inputMonto = document.getElementById("montoIngreso");
let listCategoria = document.getElementById("categoriaIngreso");
let inputFecha = document.getElementById("fechaIngreso");
let formularioTransaccion = document.getElementById("ingresarContainerIngreso");

/* Completo los select y el input de fecha */
populateSelect(categoriasIngresos, listCategoria);
fechaHoy(inputFecha);

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */
formularioTransaccion.onsubmit = () => {

    validarFormulario(event, formularioTransaccion,"ingreso",inputFecha.value, inputDescripcion.value, listCategoria.value,"",inputMonto.value,"","",new Date());
}


