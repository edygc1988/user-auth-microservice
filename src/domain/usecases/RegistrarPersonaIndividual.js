class RegistrarPersona {
    constructor(personaRepository) {
      this.personaRepository = personaRepository;
    }
  
    async execute(personaData) {
      const persona = await this.personaRepository.crearPersona(personaData);
      return persona;
    }
  }
  
  module.exports = RegistrarPersona;
  