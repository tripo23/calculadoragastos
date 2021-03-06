import {
    fechaHoy,
    populateSelect,
    checkSession
} from './functions.js';

import {
    validarFormulario
} from './checkout.js'



let inputDescripcion = document.getElementById("descripcionIngreso");
let inputMonto = document.getElementById("montoIngreso");
let listCategoria = document.getElementById("categoriaIngreso");
let inputFecha = document.getElementById("fechaIngreso");
let formularioTransaccion = document.getElementById("ingresarContainerIngreso");
let apiIngresos = "62c4c5584bccf21c2ecf530e";
let fechaMovimiento;


/* Chequeo si está logueado */
checkSession();

/* Completo los select y el input de fecha */
populateSelect(apiIngresos, listCategoria);
fechaHoy(inputFecha);

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */
formularioTransaccion.onsubmit = () => {

    fechaMovimiento = new Date(inputFecha.value);
    fechaMovimiento.setDate(fechaMovimiento.getDate()+1);
    fechaMovimiento.setHours(0,0,0,0);
    
    validarFormulario(event, formularioTransaccion,"Ingreso",fechaMovimiento, inputDescripcion.value, listCategoria.value,"",inputMonto.value,"","",new Date(),"","","","");
}


