class EmpleadoPersonaRepository {
  constructor({ EmpleadoPersonaModel }) {
    this.EmpleadoPersonaModel = EmpleadoPersonaModel;
  }

  async getEmpleadoPersonaByMail(empleadoData) {
    const empleado = await this.EmpleadoPersonaModel.findAll({where: {id: empleadoData}});
    return empleado;
  }

  async asignarPersona(empleado) {
    const empresasEncontrados = await this.EmpleadoPersonaModel.create(empleado);
    return empresasEncontrados;
  }
}

module.exports = EmpleadoPersonaRepository;
