import {
    mostrarSumaTransaccion,
    link
} from "./functions.js";

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


/* Me traigo las transacciones guardadas en el localStorage */
transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

/* Calculo los totales, según el tipo de transacción */
totalGastos = mostrarSumaTransaccion(transacciones, gastos, "gasto", agrupadorGastos, lblGastos);
totalIngresos = mostrarSumaTransaccion(transacciones, ingresos, "ingreso", agrupadorIngresos, lblIngresos);
totalAhorros = mostrarSumaTransaccion(transacciones, ahorros, "ahorro", agrupadorAhorros, lblAhorros);

/* Calculo el balance */
totalBalance = totalIngresos - totalAhorros - totalGastos;
lblBalance.innerText = "$ " + totalBalance;


link(agregarGasto, "ingresarGasto.html");
link(agregarIngreso, "ingresos.html");