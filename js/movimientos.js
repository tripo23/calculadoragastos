import {
  getData,
  populateSelect,
  checkSession
} from "./functions.js";
import {
  usrApiID
} from "./users.js";

let apiGastos = "62c4c0c64bccf21c2ecf4b68";
let tbody = document.getElementById("tbody");
let inputSearch = document.getElementById("searchDescripcion");
let listCategorias = document.getElementById("selectCategorias");

/* Chequeo si está logueado */
checkSession();

populateSelect(apiGastos, listCategorias);

/* Me traigo las transacciones guardadas */
let transacciones = await getData(usrApiID());

// Invierto el orden así la más nueva, se muestra primero.
//Array.prototype.reverse.call(transacciones);

//Agrego elemento "orden" basado en la fecha de la transacción
transacciones.forEach(element => {
    let orden = (new Date (element.fecha)).getTime();
    element.orden = orden;
});

transacciones = transacciones.sort((a,b) => b.orden - a.orden);

// Populo la tabla.
transacciones.forEach(transaccion => {

  let tr = document.createElement('tr');
  let ultCuota;
  console.log(transaccion.fechaFin);
  if (transaccion.fechaFin == "") {
    ultCuota="";
  } else {
    ultCuota = new Date (transaccion.fechaFin);  
    ultCuota = ultCuota.toLocaleString('es-AR', { month: 'short', year: '2-digit' })
  }
  
  tbody.appendChild(tr);
  tr.innerHTML = `
                    <td>${transaccion.fecha.slice(0,10)}</td>
                    <td>${transaccion.tipo}</td>
                    <td>${transaccion.categoria}</td>
                    <td>${transaccion.descripcion}</td>
                    <td>$${transaccion.monto}</td>
                    <td>$${transaccion.montoCuota}</td>
                    <td>${ultCuota}</td>
                  `
});

listCategorias.onchange = () => {
  filtroMovimientos(listCategorias, 2);
}

inputSearch.onkeyup = () => {
  filtroMovimientos(inputSearch, 3);
}


const filtroMovimientos = (input, indexCol) => {
  let filter, table, tr, td, i, txtValue;
  filter = input.value.toUpperCase();
  table = document.getElementById("tablaMovimientos");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[indexCol];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
