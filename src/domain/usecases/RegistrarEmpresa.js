class RegistrarEmpresa {
    constructor(empresaRepository) {
      this.empresaRepository = empresaRepository;
    }
  
    async execute(empresaData) {
      const empresa = await this.empresaRepository.crearEmpresa(empresaData);
      return empresa;
    }
  }
  
  module.exports = RegistrarEmpresa;
  