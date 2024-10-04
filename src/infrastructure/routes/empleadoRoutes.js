const express = require('express');
const empleadoController = require('../controllers/empleadoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/registrar', authMiddleware, empleadoController.registrar);
router.post('/registrarUsuario', authMiddleware, empleadoController.asignarUsuario);
router.get('/listar/:id', authMiddleware, empleadoController.getEmpleadoByBoss);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida' });
});

module.exports = router;
