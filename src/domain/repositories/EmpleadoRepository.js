class EmpleadoRepository {
  constructor({ EmpleadoModel, EmpresaModel, PersonaIndividualModel }) {
    this.EmpleadoModel = EmpleadoModel;
    this.EmpresaModel = EmpresaModel;
    this.PersonaIndividualModel = PersonaIndividualModel;
  }

  async crearEmpleado(empleadoData) {
    const empleado = await this.EmpleadoModel.create(empleadoData);
    return empleado;
  }

  async getById(empleadoId) {
    const empleado = await this.EmpleadoModel.findByPk(empleadoId);
    return empleado;
  }

  async getEmpleadoByBoss(empleadoData) {
    const empleado = await this.EmpleadoModel.findAll({
      where: { usuarioId: empleadoData },
      include: [
        {
          model: this.EmpresaModel,
          as: "empresas",
          through: { attributes: ["tipoContrato", "sueldo"] },
          attributes: ["id", "nombre", "tipo", "identificacion"], // Ajusta según los campos que necesites
        },
      ],
    });
    console.log(empleado);
    return empleado;
  }

  async getEmpleadoByMail(correo) {
    const empleado = await this.EmpleadoModel.findOne({
      where: { correo: correo },
    });
    return empleado;
  }

  async getByMail(correo) {
    const empleado = await this.EmpleadoModel.findOne({
      where: { correo: correo },
      include: [
        {
          model: this.EmpresaModel,
          as: "empresas",
          through: { attributes: ["tipoContrato", "sueldo", "mensualizaDecimoTercero", "mensualizaDecimoCuarto", "fechaInicio", "fechaFin"] },
          attributes: ["id", "nombre", "tipo", "identificacion"], // Ajusta según los campos que necesites
        }, // Relación Empleado-Empresa
        {
          model: this.PersonaIndividualModel,
          as: "personas",
          through: { attributes: ["tipoContrato", "sueldo", "mensualizaDecimoTercero", "mensualizaDecimoCuarto", "fechaInicio", "fechaFin"] },
          attributes: ["id", "nombre", "tipo", "identificacion"], // Ajusta según los campos que necesites
        }, // Relación Empleado-Persona
      ],
    });

    if (!empleado) return null;

    // Transformar la respuesta al formato deseado
    return {
      empleado: {
        id: empleado.id,
        identificacion: empleado.identificacion,
        nombre: empleado.nombre,
        correo: empleado.correo,
        empresas: empleado.empresas.map((empresa) => ({
          id: empresa.id,
          nombre: empresa.nombre,
          identificacion: empresa.identificacion,
          tipo: empresa.tipo,
          tipoContrato: empresa.EmpleadoEmpresa.tipoContrato,
          sueldo: empresa.EmpleadoEmpresa.sueldo,
          mensualizaDecimoTercero: empresa.EmpleadoEmpresa.mensualizaDecimoTercero,
          mensualizaDecimoCuarto: empresa.EmpleadoEmpresa.mensualizaDecimoCuarto,
          fechaInicio: empresa.EmpleadoEmpresa.fechaInicio,
          fechaFin: empresa.EmpleadoEmpresa.fechaFin,
        })),
        personas: empleado.personas.map((persona) => ({
          id: persona.id,
          nombre: persona.nombre,
          identificacion: persona.identificacion,
          tipo: persona.tipo,
          tipoContrato: persona.EmpleadoPersonaIndividual.tipoContrato,
          sueldo: persona.EmpleadoPersonaIndividual.sueldo,
          mensualizaDecimoTercero: empresa.EmpleadoPersonaIndividual.mensualizaDecimoTercero,
          mensualizaDecimoCuarto: empresa.EmpleadoPersonaIndividual.mensualizaDecimoCuarto,
          fechaInicio: empresa.EmpleadoPersonaIndividual.fechaInicio,
          fechaFin: empresa.EmpleadoPersonaIndividual.fechaFin,
        })),
      },
    };
  }

  async asignarEmpresa(empleado) {
    const empresasEncontrados = await this.EmpleadoModel.create(empleado);
    return empleado.setUsuario(empresasEncontrados);
  }

  async asignarPersona(empleado) {
    const empresasEncontrados = await this.EmpleadoModel.create(empleado);
    return empleado.setUsuario(empresasEncontrados);
  }
}

module.exports = EmpleadoRepository;
