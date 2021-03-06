/* Constructor del array principal */
class Transaccion {
    constructor(tipo, fecha, descripcion, categoria, metodoDePago, monto, qCuotas, montoCuota, timestamp, montoAhorrado, moneda, fechaFin, fechaInicio) {
        this.tipo = tipo;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.metodoDePago = metodoDePago;
        this.monto = parseFloat(monto);
        this.qCuotas = parseInt(qCuotas);
        this.montoCuota = montoCuota;
        this.timestamp = timestamp;
        this.montoAhorrado = montoAhorrado;
        this.moneda = moneda;
        this.fechaFin = fechaFin;
        this.fechaInicio = fechaInicio;
    }
}

export {Transaccion};