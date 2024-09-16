const EmpleadoRepository = require('../../domain/repositories/EmpleadoRepository');
const RegistrarEmpleado = require('../../domain/usecases/RegistrarEmpleado');
const { EmpleadoModel } = require('../orm');
const empleadoRepository = new EmpleadoRepository({ EmpleadoModel });

exports.registrar = async (req, res) => {
  try {
    const empleadoData = req.body;
    const registrarEmpleado = new RegistrarEmpleado(empleadoRepository);
    const empleado = await registrarEmpleado.execute(empleadoData);

    res.status(201).json({ message: 'Empleado registrado exitosamente', empleado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.asignarUsuario = async (req, res) => {
  try {
    const empleadoData = req.body;
    const registrarEmpleado = new RegistrarEmpleado(empleadoRepository);
    empleadoData.usuarioId = req.userId;
    console.log(empleadoData);
    const empleado = await registrarEmpleado.getEmpleado({ empleadoData });

    await empleadoRepository.asignarUsuario(empleado, empleadoData.usuarioId);

    res.status(201).json({ message: 'Empleado registrado exitosamente', empleado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.asignarPersona = async (req, res) => {
  try {
    const usaurioData = req.body;
    const registrarUsuario = new RegistrarUsuario(usuarioRepository);
    const usuario = await registrarUsuario.execute(usaurioData);

    if (roles) {
      await usuarioRepository.asignarRoles(usuario, roles);
    } else {
      await usuarioRepository.asignarRoles(usuario, ['empleado']);
    }

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.asignarEmpresa = async (req, res) => {
  try {
    const usaurioData = req.body;
    const registrarUsuario = new RegistrarUsuario(usuarioRepository);
    const usuario = await registrarUsuario.execute(usaurioData);

    if (roles) {
      await usuarioRepository.asignarRoles(usuario, roles);
    } else {
      await usuarioRepository.asignarRoles(usuario, ['empleado']);
    }

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};