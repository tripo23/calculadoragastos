class Transaccion {
    constructor(descripcion, categoria, metodoDePago, monto, qCuotas) {
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.metodoDePago = metodoDePago;
        this.monto = parseFloat(monto);
        this.qCuotas = parseInt(qCuotas);
        this.montoCuota = montoCuota;
    }
}
const transacciones = [];

const categorias = ["supermercado", "inversión", "gastos sin culpa", "servicios", "vivienda", "vehiculo", "salud", "salidas & delivery", "vacaciones"];
let categoria = "";
let desc = "";
let mpago = "";
let seguirSumando;
let monto = 0;
let montoCuota = 0;
let cuotas = 1;
let totalFT = 0;
let totalTC = 0;
let proxMesTC = 0;
let campoUsername = "";
let username = "";


// Función para mostrar los gastos agregados
const mostrarTotal = (descripcion, total) => {
    alert("Sumaste $ " + total + " " + descripcion)
}

// Función para calcular las cuotas
const calcularCuotas = (monto, cuotas) => {
    if (cuotas > 0) {
        return parseFloat((monto / cuotas).toFixed(2));
    }
}

//Función para eliminar una transacción.
function eliminarTransaccion() {
    let elemento = ""
    let eliminar = confirm("¿Querés eliminar alguna transacción?");

    if (eliminar) {
        while (elemento == "") {
            elemento = prompt("Ingresá la descripción del gasto que querés eliminar")
        }

        const resultado = transacciones.findIndex((el) => el.descripcion === elemento)
        console.log(resultado);
        let confirmaEliminacion = confirm("¿Estás segurx que querés eliminar la transacción?");

        if (confirmaEliminacion) {
            transacciones.splice(resultado, 1);
        }
    }
}

// función para mostrar las transacciones de una categoría
const mostrarTransaccionesDeCategoria = () => {


    let mostrarCategorias = confirm("¿Querés ver las transacciones de una categoría específica?")
    if (mostrarCategorias) {
        do {
            categoria = prompt("Escribí el nombre de la categoría que querés consultar: (" + categorias.join(", ") + " ).");
        } while (!categorias.includes(categoria))
        const categoriaFiltrada = transacciones.filter((el) => el.categoria.includes(categoria));
        alert("las transacciones son :" + (JSON.stringify(categoriaFiltrada))); // no sabía cómo mostrar el resultado del objeto en un alert (igualmente imagino que no es algo que vayamos a hacer cuando aprendamos a integrar con HTML), así que googleé esta opción que no es estéticamente correcta, pero es funcional.
    }
}


// función principal donde solicito los inputs al usuario
function agregarGasto() {

    do {

        // Ingrese descripción de su gasto
        while (desc == "") {
            desc = prompt("Ingresá la descripción de tu gasto");
        }

        // asociar categoría
        do {
            categoria = prompt("Escribí el nombre de la categoría a la que pertenece este gasto: (" + categorias.join(", ") + " ).");
        } while (!categorias.includes(categoria))

        do {
            // Ingrese método de pago
            mpago = prompt("¿Cómo pagaste? Ingresá \"FT\" si pagaste en efectivo o débito. Ingresá \"TC\", si pagaste en cuotas.").toUpperCase();

            switch (mpago) {

                case "FT":

                    // Si es cash o débito ingrese monto gastado
                    monto = parseInt(prompt("Ingresá el total de tu gasto."));
                    totalFT += monto;
                    break;

                case "TC":

                    // Si es TC, ingrese cantidad de cuotas y monto total (el valor de cuota se calcula solo)
                    monto = parseInt(prompt("Ingresá el total de tu gasto (no ingreses el valor de la cuota)."));
                    cuotas = parseInt(prompt("¿En cuántas cuotas pagaste?"));
                    if (cuotas > 0) {
                        montoCuota = calcularCuotas(monto, cuotas);
                        totalTC += monto;
                    } else {
                        alert("El mínimo de cuotas posible, es 1.");
                        cuotas = parseInt(prompt("¿En cuántas cuotas pagaste?"));
                    }
                    break;

                default:
                    alert("Por favor ingresá una opción válida: FT o TC")
                    break;
            }

        } while ((mpago != "FT") && (mpago != "TC"))

        // guardo esta transacción en mi array de transacciones
        transacciones.push(new Transaccion(desc, categoria, mpago, monto, cuotas));
        monto = 0;
        categoria = "";
        proxMesTC += montoCuota;
        montoCuota = 0;
        desc = "";
        seguirSumando = confirm("¿Querés sumar otro gasto?");

    } while (seguirSumando)

}

// campoUsername = document.getElementById("username");

// campoUsername.onchange = () => {
//     username = campoUsername.value;
// }


// /* Lógica del botón de login */

// let botonLogin = document.getElementById("btn--login");

// botonLogin.onclick = () => {
//     //Valido que el textbot de usuario no esté vacío.
//     if (campoUsername.value == "") {
//         alert("Por favor, ingresá tu usuario");
//     } else {

//     // Si hay texto dentro del campo, llevo al usuario a la siguiente página y personalizo el label con el nombre del usuario.
//         window.location.href = "altaTransaccion.html"
//         document.getElementById("saludo").innerText = `Hola ${username}!`
//     }
// }



// agregarGasto();
// mostrarTotal("en gastos en efectivo.", totalFT);
// mostrarTotal("a tu próximo resumen de tarjeta.", proxMesTC);
// mostrarTotal("a tus consumos totales de tarjeta de crédito.", totalTC);
// eliminarTransaccion();
// mostrarTransaccionesDeCategoria();