import {
    arsToUsd,
    fechaHoy,
    populateSelect,
    validarRadioButton
} from './functions.js';

import {
    validarFormulario
} from './checkout.js'



let inputDescripcion = document.getElementById("descripcionIngreso");
let inputMonto = document.getElementById("montoIngreso");
let listCategoria = document.getElementById("categoriaAhorro");
let inputFecha = document.getElementById("fechaIngreso");
let formularioTransaccion = document.getElementById("ingresarContainerIngreso");
const radioButtons = document.querySelectorAll('input[name="moneda"]');
let ahorroEsperado = document.getElementById("ahorroEsperado");
let categoriaAhorro = document.getElementById("categoriaAhorro");
let ars = document.getElementById("radioARS");
let usd = document.getElementById("radioUSD");
let moneda = validarRadioButton(radioButtons);

const ConvertirAUsd = () => {
    moneda = validarRadioButton(radioButtons);
    if (moneda === "ars") {
        ahorroEsperado.value = inputMonto.value;
    } else {
        const converter = async () => {
            ahorroEsperado.value = await arsToUsd(inputMonto.value);
        }
        converter()
    }
}

/* Completo los select y el input de fecha */
fechaHoy(inputFecha);

/* Calculo valor en usd según lo que haya seleccionado el usuario */
inputMonto.onchange = () => ConvertirAUsd();
usd.onchange = () => ConvertirAUsd();
ars.onchange = () => ConvertirAUsd();
categoriaAhorro.onchange = () => {
    if (categoriaAhorro.value === "Compra moneda extranjera") {
        usd.checked = true;
        ConvertirAUsd();
    }
}



/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */
formularioTransaccion.onsubmit = () => {

    validarFormulario(event, formularioTransaccion, "ahorro", inputFecha.value, inputDescripcion.value, listCategoria.value, "", inputMonto.value, "", "", new Date(), ahorroEsperado.value, moneda);
}