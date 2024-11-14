const EmpleadoRepository = require('../../../domain/repositories/empleadoRepository');
const RegistrarEmpleado = require('../../../application/usecases/registrarEmpleado');
const { EmpleadoModel, EmpresaModel, PersonaIndividualModel } = require('../../database');
const empleadoRepository = new EmpleadoRepository({ EmpleadoModel, EmpresaModel, PersonaIndividualModel });

const registrarEmpleado = new RegistrarEmpleado(empleadoRepository);


exports.registrar = async (req, res) => {
  try {
    const empleadoData = req.body;
    empleadoData.usuarioId = req.userId;
    const empleado = await registrarEmpleado.execute(empleadoData);

    res.status(201).json({ message: 'Empleado registrado exitosamente', empleado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.asignarUsuario = async (req, res) => {
  try {
    const empleadoData = req.body;
    empleadoData.usuarioId = req.userId;
    console.log(empleadoData);
    const empleado = await registrarEmpleado.getEmpleado({ empleadoData });

    await empleadoRepository.asignarUsuario(empleado, empleadoData.usuarioId);

    res.status(201).json({ message: 'Empleado registrado exitosamente', empleado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmpleadoByMail = async (req, res) => {
  try {
    const correo = req.params.correo;
    const empleado = await registrarEmpleado.getEmpleadoByMail(correo);

    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByMail = async (req, res) => {
  try {
    const correo = req.params.correo;
    const empleado = await registrarEmpleado.getByMail(correo);

    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmpleadoByBoss = async (req, res) => {
  try {
    const empleadoData = req.params.id;
    const empleado = await registrarEmpleado.getEmpleadoByBoss(empleadoData);

    if (!empleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.asignarPersona = async (req, res) => {
  try {
    const empleadoData = req.body;
    const usuario = await registrarEmpleado.asignarPersona(empleadoData);

    if(!usuario)
      return res.status(404).json({ message: 'Empleado no encontrado' });
    else
      return res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.asignarEmpresa = async (req, res) => {
  try {
    const empleadoData = req.body;
    const usuario = await registrarEmpleado.asignarEmpresa(empleadoData);

    if(!usuario)
      return res.status(404).json({ message: 'Empleado no encontrado' });
    else
      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
      

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};