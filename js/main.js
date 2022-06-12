
/* Constructor del array principal */
class Transaccion {
    constructor(descripcion, categoria, metodoDePago, monto, qCuotas, montoCuota, timestamp) {
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.metodoDePago = metodoDePago;
        this.monto = parseFloat(monto);
        this.qCuotas = parseInt(qCuotas);
        this.montoCuota = montoCuota;
        this.timestamp = timestamp;
    }
}
const transacciones = [];

/* Arrays y variables */
const categorias = ["Supermercado", "Inversiones", "Gastos sin culpa", "Servicios", "Vivienda", "Vehículo", "Salud", "Salidas & Delivery", "Vacaciones"];

const mediosDePago = ["Cash / Débito / Transferencia", "Tarjeta de crédito"];

let descripcion;
let categoria;
let mpago;
let monto;
let timestamp;
let username;
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


/* SALUDO INICIAL */

username = prompt ("¡Hola! Por favor ingresá tu nombre");

/* FUNCIONES */

/* Función para saludar de acuerdo a la hora del día */
const saludar = document.getElementById("saludo");
const hora = new Date().getHours();
const saludos = ["¡Buen día", "¡Buenas tardes", "¡Buenas noches"];
let saludoInicial = "";

if (hora < 12) saludoInicial = saludos[0];
else if (hora < 18) saludoInicial = saludos[1];
else saludoInicial = saludos[2];

saludar.innerHTML = `${saludoInicial} ${username}!`;

/* Función para rellenar los select */
const populateSelect = (arreglo, select) => {
    for (const c of arreglo) {
        let option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        select.appendChild(option);
    }
}

/* Función para calcular cuotas */
const calculadoraDeCuotas = (monto, cuotas) => monto/cuotas;



/* ACCIONES EN FUNCIÓN DE EVENTOS */

/* Si cambio el medio de pago a TC se habilitan las opciones de cuotas */
listMpago.onchange = () => {
    if (listMpago.value=="Tarjeta de crédito") {
        lblMonto.innerHTML="Monto total";
        lblCuotas.style.display="block";
        inputCuotas.style.display="block";
        lblMontoCuota.style.display="block";
        inputMontoCuota.style.display="block";

    } else if (listMpago.value=="Cash / Débito / Transferencia") {
        inputCuotas.value=0;
        inputMontoCuota.value="";
        lblMonto.innerHTML="Monto";
        lblCuotas.style.display="none";
        inputCuotas.style.display="none";
        lblMontoCuota.style.display="none";
        inputMontoCuota.style.display="none";
    }
}

/* Calculo el valor de la cuota, cuando el usuario interactua con el monto o la cantidad de cuotas */
inputCuotas.onchange = () => {
    if (!inputCuotas.value<1) {
        inputMontoCuota.value = calculadoraDeCuotas(parseInt(inputMonto.value), parseInt(inputCuotas.value));
    }
}

inputMonto.onchange = () => {
    if (!inputCuotas.value<1) {
        inputMontoCuota.value = calculadoraDeCuotas(parseInt(inputMonto.value), parseInt(inputCuotas.value));
    }
}


/* Populo los select con los array */
populateSelect(categorias, listCategoria);
populateSelect(mediosDePago, listMpago);

/* CHECKOUT */

/* Cuando el usuario le da "CONFIRMAR", guardo toda la info en mi array principal de transacciones */

formularioTransaccion.addEventListener("submit", validarFormulario);

function validarFormulario(e) {

    e.preventDefault();

    descripcion = inputDescripcion.value;
    categoria = listCategoria.value;
    mpago = listMpago.value;
    monto = inputMonto.value;
    cuotas = inputCuotas.value;
    montoCuota = inputMontoCuota.value;
    timestamp = new Date();

    // Acá guardo todo en el array
    transacciones.push(new Transaccion(descripcion, categoria, mpago, monto, cuotas, montoCuota, timestamp));
    console.log(transacciones);

    // Confirmo transacción
    alert(`¡${descripcion} se guardó correctamente!`)
    // Limpio el form
    formularioTransaccion.reset();    
}