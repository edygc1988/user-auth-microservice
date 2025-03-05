const ValidationService = require('../../domain/services/validationService');
const Empresa = require('../../domain/entities/empresa');

class RegistrarEmpresa {
    constructor(empresaRepository) {
      this.empresaRepository = empresaRepository;
    }
  
    async execute(empresaData) {
      ValidationService.validarCamposUsuario(empresaData);
      const empresa = await this.empresaRepository.crearEmpresa(empresaData);

      
      // Crear una instancia de Empresa para enviar notificaciones
      const empresaEntidad = new Empresa(empresa);

      // Llamar al método notify para enviar las notificaciones
      try {
        await empresaEntidad.notify();
        console.log("Notificaciones enviadas con éxito.");
      } catch (error) {
        console.error("Error al enviar notificaciones:", error);
      }

      return empresa;
    }
  
    async getByUser(userId) {
      const empresa = await this.empresaRepository.getByUser(userId);
      return empresa;
    }
  }
  
  module.exports = RegistrarEmpresa;
  