const NotificationService = require('../services/notificationService');

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

    async notify() {
      await NotificationService.sendCompanyRegistrationEmail(this.correo, this.nombre);
    }
  }
  
  module.exports = Empresa;