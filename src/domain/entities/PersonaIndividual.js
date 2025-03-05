const NotificationService = require('../services/notificationService');

class PersonaIndividual {
    constructor({ id, nombre, direccion, correo, usuarioId, createdBy }) {
      this.id = id;
      this.nombre = nombre;
      this.direccion = direccion;
      this.correo = correo;
      this.usuarioId = usuarioId;
      this.createdBy = createdBy;
    }
    
    async notiy() {
      await NotificationService.sendPersonRegistrationEmail(this.correo, this.nombre);
    }
  }
  
  module.exports = PersonaIndividual;
  