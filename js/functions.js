let apiMasterKey = '$2b$10$/d6FWxUERnGDLYwU150y0ekj49kjrOZbMTQ0UzH2vj7Sx2xkVoGfS';

/* Función para rellenar los select */
const populateSelect = async (apiID, select) => {
    const json = await getData(apiID);
    for (const c of json) {
        let option = document.createElement("option");
        option.value = c.value;
        option.textContent = c.text;
        select.appendChild(option);
    }

    if (apiID === "62c4c5904bccf21c2ecf536c") {
        //es el select de meses"
        select.value = mesActual();
    } 
 }

/* Traigo json Local y lo parseo */
const getDataLocal = async (jsonFile) => {
    const resp = await fetch(`/json/${jsonFile}.json`);
    const data = await resp.json();
    return data;
}

/* Traigo json externo y lo parseo */
const getData = async (apiID) => {
    const resp = await fetch(`https://api.jsonbin.io/v3/b/${apiID}`, {
        headers: {
            "X-Master-Key": apiMasterKey,
            "X-Bin-Meta": false
        }    
    });
    const data = await resp.json();
    return data;
}

/* Post Data to Json */
const postData = async (json,nombre) => {
    const resp = await fetch("https://api.jsonbin.io/v3/b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiMasterKey,
          "X-Bin-Name": nombre,
        },
        body: json,
        cache: 'default'
      });
      return resp.json();    
}

/* Put Data to Json */
const putData = async (json,apiID) => {
    const resp = await fetch(`https://api.jsonbin.io/v3/b/${apiID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiMasterKey,
          "X-Bin-Versioning": false
        },
        body: json,
        cache: 'default'
      });
      return resp.json();    
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
    
    array = arrayPrincipal.filter((e) => (e.tipo.toLowerCase().includes(tipo) && e.fecha.includes(fechaBusqueda)));
    
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
    label.innerText = `Dólar blue venta: $${data.blue.value_sell.toString()}`;
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
    getData,
    postData,
    putData
};