import {
    categoriasIngresos
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
let transaccionesAnteriores;
let tipo = "ingreso";
let descripcion;
let categoria;
let metodoDePago;
let monto;
let montoCuota;
let timestamp;
let cuotas = 0;
let fecha = Date();


let mensajeModal = document.getElementById("mensajeModal");



let inputDescripcion = document.getElementById("descripcionIngreso");
let inputMonto = document.getElementById("montoIngreso");


let listCategoria = document.getElementById("categoriaIngreso");
let inputFecha = document.getElementById("fechaIngreso");
let formularioTransaccion = document.getElementById("ingresarContainerIngreso");

populateSelect(categoriasIngresos, listCategoria);
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
    metodoDePago = ""
    monto = inputMonto.value;
    cuotas = ""
    montoCuota = ""
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

    mensajeModal.innerHTML = `¡${descripcion} se guardó correctamente! ¿Querés agregar otro ingreso?`;
    //modal.style.display = "block";

    /* Muestro el Sweet Alert */

 
        // Swal.fire({
        //     title: 'Ingreso agregado!',
        //     text: "¿Querés agregar otro?",
        //     icon: 'success',
        //     showCancelButton: true,
        //     cancelButtonText: 'Agregar otro!',
        //     confirmButtonText: 'No, ver balance'
            
        // }).then((result) => {
    
        //     if (result.isConfirmed) {
        //         window.location.href = "balance.html";
        //     }
        // })

        Toastify({
                    text:"Ingreso agregado ✅",
                    duration:3000,
                    gravity: "bottom",
                    position: "center",
                    style: {
                        background: "#05668D",
                        color: "white",
                    },
                }).showToast();
    }

