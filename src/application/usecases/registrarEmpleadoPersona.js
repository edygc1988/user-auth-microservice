class RegistrarEmpleadoPersona {
    constructor(empleadoPersonaRepository) {
      this.empleadoPersonaRepository = empleadoPersonaRepository;
    }
  
    async execute(empleadoPersonaData) {
      const empleadoPersona = await this.empleadoPersonaRepository.crearEmpleadoPersona(empleadoPersonaData);
      return empleadoPersona;
    }
  
    async getEmpleadoPersona(empleadoPersonaData) {
      const empleadoPersona = await this.empleadoPersonaRepository.findAll({ where : { id: empleadoPersonaData.id} });
      return empleadoPersona;
    }
  
    async getEmpleadoPersonaByBoss(empleadoPersonaData) {
      const empleadoPersona = await this.empleadoPersonaRepository.getEmpleadoPersonaByBoss(empleadoPersonaData);
      return empleadoPersona;
    }
  
    async asignarEmpresa(empleadoPersonaData) {
      const empleadoPersona = await this.empleadoPersonaRepository.asignarEmpresa(empleadoPersonaData);
      return empleadoPersona;
    }
  
    async asignarPersona(empleadoPersonaData) {
      const empleadoPersona = await this.empleadoPersonaRepository.asignarPersona(empleadoPersonaData);
      return empleadoPersona;
    }
  }

  
  module.exports = RegistrarEmpleadoPersona;
  