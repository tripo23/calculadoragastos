import {
    mostrarSumaTransaccion,
    populateSelect,
    link,
    dolarBlue,
} from "./functions.js";


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
let lblDolar = document.getElementById("lblDolar");
let apiMeses = "62c4c5904bccf21c2ecf536c";

/* Completo los meses en el select, y asigno el mes actual como valor por default */
populateSelect(apiMeses, selectMeses);


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

// Links para los botones "+"
link(agregarGasto, "ingresarGasto.html");
link(agregarIngreso, "ingresos.html");

dolarBlue(lblDolar);

// Traigo y armo la tabla de los últimos 10 movimientos
Array.prototype.reverse.call(transacciones);

if (transacciones.lenght > 0) {
    console.log("hay data");
} else {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.innerHTML= `<td colspan="4" style="color:grey">No hay movimientos por ahora. Añadí gastos, ingresos o ahorros desde el botón "+".</td>`;
}

transacciones.slice(0,10).forEach(transaccion => {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    tr.innerHTML= `<td>${transaccion.fecha}</td>`;
    
    switch (transaccion.tipo.toLowerCase()) {
        case "gasto":
            tr.innerHTML+= `<td class="tipoGasto">${transaccion.categoria}</td>`    
            break;
        case "ingreso":
            tr.innerHTML+= `<td class="tipoIngreso">${transaccion.categoria}</td>`
            break;
        case "ahorro":
            tr.innerHTML+= `<td class="tipoAhorro">${transaccion.categoria}</td>`
            break;
        default:
            break;
    }

    tr.innerHTML+= `                   
                    
                    <td>${transaccion.descripcion}</td>
                    <td>${transaccion.monto}</td>
                  `;
       
    
    //document.getElementsByClassName("tipo")
});