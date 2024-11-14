const express = require('express');
const empleadoController = require('../controllers/empleadoController');
const empleadoEmpresaController = require('../controllers/empleadoEmpresaController');
const empleadoPersonaController = require('../controllers/empleadoPersonaController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/registrar', authMiddleware, empleadoController.registrar);
router.post('/registrarUsuario', authMiddleware, empleadoController.asignarUsuario);
router.post('/asignare', authMiddleware, empleadoEmpresaController.asignarEmpresa);
router.post('/asignarp', authMiddleware, empleadoPersonaController.asignarPersona);

router.get('/obtenerAsociado/:correo', authMiddleware, empleadoController.getByMail);
router.get('/listar/:id', authMiddleware, empleadoController.getEmpleadoByBoss);



router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida' });
});

module.exports = router;
