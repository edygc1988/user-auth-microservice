class RegistrarUsuario {
    constructor(usuarioRepository) {
      this.usuarioRepository = usuarioRepository;
    }
  
    async execute(usuarioData) {
      const usuario = await this.usuarioRepository.crearUsuario(usuarioData);
      return usuario;
    }

    async asignarRoles(usuario, roles) {
      return await this.usuarioRepository.asignarRoles(usuario, roles);
    }

    async obtenerEmpresaPeronaByUserId(id){
      return await this.usuarioRepository.obtenerEmpresaPeronaByUserId(id);
    }
  
    async getUserMail(correo) {
      const usuario = await this.usuarioRepository.obtenerPorCorreo(correo);
      return usuario;
    }
  }
  
  module.exports = RegistrarUsuario;
  