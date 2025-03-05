const Usuario = require('../../domain/entities/usuario');

class RegistrarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(usuarioData) {
    const usuario = await this.usuarioRepository.crearUsuario(usuarioData);

    // Crear una instancia de Usuario para enviar notificaciones
    const usuarioEntidad = new Usuario(usuario);

    // Llamar al método notify para enviar las notificaciones
    try {
      await usuarioEntidad.notifyRegister();
      console.log("Notificaciones enviadas con éxito.");
    } catch (error) {
      console.error("Error al enviar notificaciones:", error);
    }
    return usuario;
  }

  async asignarRoles(usuario, roles) {
    return await this.usuarioRepository.asignarRoles(usuario, roles);
  }

  async obtenerEmpresaPeronaByUserId(id) {
    return await this.usuarioRepository.obtenerEmpresaPeronaByUserId(id);
  }

  async getUserMail(correo) {
    const usuario = await this.usuarioRepository.obtenerPorCorreo(correo);
    return usuario;
  }
}

module.exports = RegistrarUsuario;
