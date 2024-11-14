class Empresa {
    constructor({ id, identificacion, tipoIdentificacion, nombre, direccion, telefono, correo, usuarioId, createdBy }) {
      this.id = id;
      this.identificacion = identificacion;
      this.tipoIdentificacion = tipoIdentificacion;
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.correo = correo;
      this.usuarioId = usuarioId;
      this.createdBy = createdBy;
    }
  }
  
  module.exports = Empresa;