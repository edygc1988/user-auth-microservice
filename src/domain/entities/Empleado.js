class Empleado {
    constructor({ id, tipoIdentificacion, identificacion, nombre, direccion, telefono, tipoContrato, fechaIngreso, usuarioId, correo, createdBy }) {
      this.id = id;
      this.tipoIdentificacion = tipoIdentificacion;
      this.identificacion = identificacion;
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.correo = correo;
      this.tipoContrato = tipoContrato;
      this.fechaIngreso = fechaIngreso;
      this.usuarioId = usuarioId;
      this.createdBy = createdBy;
    }
  }
  
  module.exports = Empleado;
  