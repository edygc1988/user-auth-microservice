class PersonaIndividualRepository {
  constructor({ PersonaIndividualModel, RolModel }) {
    this.PersonaIndividualModel = PersonaIndividualModel;
    this.RolModel = RolModel;
  }

  async crearPersona(personaData) {
    const persona = await this.PersonaIndividualModel.create(personaData);
    return persona;
  }

  async getByUser(userId) {
    return await this.PersonaIndividualModel.findAll({where: {usuarioId: userId}});
  }

  async asignarRoles(usuario, roles) {
    const rolesEncontrados = await this.RolModel.findAll({ where: { nombre: roles } });
    return usuario.setRoles(rolesEncontrados);
  }
}

module.exports = PersonaIndividualRepository;
