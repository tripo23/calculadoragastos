import {
    mostrarSumaTransaccion,
    populateMonth,
    link,
    dolarBlue,
    getData,
    checkSession
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

/* Chequeo si está logueado */
checkSession();

/* Completo los meses en el select, y asigno el mes actual como valor por default */
populateMonth("meses", selectMeses);


/* Me traigo las transacciones guardadas en el JSON */
//transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
transacciones = await getData(usrApiID());


/* Calculo los totales, según el tipo de transacción */
const calcularTotales = () => {
    console.log(String(parseInt(selectMeses.value)-1)); 

    let mesAnterior = String(parseInt(selectMeses.value)-1);
 
    //Calculo el balance del mes anterior
    totalGastos = mostrarSumaTransaccion(transacciones, gastos, "gasto", agrupadorGastos, mesAnterior);
    totalIngresos = mostrarSumaTransaccion(transacciones, ingresos, "ingreso", agrupadorIngresos, mesAnterior);
    totalAhorros = mostrarSumaTransaccion(transacciones, ahorros, "ahorro", agrupadorAhorros, mesAnterior);

    let totalBalanceAnterior = totalIngresos - totalAhorros - totalGastos

    //Calculo y muestro la sumatoria de ingresos, gastos y ahorros
    totalGastos = mostrarSumaTransaccion(transacciones, gastos, "gasto", agrupadorGastos, selectMeses.value);
    lblGastos.innerText = "$ " + totalGastos;

    totalIngresos = mostrarSumaTransaccion(transacciones, ingresos, "ingreso", agrupadorIngresos, selectMeses.value);
    lblIngresos.innerText = "$ " + totalIngresos;

    totalAhorros = mostrarSumaTransaccion(transacciones, ahorros, "ahorro", agrupadorAhorros, selectMeses.value);
    lblAhorros.innerText = "$ " + totalAhorros;
    
    /* Calculo el balance */
    totalBalance = totalIngresos - totalAhorros - totalGastos + totalBalanceAnterior;
    lblBalance.innerText = "$ " + totalBalance;
}

calcularTotales();

/* recalculo cuando selecciono un mes distinto */
selectMeses.onchange = () => {
    calcularTotales();
}

// Links para los botones "+"
link(agregarGasto, "gastos.html");
link(agregarIngreso, "ingresos.html");
link(agregarAhorro, "ahorros.html");

//Muestro la cotización del blue
dolarBlue(lblDolar);

// Invierto el orden así la más nueva, se muestra primero.
Array.prototype.reverse.call(transacciones);




// Si hay transacciones populo la tabla con las últimas 10.
if (transacciones.length > 0) {

    //Agrego elemento "orden" basado en la fecha de la transacción
    transacciones.forEach(element => {
        let orden = (new Date (element.fecha)).getTime();
        element.orden = orden;
    });

    transacciones = transacciones.sort((a,b) => b.orden - a.orden);

    transacciones.slice(0,10).forEach(transaccion => {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        tr.innerHTML= `<td>${transaccion.fecha.slice(0,10)}</td>`;
        
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
                        <td>$${transaccion.monto}</td>
                      `;
    });

    // Si no hay transacciones, muestro un empty state.
} else { 
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.innerHTML= `<td colspan="4" style="color:grey">No hay movimientos por ahora. Añadí gastos, ingresos o ahorros desde el botón "+".</td>`;
}