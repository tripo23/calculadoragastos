import {
    Transaccion
} from './constTransaccion.js';


//let transaccionesAnteriores;
//transaccionesAnteriores = JSON.parse(localStorage.getItem("transacciones"));


function validarFormulario(event, formulario, tipo, fecha, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp) {

    event.preventDefault();

    /* guardo en transacciones lo que haya en el local storage, si no hay nada, transacciones queda vacío. */
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

    // Acá guardo todo en el array
    transacciones.push(new Transaccion(tipo, fecha, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp));

    /* subo todo al local storage */
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    // Limpio el form
    formulario.reset();

    /* Mensaje de confirmación */

    // Toastify({
    //     text: "Transacción agregada ✅",
    //     duration: 3000,
    //     gravity: "bottom",
    //     position: "center",
    //     style: {
    //         background: "#05668D",
    //         color: "white",
    //     },
    // }).showToast();

    Swal.fire({
        title: `Transacción agregada!`,
        text:`¿Querés agregar otro ${tipo}?`,
        icon:'success',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '👍 Sip!',
        cancelButtonText: '🙅‍♂️ Nop',
    }).then((result) => {
        if (!result.isConfirmed) {
            window.location.href='balance.html'
        }
    })


}

export {
    validarFormulario
};  