const EmpleadoEmpresaRepository = require('../../../domain/repositories/empleadoEmpresaRepository');
const RegistrarEmpleadoEmpresa = require('../../../application/usecases/registrarEmpleadoEmpresa');
const RegistrarEmpleado = require('../../../application/usecases/registrarEmpleado');
const { EmpleadoEmpresaModel,EmpleadoModel, EmpresaModel, PersonaIndividualModel } = require('../../database');
const { sendEmployeeEvent } = require('../../events/kafkaProducer');
const EmpleadoRepository = require('../../../domain/repositories/empleadoRepository');
const empleadoEmpresaRepository = new EmpleadoEmpresaRepository({ EmpleadoEmpresaModel });

const empleadoRepository = new EmpleadoRepository({ EmpleadoModel, EmpresaModel, PersonaIndividualModel });


exports.getEmpleadoEmpresByBoss = async (req, res) => {
  try {
    const empleadoEmpresaData = req.params.id;
    const registrarEmpleadoEmpresa = new RegistrarEmpleadoEmpresa(empleadoEmpresaRepository);        
    const empleadoEmpres = await registrarEmpleadoEmpresa.getEmpleadoEmpresByBoss(empleadoEmpresaData);

    if (!empleadoEmpres) {
      return res.status(404).json({ message: 'EmpleadoEmpres no encontrado' });
    }

    res.status(200).json(empleadoEmpres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.asignarEmpresa = async (req, res) => {
  try {
    const empleadoEmpresaData = req.body;
    const registrarEmpleadoEmpresa = new RegistrarEmpleadoEmpresa(empleadoEmpresaRepository);
    const registrarEmpleado = new RegistrarEmpleado(empleadoRepository);
    const usuario = await registrarEmpleadoEmpresa.asignarEmpresa(empleadoEmpresaData);

    //Enviar empleado a servicio de Pagos
    const empleadoData = await registrarEmpleado.getById(empleadoEmpresaData.empleadoId);

    const empleadoAsign = await registrarEmpleado.getByMail(empleadoData.correo);
    await sendEmployeeEvent(empleadoAsign);

    if(!usuario)
      return res.status(404).json({ message: 'EmpleadoEmpres no encontrado' });
    else
      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
      

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};