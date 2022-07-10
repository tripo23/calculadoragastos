import {
    Transaccion
} from './constTransaccion.js';
import { getData, putData } from './functions.js';
import { usrApiID } from './users.js';

async function validarFormulario(event, formulario, tipo, fecha, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp) {

    event.preventDefault();

    /* guardo en transacciones lo que haya en el JSON, si no hay nada, transacciones queda vacío. */
    //const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    const transacciones = await getData(usrApiID());
    

    // Acá guardo todo en el array
    transacciones.push(new Transaccion(tipo, fecha, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp));

    /* subo todo al local storage */
    //localStorage.setItem("transacciones", JSON.stringify(transacciones));
    
    //convierto array en json
    const transaccionesJson = JSON.stringify(transacciones); 

    /* Actualizo el json con la nueva data */
    putData(transaccionesJson, usrApiID());

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
        title: `¡Listo!`,
        text:`¿Querés añadir otro ${tipo}?`,
        icon:'success',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Ir al inicio',
        confirmButtonText: 'Sí, agregar',
        reverseButtons: true
    }).then((result) => {
        if (!result.isConfirmed) {
            window.location.href='balance.html'
        }
    })


}

export {
    validarFormulario
};  