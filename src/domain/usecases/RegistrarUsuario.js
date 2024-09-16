class RegistrarUsuario {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
  
    async execute(usuarioData) {
      const usuario = await this.usuarioRepository.crearUsuario(usuarioData);
      return usuario;
    }
  
    async get(userId) {
      const usuario = await this.usuarioRepository.obtenerUsuario(userId);
      return usuario;
    }
  }
  
  module.exports = RegistrarUsuario;
  