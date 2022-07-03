/* Función para rellenar los select */
const populateSelect = async (arreglo, select) => {
    const json = await getData(arreglo);
    for (const c of json) {
        let option = document.createElement("option");
        option.value = c.value;
        option.textContent = c.text;
        select.appendChild(option);
    }

    if (arreglo == "meses") {
        select.value = mesActual();
    } 
}

/* Traigo json Local y lo parseo */
const getData = async (jsonFile) => {
    const resp = await fetch(`/json/${jsonFile}.json`);
    const data = await resp.json();
    return data;
}

/* Obtengo la fecha de hoy y autocompleto el input fecha */
const fechaHoy = (input) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    input.defaultValue = today;
}

 /* Mes actual */
 const mesActual = () => {
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    return mm;
 }


// Recorro las transacciones y sumo el total por tipo

const mostrarSumaTransaccion = (arrayPrincipal, array, tipo, agrupador, label, mes) => {

    /* ME TRAIGO SOLO LAS TRANSACCIONES DEL "TIPO" QUE VIENE POR PARÁMETRO */
    const fechaBusqueda = ("2022-"+mes.toString()).toString();
    
    array = arrayPrincipal.filter((e) => e.tipo.includes(tipo) && e.fecha.includes(fechaBusqueda));
    
    for (const t of array) {
        agrupador += parseFloat(t.monto);
    }

    label.innerText = "$ " + agrupador;
    return agrupador;
}

// Usuario toca el boton "+".
const link = (boton, destino) => {
    boton.onclick = () => {
        window.location.href = destino;
    }
}

/* Función para calcular cuotas */
const calculadoraDeCuotas = (monto, cuotas) => parseFloat((monto / cuotas).toFixed(2));


/* Me traigo el valor actual del dolar blue */

const dolarBlue = async (label) => { //hago que la función sea asincrónica
    const resp = await fetch('https://api.bluelytics.com.ar/v2/latest') // hago el fetch con el await, y guardo la respuesta en resp
    const data = await resp.json(); //parseo resp, y lo guardo en data
    label.innerText = `Dólar blue promedio $: ${data.blue.value_avg.toString()}`;
}



/* SALUDO INICIAL */

// /* Función para saludar de acuerdo a la hora del día */
// const saludar = document.getElementById("saludo");
// const hora = new Date().getHours();
// const saludos = ["¡Buen día", "¡Buenas tardes", "¡Buenas noches"];
// let saludoInicial = "";

// if (hora < 12) saludoInicial = saludos[0];
// else if (hora < 18) saludoInicial = saludos[1];
// else saludoInicial = saludos[2];

// usernameRemote = sessionStorage.getItem("user");

// // Acá cambio el label para el saludo al usuario
// if (usernameRemote != "") {

//     // saludar.innerHTML = `${saludoInicial} ${usernameRemote}!`;
// } else {

// }

export {
    populateSelect,
    fechaHoy,
    mostrarSumaTransaccion,
    link,
    calculadoraDeCuotas,
    mesActual,
    dolarBlue,
    getData
};