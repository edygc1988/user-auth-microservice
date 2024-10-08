class RegistrarEmpleado {
    constructor(empleadoRepository) {
      this.empleadoRepository = empleadoRepository;
    }
  
    async execute(empleadoData) {
      const empleado = await this.empleadoRepository.crearEmpleado(empleadoData);
      return empleado;
    }
  
    async getEmpleado(empleadoData) {
      const empleado = await this.empleadoRepository.findAll({ where : { id: empleadoData.id} });
      return empleado;
    }
  
    async getEmpleadoByBoss(empleadoData) {
      const empleado = await this.empleadoRepository.getEmpleadoByBoss(empleadoData);
      return empleado;
    }
  }

  
  module.exports = RegistrarEmpleado;
  