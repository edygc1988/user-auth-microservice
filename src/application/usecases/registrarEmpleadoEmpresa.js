class RegistrarEmpleadoEmpresa {
    constructor(empleadoEmpresaRepository) {
      this.empleadoEmpresaRepository = empleadoEmpresaRepository;
    }
  
    async execute(empleadoEmpresaData) {
      const empleadoEmpresa = await this.empleadoEmpresaRepository.crearEmpleadoEmpresa(empleadoEmpresaData);
      return empleadoEmpresa;
    }
  
    async getEmpleadoEmpresa(empleadoEmpresaData) {
      const empleadoEmpresa = await this.empleadoEmpresaRepository.findAll({ where : { id: empleadoEmpresaData.id} });
      return empleadoEmpresa;
    }
  
    async getEmpleadoEmpresaByBoss(empleadoEmpresaData) {
      const empleadoEmpresa = await this.empleadoEmpresaRepository.getEmpleadoEmpresaByBoss(empleadoEmpresaData);
      return empleadoEmpresa;
    }
  
    async asignarEmpresa(empleadoEmpresaData) {
      const empleadoEmpresa = await this.empleadoEmpresaRepository.asignarEmpresa(empleadoEmpresaData);
      return empleadoEmpresa;
    }
  
    async asignarPersona(empleadoEmpresaData) {
      const empleadoEmpresa = await this.empleadoEmpresaRepository.asignarPersona(empleadoEmpresaData);
      return empleadoEmpresa;
    }
  }

  
  module.exports = RegistrarEmpleadoEmpresa;
  