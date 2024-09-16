const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/registrar', authController.registrar);
router.get('/getUsuario/:id', authMiddleware, authController.obtener);
router.post('/login', authController.iniciarSesion);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida' });
});

module.exports = router;
