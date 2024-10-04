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
    return this.UsuarioModel.findOne({
      where: { correo: correo },
      include: [{
        model: this.RolModel,
        as: 'Rols',
        through: { attributes: [] } // Esto evita que se incluyan los atributos de la tabla intermedia
      }]
    });
  }

  async obtenerPorToken(token) {
    return this.UsuarioModel.findOne({ where: { refreshToken: token } });
  }

  async asignarRoles(usuario, roles) {
    const rolesEncontrados = await this.RolModel.findAll({ where: { nombre: roles } });
    return usuario.setRoles(rolesEncontrados);
  }
  

  async asignarRefreshToken(correo, refreshToken) {
    try {
      return await this.UsuarioModel.update({refreshToken}, { where: { correo: correo }});
    } catch (error) {
        console.error('Error actualizando el token de refresco:', error);
        throw error;  // Lanza el error para manejarlo más arriba si es necesario
    }
  }
}

module.exports = UsuarioRepository;
