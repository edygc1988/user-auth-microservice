class RegistrarUsuario {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
  
    async execute(usuarioData) {
      const usuario = await this.usuarioRepository.crearUsuario(usuarioData);
      return usuario;
    }
  
    async getUserMail(correo) {
      const usuario = await this.usuarioRepository.obtenerPorCorreo(correo);
      return usuario;
    }
  }
  
  module.exports = RegistrarUsuario;
  