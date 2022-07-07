let transacciones;
let tbody = document.getElementById("tbody");

/* Me traigo las transacciones guardadas en el localStorage */
transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

Array.prototype.reverse.call(transacciones);

console.log(transacciones[0].tipo);

transacciones.forEach(transaccion => {
    console.log(transaccion);

    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.innerHTML= `
                    <td>${transaccion.fecha}</td>
                    <td>${transaccion.tipo}</td>
                    <td>${transaccion.categoria}</td>
                    <td>${transaccion.descripcion}</td>
                    <td>${transaccion.monto}</td>
                  `
});