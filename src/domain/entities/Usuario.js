class Usuario {
    constructor({ id, nombre, correo, contraseña, createdBy, roles = [] }) {
      this.id = id;
      this.nombre = nombre;
      this.correo = correo;
      this.contraseña = contraseña;
      this.createdBy = createdBy;
      this.roles = roles;
    }
  }
  
  module.exports = Usuario;
  