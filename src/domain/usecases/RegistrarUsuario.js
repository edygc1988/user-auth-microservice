class RegistrarUsuario {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
  
    async execute(usuarioData) {
      const usuario = await this.usuarioRepository.crearUsuario(usuarioData);
      return usuario;
    }
  }
  
  module.exports = RegistrarUsuario;
  