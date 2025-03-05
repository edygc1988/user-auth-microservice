const NotificationService = require('../services/notificationService');

class Usuario {
    constructor({ id, nombre, correo, contraseña, createdBy, roles = [] }) {
      this.id = id;
      this.nombre = nombre;
      this.correo = correo;
      this.contraseña = contraseña;
      this.createdBy = createdBy;
      this.roles = roles;
    }

    async notifyRegister() {
      await NotificationService.sendUserRegistrationEmail(this.correo, this.nombre);
    }

    async notifyLogin() {
      await NotificationService.sendLoginEmail(this.correo);
    }
  }
  
  module.exports = Usuario;
  