const EmpresaRepository = require('../../../domain/repositories/empresaRepository');
const RegistrarEmpresa = require('../../../application/usecases/registrarEmpresa');
const { EmpresaModel } = require('../../database');
const {sendBossEvent} = require('../../events/kafkaProducer');
const empresaRepository = new EmpresaRepository({ EmpresaModel });

exports.registrar = async (req, res) => {
  try {
    const empresaData = req.body;
    const registrarEmpresa = new RegistrarEmpresa(empresaRepository);
    const empresa = await registrarEmpresa.execute(empresaData);
    console.log(empresa);
    await sendBossEvent(empresa);

    res.status(201).json({ message: 'Usuario registrado exitosamente ' + req.userId, empresa });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByUser = async (req, res) => {
  try {
    const registrarEmpresa = new RegistrarEmpresa(empresaRepository);
    const empresa = await registrarEmpresa.getByUser(req.userId);

    if (!empresa) {
      return res.status(404).json({ message: 'Empresas no encontradas' });
    }

    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};