let transacciones;
let agregarGasto = document.getElementById("btnAgregarGasto");
let agregarIngreso = document.getElementById("btnAgregarIngreso");
let agregarAhorro = document.getElementById("btnAgregarAhorro");
let gastos = [];
let ahorros = [];
let ingresos = []
let totalGastos = 0;
let agrupadorGastos = 0;
let totalAhorros = 0;
let totalBalance = 0;
let agrupadorAhorros = 0;
let totalIngresos = 0;
let agrupadorIngresos = 0;
let lblGastos = document.getElementById("lblMontoGastos");
let lblAhorros = document.getElementById("lblMontoAhorro");
let lblIngresos = document.getElementById("lblMontoIngresos");
let lblBalance = document.getElementById("lblMontoBalance");

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

    // saludar.innerHTML = `${saludoInicial} ${usernameRemote}!`;
} else {

}

/* Me traigo las transacciones guardadas en el localStorage */


if (localStorage.getItem("transacciones") != null) {

    transacciones = JSON.parse(localStorage.getItem("transacciones"));
    //console.log(transacciones);

}


// Recorro las transacciones y sumo el total por tipo

const mostrarSumaTransaccion = (array, tipo, agrupador, label) => {

    /* ME TRAIGO SOLO LAS TRANSACCIONES DEL "TIPO" QUE VIENE POR PARÁMETRO */

    array = transacciones.filter((e) => e.tipo.includes(tipo));
    console.log(array);
    for (const t of array) {
        agrupador += parseFloat(t.monto);
    }

    label.innerText = "$ " + agrupador;
    return agrupador;
}



if (localStorage.getItem("transacciones") != null) {
    totalGastos = mostrarSumaTransaccion(gastos,"gasto", agrupadorGastos, lblGastos);
    totalIngresos = mostrarSumaTransaccion(ingresos,"ingreso", agrupadorIngresos, lblIngresos);
    totalAhorros = mostrarSumaTransaccion(ahorros,"ahorro", agrupadorAhorros, lblAhorros);
    
    /* Calculo el balance */
    totalBalance = totalIngresos - totalAhorros - totalGastos;
    lblBalance.innerText = "$ " + totalBalance;
}

// Usuario toca el boton "+".
const link = (boton, destino) => {
    boton.onclick = () => { window.location.href = destino; } 
}

link(agregarGasto,"ingresarGasto.html");
link(agregarIngreso,"ingresos.html");