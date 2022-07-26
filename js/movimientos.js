import { getData } from "./functions.js";
import { usrApiID } from "./users.js";


let tbody = document.getElementById("tbody");

/* Me traigo las transacciones guardadas */
//transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
let transacciones = await getData(usrApiID());

// Invierto el orden así la más nueva, se muestra primero.
Array.prototype.reverse.call(transacciones);

// Populo la tabla.
transacciones.forEach(transaccion => {

    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.innerHTML= `
                    <td>${transaccion.fecha.slice(0,10)}</td>
                    <td>${transaccion.tipo}</td>
                    <td>${transaccion.categoria}</td>
                    <td>${transaccion.descripcion}</td>
                    <td>$${transaccion.monto}</td>
                  `
});