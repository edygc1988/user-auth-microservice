class PersonaIndividualRepository {
  constructor({ PersonaModel, RolModel }) {
    this.PersonaModel = PersonaModel;
    this.RolModel = RolModel;
  }

  async crearPersona(personaData) {
    const persona = await this.PersonaModel.create(personaData);
    return persona;
  }

  async getByUser(userId) {
    return await this.PersonaModel.findAll({where: {usuarioId: userId}});
  }

  async asignarRoles(usuario, roles) {
    const rolesEncontrados = await this.RolModel.findAll({ where: { nombre: roles } });
    return usuario.setRoles(rolesEncontrados);
  }
}

module.exports = PersonaIndividualRepository;
