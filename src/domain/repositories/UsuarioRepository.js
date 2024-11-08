class UsuarioRepository {
  constructor({ UsuarioModel, RolModel, EmpresaModel, PersonaIndividualModel }) {
    this.UsuarioModel = UsuarioModel;
    this.RolModel = RolModel;
    this.EmpresaModel = EmpresaModel;
    this.PersonaIndividualModel = PersonaIndividualModel;
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
    return await this.UsuarioModel.findOne({
      where: { correo: correo },
      include: [{
        model: this.RolModel,
        as: 'Rols',
        through: { attributes: [] } // Esto evita que se incluyan los atributos de la tabla intermedia
      }]
    });
  }

  async obtenerEmpresaPeronaByUserId(id){
    return await this.UsuarioModel.findByPk(id,{
      include: [{
        model: this.EmpresaModel,
        as: "empresa",
        //through: "Empresa" // Esto evita que se incluyan los atributos de la tabla intermedia
      },
      {
        model: this.PersonaIndividualModel,
        as: "personaIndividual",
        //through: "PersonaIndividual" // Esto evita que se incluyan los atributos de la tabla intermedia
      }]
    });
  }

  async obtenerPorToken(token) {
    return await this.UsuarioModel.findOne({ where: { refreshToken: token } });
  }

  async asignarRoles(usuario, roles) {
    const rolesEncontrados = await this.RolModel.findAll({ where: { nombre: roles } });
    usuario.setRols(rolesEncontrados, { through: { 'createdBy': usuario.nombre } } );
  
    console.log(`Roles asignados al usuario: ${rolesEncontrados.map(r => r.nombre).join(', ')}`);
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
