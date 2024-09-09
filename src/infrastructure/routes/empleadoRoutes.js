const express = require('express');
const empleadoController = require('../controllers/empleadoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/registrar', authMiddleware, empleadoController.registrar);
router.post('/registrarUsuario', authMiddleware, empleadoController.asignarUsuario);
//router.post('/login', authController.iniciarSesion);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida' });
});

module.exports = router;
