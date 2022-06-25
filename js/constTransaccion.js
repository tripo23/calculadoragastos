/* Constructor del array principal */
class Transaccion {
    constructor(tipo, fecha, descripcion, categoria, metodoDePago, monto, qCuotas, montoCuota, timestamp) {
        this.tipo = tipo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.metodoDePago = metodoDePago;
        this.monto = parseFloat(monto);
        this.qCuotas = parseInt(qCuotas);
        this.montoCuota = montoCuota;
        this.timestamp = timestamp;
    }
}

export {Transaccion};