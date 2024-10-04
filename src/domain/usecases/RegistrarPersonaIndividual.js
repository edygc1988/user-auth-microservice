class RegistrarPersona {
    constructor(personaRepository) {
      this.personaRepository = personaRepository;
    }
  
    async execute(personaData) {
      const persona = await this.personaRepository.crearPersona(personaData);
      return persona;
    }
  
    async getByUser(userId) {
      return await this.personaRepository.getByUser(userId);
    }
  }
  
  module.exports = RegistrarPersona;
  