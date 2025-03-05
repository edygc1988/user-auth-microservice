const NotificationService = require('../services/notificationService');

class Empleado {
    constructor({ id, tipoIdentificacion, identificacion, nombre, direccion, telefono, tipoContrato, fechaIngreso, sueldo, usuarioId, correo, createdBy }) {
      this.id = id;
      this.tipoIdentificacion = tipoIdentificacion;
      this.identificacion = identificacion;
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.correo = correo;
      this.tipoContrato = tipoContrato;
      this.fechaIngreso = fechaIngreso;
      this.sueldo = sueldo;
      this.usuarioId = usuarioId;
      this.createdBy = createdBy;
    }
    async notiy(empleador) {
      await NotificationService.sendEmployeeRegistrationEmail(this.correo, this.nombre, empleador);
    }
  }
  
  module.exports = Empleado;
  