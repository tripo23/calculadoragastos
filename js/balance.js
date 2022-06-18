/* Constructor del array principal */
let transacciones;
let agregarGasto = document.getElementById("btnAgregarGasto");
let gastos = [];
let totalGastos = 0;
let lblGastos = document.getElementById("lblGastos");

/* SALUDO INICIAL */

/* Función para saludar de acuerdo a la hora del día */
const saludar = document.getElementById("saludo");
const hora = new Date().getHours();
const saludos = ["¡Buen día", "¡Buenas tardes", "¡Buenas noches"];
let saludoInicial = "";

if (hora < 12) saludoInicial = saludos[0];
else if (hora < 18) saludoInicial = saludos[1];
else saludoInicial = saludos[2];

usernameRemote = sessionStorage.getItem("user");
    
// Acá cambio el label para el saludo al usuario
if (usernameRemote!="") {

    saludar.innerHTML = `${saludoInicial} ${usernameRemote}!`;
} else {

}

/* Me traigo las transacciones guardadas en el localStorage */
if (localStorage.getItem("transacciones") != null) {

    transacciones = JSON.parse(localStorage.getItem("transacciones"));
    //console.log(transacciones);

}


// Recorro las transacciones y sumo el total por tipo

const mostrarSumaTransaccion = (array, tipo, agrupador, label) => {

    /* ME TRAIGO SOLO LAS TRANSACCIONES DEL "TIPO" QUE VIENE POR PARÁMETRO <por ahora son solo "gastos"> */

    array = transacciones.filter((e) => e.tipo.includes(tipo));
    console.log(array);
    for (const t of array) {
        agrupador += parseFloat(t.monto);
    }

    label.innerText = agrupador;
}



if (localStorage.getItem("transacciones") != null) {
    mostrarSumaTransaccion(gastos,"gasto", totalGastos, lblGastos);
}

// Usuario toca el boton "+" de agregar gasto
agregarGasto.onclick = () => { window.location.href = "ingresarGasto.html"; } 