class EmpleadoEmpresaRepository {
  constructor({ EmpleadoEmpresaModel }) {
    this.EmpleadoEmpresaModel = EmpleadoEmpresaModel;
  }

  async asignarEmpresa(empleado) {
    const empresasEncontrados = await this.EmpleadoEmpresaModel.create(empleado);
    return empresasEncontrados;
  }
}

module.exports = EmpleadoEmpresaRepository;
