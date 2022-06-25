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

export {populateSelect, fechaHoy};