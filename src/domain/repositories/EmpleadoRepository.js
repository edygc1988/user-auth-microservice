class EmpleadoRepository {
  constructor({ EmpleadoModel }) {
    this.EmpleadoModel = EmpleadoModel;
  }

  async crearEmpleado(empleadoData) {
    const empleado = await this.EmpleadoModel.create(empleadoData);
    return empleado;
  }

  async getEmpleadoByBoss(empleadoData) {
    const empleado = await this.EmpleadoModel.findAll({where: {id: empleadoData}});
    return empleado;
  }

  async obtenerPorCorreo(correo) {
    return this.UsuarioModel.findOne({ where: { correo } });
  }

  async asignarUsuario(empleado, usuario) {
    const usuariosEncontrados = await this.UsuarioModel.findAll({ where: { correo: usuario } });
    return empleado.setUsuario(usuariosEncontrados);
  }

  async asignarEmpresa(empleado, empresaId) {
    const empresasEncontrados = await this.UsuarioModel.findAll({ where: { id: usuarioId } });
    return empleado.setUsuario(usuariosEncontrados);
  }
}

module.exports = EmpleadoRepository;
