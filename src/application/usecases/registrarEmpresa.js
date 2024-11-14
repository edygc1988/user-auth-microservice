const ValidationService = require('../../domain/services/validationService');

class RegistrarEmpresa {
    constructor(empresaRepository) {
      this.empresaRepository = empresaRepository;
    }
  
    async execute(empresaData) {
      ValidationService.validarCamposUsuario(empresaData);
      const empresa = await this.empresaRepository.crearEmpresa(empresaData);
      return empresa;
    }
  
    async getByUser(userId) {
      const empresa = await this.empresaRepository.getByUser(userId);
      return empresa;
    }
  }
  
  module.exports = RegistrarEmpresa;
  