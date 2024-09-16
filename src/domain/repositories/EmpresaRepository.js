class EmpresaRepository {
  constructor({ EmpresaModel }) {
    this.EmpresaModel = EmpresaModel;
  }

  async crearEmpresa(empresaData) {
    console.log('Datos: ' + empresaData.nombre);
    const empresa = await this.EmpresaModel.create(empresaData);
    return empresa;
  }

  async obtenerPorCorreo(correo) {
    return this.UsuarioModel.findOne({ where: { correo } });
  }

  async asignarRoles(usuario, roles) {
    const rolesEncontrados = await this.RolModel.findAll({ where: { nombre: roles } });
    return usuario.setRoles(rolesEncontrados);
  }
}

module.exports = EmpresaRepository;
