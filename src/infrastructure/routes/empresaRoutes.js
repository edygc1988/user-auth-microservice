const express = require('express');
const empresaController = require('../controllers/empresaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/registrar', authMiddleware, empresaController.registrar);
//router.post('/login', authController.iniciarSesion);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida' });
});

module.exports = router;
