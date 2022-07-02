import {
    Transaccion
} from './constTransaccion.js';

const transacciones = [];
let transaccionesAnteriores;
transaccionesAnteriores = JSON.parse(localStorage.getItem("transacciones"));
// console.log("las transacciones del localStorage");
// console.log(transaccionesAnteriores);

function validarFormulario(event, formulario, tipo, fecha, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp) {

    event.preventDefault();

    // Acá guardo todo en el array
    transacciones.push(new Transaccion(tipo, fecha, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp));

    // Llevo lo del localStorage viejo a las transacciones nuevas
    if (transaccionesAnteriores != null) {

        for (const t of transaccionesAnteriores) {
            // console.log("cada t");
            // console.log(t);
            // console.log(t.mPago);
            transacciones.unshift(new Transaccion(t.tipo, t.fecha, t.descripcion, t.categoria, t.metodoDePago, t.monto, t.cuotas, t.montoCuota, t.timestamp));
        }
    }

    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    // Limpio el form
    formulario.reset();

    /* Mensaje de confirmación */
    Toastify({
        text: "Transacción agregada ✅",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "#05668D",
            color: "white",
        },
    }).showToast();

}

export {
    validarFormulario
};