const ValidationService = require('../../domain/services/validationService');

class RegistrarEmpleado {
    constructor(empleadoRepository) {
      this.empleadoRepository = empleadoRepository;
    }
  
    async execute(empleadoData) {
      ValidationService.validarCamposUsuario(empleadoData);
      return await this.empleadoRepository.crearEmpleado(empleadoData);
    }

    async getById(empleadoId) {
      return await this.empleadoRepository.getById(empleadoId);
    }
  
    async getEmpleadoByMail(correo) {
      return await this.empleadoRepository.getEmpleadoByMail(correo);
    }
  
    async getByMail(correo) {
      return await this.empleadoRepository.getByMail(correo);
    }
  
    async getEmpleadoByBoss(empleadoData) {
      return await this.empleadoRepository.getEmpleadoByBoss(empleadoData);
    }
  
    async asignarEmpresa(empleadoData) {
      return await this.empleadoRepository.asignarEmpresa(empleadoData);
    }
  
    async asignarPersona(empleadoData) {
      return await this.empleadoRepository.asignarPersona(empleadoData);
    }
  }

  
  module.exports = RegistrarEmpleado;
  