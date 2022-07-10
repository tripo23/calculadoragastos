import {
    mostrarSumaTransaccion,
    populateSelect,
    link,
    dolarBlue,
    getData
} from "./functions.js";
import { usrApiID } from "./users.js";


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


/* Me traigo las transacciones guardadas en el JSON */
//transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
transacciones = await getData(usrApiID());


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

//Muestro la cotización del blue
dolarBlue(lblDolar);

// Invierto el orden así la más nueva, se muestra primero.
Array.prototype.reverse.call(transacciones);

// Si hay transacciones populo la tabla con las últimas 10.
if (transacciones.length > 0) {
    transacciones.slice(0,10).forEach(transaccion => {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        
        tr.innerHTML= `<td>${transaccion.fecha}</td>`;
        
        // según el tipo de transacción, le asigno una clase distinta.
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
    });

    // Si no hay transacciones, muestro un empty state.
} else { 
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.innerHTML= `<td colspan="4" style="color:grey">No hay movimientos por ahora. Añadí gastos, ingresos o ahorros desde el botón "+".</td>`;
}