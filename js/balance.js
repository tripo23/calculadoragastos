import {
    mostrarSumaTransaccion,
    populateSelect,
    link,
    mesActual
} from "./functions.js";

import {
    meses
} from './categorias.js';

let transacciones;
let selectMeses = document.getElementById("selectorMes");
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

/* Completo los meses en el select, y asigno el mes actual como valor por default */
populateSelect(meses, selectMeses)
selectMeses.value = mesActual();

/* Me traigo las transacciones guardadas en el localStorage */
transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

/* Calculo los totales, según el tipo de transacción */
const calcularTotales = () => {
    totalGastos = mostrarSumaTransaccion(transacciones, gastos, "gasto", agrupadorGastos, lblGastos, selectMeses.value);
    totalIngresos = mostrarSumaTransaccion(transacciones, ingresos, "ingreso", agrupadorIngresos, lblIngresos, selectMeses.value);
    totalAhorros = mostrarSumaTransaccion(transacciones, ahorros, "ahorro", agrupadorAhorros, lblAhorros, selectMeses.value);
    
    /* Calculo el balance */
    totalBalance = totalIngresos - totalAhorros - totalGastos;
    lblBalance.innerText = "$ " + totalBalance;
}

calcularTotales();

/* recalculo cuando selecciono un mes distinto */
selectMeses.onchange = () => {
    calcularTotales();
}

link(agregarGasto, "ingresarGasto.html");
link(agregarIngreso, "ingresos.html");