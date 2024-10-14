const EmpleadoPersonaRepository = require('../../../domain/repositories/empleadoPersonaRepository');
const RegistrarEmpleadoPersona = require('../../../application/usecases/registrarEmpleadoPersona');
const RegistrarEmpleado = require('../../../application/usecases/registrarEmpleado');
const { EmpleadoPersonaModel,EmpleadoModel, EmpresaModel, PersonaIndividualModel } = require('../../database');
const { sendEmployeeEvent } = require('../../events/kafkaProducer');
const EmpleadoRepository = require('../../../domain/repositories/empleadoRepository');
const empleadoPersonaRepository = new EmpleadoPersonaRepository({ EmpleadoPersonaModel });

const empleadoRepository = new EmpleadoRepository({ EmpleadoModel, EmpresaModel, PersonaIndividualModel });


exports.getEmpleadoPersonaByBoss = async (req, res) => {
  try {
    const empleadoPersonaData = req.params.id;
    const registrarEmpleadoPersona = new RegistrarEmpleadoPersona(empleadoPersonaRepository);        
    const empleadoPersona = await registrarEmpleadoPersona.getEmpleadoPersonaByBoss(empleadoPersonaData);

    if (!empleadoPersona) {
      return res.status(404).json({ message: 'EmpleadoPersona no encontrado' });
    }

    res.status(200).json(empleadoPersona);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.asignarPersona = async (req, res) => {
  try {
    const empleadoPersonaData = req.body;
    const registrarEmpleadoPersona = new RegistrarEmpleadoPersona(empleadoPersonaRepository);
    const registrarEmpleado = new RegistrarEmpleado(empleadoRepository);
    const usuario = await registrarEmpleadoPersona.asignarPersona(empleadoPersonaData);

    //Enviar empleado a servicio de Pagos
    const empleadoAsign = await registrarEmpleado.getByMail(empleadoData.correo);
    console.log('Empleado registrado' + empleadoAsign);
    await sendEmployeeEvent(empleadoAsign);

    if(!usuario)
      return res.status(404).json({ message: 'EmpleadoPersona no encontrado' });
    else
      return res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
