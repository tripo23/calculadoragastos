/* Función para rellenar los select */
const populateSelect = (arreglo, select) => {
    for (const c of arreglo) {
        let option = document.createElement("option");
        option.value = c.value;
        option.textContent = c.text;
        select.appendChild(option);
    }
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

// Recorro las transacciones y sumo el total por tipo

const mostrarSumaTransaccion = (arrayPrincipal, array, tipo, agrupador, label) => {

    /* ME TRAIGO SOLO LAS TRANSACCIONES DEL "TIPO" QUE VIENE POR PARÁMETRO */

    array = arrayPrincipal.filter((e) => e.tipo.includes(tipo));
    console.log(e);
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
    calculadoraDeCuotas
};