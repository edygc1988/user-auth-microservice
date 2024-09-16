class UsuarioRepository {
  constructor({ UsuarioModel, RolModel }) {
    this.UsuarioModel = UsuarioModel;
    this.RolModel = RolModel;
  }

  async crearUsuario(usuarioData) {
    const usuario = await this.UsuarioModel.create(usuarioData);
    return usuario;
  }

  async obtenerUsuario(userId) {
    const usuario = await this.UsuarioModel.findAll({ where: { id: userId }});
    return usuario;
  }

  async obtenerPorCorreo(correo) {
    return this.UsuarioModel.findOne({ where: { correo } });
  }

  async asignarRoles(usuario, roles) {
    const rolesEncontrados = await this.RolModel.findAll({ where: { nombre: roles } });
    return usuario.setRoles(rolesEncontrados);
  }
}

module.exports = UsuarioRepository;
