const PersonaRepository = require('../../../domain/repositories/personaIndividualRepository');
const RegistrarPersona = require('../../../application/usecases/registrarPersonaIndividual');
const { PersonaIndividualModel, UsuarioModel } = require('../../database');
const {sendBossEvent} = require('../../events/kafkaProducer');
const personaRepository = new PersonaRepository({ PersonaIndividualModel, UsuarioModel });

exports.registrar = async (req, res) => {
  try {
    const personaData = req.body;
    const registrarPersona = new RegistrarPersona(personaRepository);
    const persona = await registrarPersona.execute(personaData);  
    await sendBossEvent(persona);

    res.status(201).json({ message: 'Registrado como persona individual exitosamente', persona });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.asignarUsuario = async (req, res) => {
  try {
    const {} = req.body;
    const registrarPersona = new RegistrarPersona(personaRepository);
    const persona = await registrarPersona.execute(personaData);  

    res.status(201).json({ message: 'Usuario registrado exitosamente', persona });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const registrarPersona = new RegistrarPersona(personaRepository);
    const persona = await registrarPersona.getByUser(req.userId);

    if (!persona) {
      return res.status(404).json({ message: 'No registrado como persona individual' });
    }

    res.status(200).json(persona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};