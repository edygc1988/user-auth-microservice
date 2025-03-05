const EmpleadoEmpresaRepository = require("../../../domain/repositories/empleadoEmpresaRepository");
const RegistrarEmpleadoEmpresa = require("../../../application/usecases/registrarEmpleadoEmpresa");
const RegistrarEmpleado = require("../../../application/usecases/registrarEmpleado");
const {
  EmpleadoEmpresaModel,
  EmpleadoModel,
  EmpresaModel,
  PersonaIndividualModel,
} = require("../../database");
const { sendEmployeeEvent } = require("../../events/kafkaProducer");
const EmpleadoRepository = require("../../../domain/repositories/empleadoRepository");
const empleadoEmpresaRepository = new EmpleadoEmpresaRepository({
  EmpleadoEmpresaModel,
});
const NotificationService = require("../../../domain/services/notificationService");
const { json } = require("body-parser");

const empleadoRepository = new EmpleadoRepository({
  EmpleadoModel,
  EmpresaModel,
  PersonaIndividualModel,
});

exports.getEmpleadoEmpresByBoss = async (req, res) => {
  try {
    const empleadoEmpresaData = req.params.id;
    const registrarEmpleadoEmpresa = new RegistrarEmpleadoEmpresa(
      empleadoEmpresaRepository
    );
    const empleadoEmpres =
      await registrarEmpleadoEmpresa.getEmpleadoEmpresByBoss(
        empleadoEmpresaData
      );

    if (!empleadoEmpres) {
      return res.status(404).json({ message: "EmpleadoEmpres no encontrado" });
    }

    res.status(200).json(empleadoEmpres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.asignarEmpresa = async (req, res) => {
  try {
    const empleadoEmpresaData = req.body;
    const registrarEmpleadoEmpresa = new RegistrarEmpleadoEmpresa(
      empleadoEmpresaRepository
    );
    const registrarEmpleado = new RegistrarEmpleado(empleadoRepository);
    const usuario = await registrarEmpleadoEmpresa.asignarEmpresa(
      empleadoEmpresaData
    );

    //Enviar empleado a servicio de Pagos
    const empleadoData = await registrarEmpleado.getById(
      empleadoEmpresaData.empleadoId
    );

    const empleadoAsign = await registrarEmpleado.getByMail(
      empleadoData.correo
    );
    const jsonData = JSON.stringify(empleadoAsign);

    // Parsear el JSON para trabajar con los datos
    const empleadoDataF = JSON.parse(jsonData).empleado;

    // Obtener los nombres de empresas y personas válidas
    const nombresEmpresasValidos = empleadoDataF.empresas.map(
      (empresa) => empresa.nombre
    );
    const nombresPersonasValidos = empleadoDataF.personas.map(
      (persona) => persona.nombre
    );

    // Verificar si hay empresas o personas asociadas y enviar la notificación
    if (nombresEmpresasValidos.length > 0) {
      await NotificationService.sendEmployeeRegistrationEmail(
        empleadoData.correo,
        empleadoData.nombre,
        nombresEmpresasValidos[0] // Toma el primer nombre de empresa válido
      );
    } else if (nombresPersonasValidos.length > 0) {
      await NotificationService.sendEmployeeRegistrationEmail(
        empleadoData.correo,
        empleadoData.nombre,
        nombresPersonasValidos[0] // Toma el primer nombre de persona válido
      );
    } else {
      console.error(
        "⚠ No se encontró ni empresa ni persona asociada al empleado."
      );
    }

    await sendEmployeeEvent(empleadoAsign);

    if (!usuario)
      return res.status(404).json({ message: "EmpleadoEmpresa no encontrado" });
    else
      return res
        .status(201)
        .json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
