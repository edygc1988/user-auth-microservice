const EmpresaRepository = require('../../domain/repositories/EmpresaRepository');
const RegistrarEmpresa = require('../../domain/usecases/RegistrarEmpresa');
const { EmpresaModel } = require('../orm');
const empresaRepository = new EmpresaRepository({ EmpresaModel });

exports.registrar = async (req, res) => {
  try {
    const empresaData = req.body;
    const registrarEmpresa = new RegistrarEmpresa(empresaRepository);
    const empresa = await registrarEmpresa.execute(empresaData);

    res.status(201).json({ message: 'Usuario registrado exitosamente ' + req.userId, empresa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};