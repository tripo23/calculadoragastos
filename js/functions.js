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

 const populateMonth = async (arreglo, select) => {
    const json = await getDataLocal(arreglo);
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
const getDataLocal = async (jsonFile) => {
    const resp = await fetch(`./json/${jsonFile}.json`);
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

/* Autocompleto la fecha de cierre estimada de la TC */
const fechaCierreTC = (input, cierre = new Date ()) => {

    let dd = String(28); // harcodeo que cierra el 28.
    let mm = String(cierre.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = cierre.getFullYear();
    
    cierre = yyyy + '-' + mm + '-' + dd;
    input.defaultValue = cierre;
}

 /* Mes actual */
 const mesActual = () => {
    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    return mm;
 }


// Recorro las transacciones y sumo el total por tipo
let fechaMesBalance = new Date ();
let fbeom = new Date ();

const mostrarSumaTransaccion = (arrayPrincipal, array, tipo, agrupador, mes) => {
    
    mes = parseInt(mes-1);
    
    fechaMesBalance.setMonth(mes);
    fechaMesBalance.setDate(1);
    fechaMesBalance.setHours(0,0,0,0);
    
    fbeom.setMonth(mes+1);
    fbeom.setDate(0);
    fbeom.setHours(0,0,0,0);
    

    array = arrayPrincipal.filter(e => {
        
        // para cash
        if (e.metodoDePago === "ft" || e.metodoDePago == "") {
            //1. Que matchee el tipo
            //2. Que la fecha de transacción sea posterior o igual al primer día del mes del balance.
            //3. Que la fecha de transacción sea anterior o igual al último día del mes del balance.
            //4. Que la fecha del balance (1er día del mes) sea menor o igual que la fecha de la última cuota (en caso de diferido, o en caso de pago recurrente <tbd>)
            return (e.tipo.toLowerCase().includes(tipo)) && (new Date(e.fecha).getTime() >= fechaMesBalance.getTime()) && (new Date(e.fecha).getTime() <= fbeom.getTime() && (fechaMesBalance.getTime() <= new Date (e.fechaFin).getTime() || e.fechaFin == ""));
        } else {
            // para tc
            //1. Que matchee el tipo
            //2. Que la fecha de última cuota sea posterior o igual al primer día del mes del balance. 
            //3. Que la fecha de primera cuota sea anterior o igual al último día del mes del balance. 
            
            
            return (e.tipo.toLowerCase().includes(tipo)) &&
             (new Date(e.fechaFin).getTime() >= fechaMesBalance.getTime()) &&
             (new Date(e.fechaInicio).getTime() <= fechaMesBalance.getTime());
        }
    });
    
    for (const t of array) {
        if (t.metodoDePago === "ft" || t.metodoDePago == "" ) {
            agrupador += parseFloat(t.monto);
        } else {
            agrupador += parseFloat(t.montoCuota);
        }
    }
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

const arsToUsd = async (ars) => {
    const resp = await fetch('https://api.bluelytics.com.ar/v2/latest') 
    const data = await resp.json();
    const usd = parseFloat((parseInt(ars) / parseInt(data.blue.value_buy)).toFixed(2));
    return usd;
} 


/* Con esto veo qué radio button está seleccionado */
const validarRadioButton = (radio) => {
    let monedaElegida = "";
    for (const rb of radio) {
        if (rb.checked) {
            monedaElegida = rb.value;
        }  
    }
    return monedaElegida;
}

const primeraCuota = (fechaMovimiento, fechaCierre) => {
    let primera = new Date ()
    if (fechaMovimiento.getTime() <= fechaCierre.getTime()) {
        primera.setMonth(fechaMovimiento.getMonth() + 1);
        
    } else {
        console.log("no entra en el próximo resumen");
        primera.setMonth(fechaMovimiento.getMonth() + 2);
    }
    primera.setDate(1);
    primera.setHours(0,0,0,0);
    console.log("primera");
    return primera;
}

const ultimaCuota = (fechaMovimiento, fechaCierre, qCuotas) => {
    let ultima = new Date ()

    if (fechaMovimiento.getTime() <= fechaCierre.getTime()) {
        ultima.setMonth(fechaMovimiento.getMonth() + parseInt(qCuotas) + 1);

    } else {
        ultima.setMonth(fechaMovimiento.getMonth() + parseInt(qCuotas) + 2);
    }
    ultima.setDate(0);
    ultima.setHours(0,0,0,0);

    return ultima;
}

const checkSession = () => {
    if (localStorage.getItem("userCDG")) {
        
    } else {
        window.location.href = "index.html";
    }
}

const signOut = () => {
    localStorage.removeItem("userCDG");
    window.location.href = "index.html";
}

export {
    populateSelect,
    populateMonth,
    fechaHoy,
    fechaCierreTC,
    mostrarSumaTransaccion,
    link,
    calculadoraDeCuotas,
    mesActual,
    dolarBlue,
    getData,
    postData,
    putData,
    arsToUsd,
    validarRadioButton,
    primeraCuota,
    ultimaCuota,
    checkSession,
    signOut
};