import {
    mediosDePago
} from "./mediosDePago.js";
import {
    categoriasGastos
} from './categorias.js';
import {
    modal,
    modalContent
} from './modal.js';
import {
    fechaHoy,
    populateSelect
} from './functions.js';
import {
    Transaccion
} from './constTransaccion.js';


const transacciones = [];
let tipo = "gasto";
let descripcion;
let categoria;
let metodoDePago;
let monto;
let montoCuota;
let timestamp;
let cuotas = 0;
let fecha = Date();
let transaccionesAnteriores;
let inputFecha = document.getElementById("fechaGasto");
let mensajeModal = document.getElementById("mensajeModal");
let formularioTransaccion = document.getElementById("ingresarContainer");
let listCategoria = document.getElementById("categoria");
let listMpago = document.getElementById("mPago");
let inputDescripcion = document.getElementById("descripcion");
let inputMonto = document.getElementById("monto");
let lblCuotas = document.getElementById("lblCuotas");
let inputCuotas = document.getElementById("cuotas");
let lblMonto = document.getElementById("lblMonto");
let lblMontoCuota = document.getElementById("lblMontoCuota");
let inputMontoCuota = document.getElementById("valCuota");


inputMonto.focus();

/* FUNCIONES */


/* Función para calcular cuotas */
const calculadoraDeCuotas = (monto, cuotas) => parseFloat((monto / cuotas).toFixed(2));



/* ACCIONES EN FUNCIÓN DE EVENTOS */

/* Capturar la tecla ENTER y no hacer nada, para evitar errores en el formulario */

document.onkeyup = function (e) {
    if (e.key === 'Enter') {
        // no hago nada
        console.log("presionó enter, me hago el gil");
    }

}

/* Si cambio el medio de pago a TC se habilitan las opciones de cuotas */
listMpago.onchange = () => {
    if (listMpago.value == "tc") {
        lblMonto.innerHTML = "Monto total";
        lblCuotas.style.display = "block";
        inputCuotas.style.display = "block";
        lblMontoCuota.style.display = "block";
        inputMontoCuota.style.display = "block";

    } else if (listMpago.value == "ft") {
        inputCuotas.value = 0;
        inputMontoCuota.value = "";
        lblMonto.innerHTML = "Monto";
        lblCuotas.style.display = "none";
        inputCuotas.style.display = "none";
        lblMontoCuota.style.display = "none";
        inputMontoCuota.style.display = "none";
    }
}

/* Calculo el valor de la cuota, cuando el usuario interactua con el monto o la cantidad de cuotas */
inputCuotas.onchange = () => {
    if (!inputCuotas.value < 1) {
        inputMontoCuota.value = calculadoraDeCuotas(parseInt(inputMonto.value), parseInt(inputCuotas.value));
    }
}

/* Valido que el contenido de MONTO sea número */

inputMonto.onchange = () => {

    if (isNaN(inputMonto.value)) {
        /* Por lo que estuve leyendo, el evento onChange no funciona cuando tipeas caracteres de tipo texto en un textbox de tipo número */
        alert("Por favor ingresá solo números");
        inputMonto.value="";
        inputMonto.focus();
    }

    if (!inputCuotas.value < 1) {
        inputMontoCuota.value = calculadoraDeCuotas(parseInt(inputMonto.value), parseInt(inputCuotas.value));
    }
}



/* COMPLETO EL FORM EN VALORES DEFAULT */

/* Populo los select con los array */
populateSelect(categoriasGastos, listCategoria);
populateSelect(mediosDePago, listMpago);

fechaHoy(inputFecha);

/* REVISO SI HAY TRANSACCIONES ANTERIORES EN EL LOCALSTORAGE */

transaccionesAnteriores = JSON.parse(localStorage.getItem("transacciones"));
console.log("las transacciones del localStorage");
console.log(transaccionesAnteriores);

/* CHECKOUT */

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones y en el localStorage */

formularioTransaccion.addEventListener("submit", validarFormulario);

function validarFormulario(e) {

    e.preventDefault();
    tipo;
    fecha = inputFecha.value;
    descripcion = inputDescripcion.value;
    categoria = listCategoria.value;
    metodoDePago = listMpago.value;
    monto = inputMonto.value;
    cuotas = inputCuotas.value;
    montoCuota = inputMontoCuota.value;
    timestamp = new Date();



    // Acá guardo todo en el array
    transacciones.push(new Transaccion(tipo, fecha, descripcion, categoria, metodoDePago, monto, cuotas, montoCuota, timestamp));

    // Llevo lo del localStorage viejo a las transacciones nuevas
    if (transaccionesAnteriores != null) {

        for (const t of transaccionesAnteriores) {
            console.log("cada t");
            console.log(t);
            console.log(t.mPago);
            transacciones.unshift(new Transaccion(t.tipo, t.fecha, t.descripcion, t.categoria, t.metodoDePago, t.monto, t.cuotas, t.montoCuota, t.timestamp));
        }
    }

    localStorage.setItem("transacciones", JSON.stringify(transacciones));
    console.log("el pusheado");
    console.log(transacciones);


    // Limpio el form
    formularioTransaccion.reset();

    // // Confirmo transacción
    // Levanto el modal y lo completo

    mensajeModal.innerHTML = `¡${descripcion} se guardó correctamente! ¿Querés agregar otro gasto?`;
    //modal.style.display = "block";

        /* Muestro el Sweet Alert */

    
   
        Swal.fire({
            title: 'Gasto agregado!',
            text: "¿Querés agregar otro?",
            icon: 'success',
            showCancelButton: true,
            cancelButtonText: 'Agregar otro!',
            confirmButtonText: 'No, ver balance'
            
        }).then((result) => {
    
            if (result.isConfirmed) {
                window.location.href = "balance.html";
            }
        })
}
