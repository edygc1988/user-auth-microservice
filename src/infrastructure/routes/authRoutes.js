const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const basicAuthMiddleware = require('../middleware/basicAuthMiddleware');

const router = express.Router();

router.post('/login', basicAuthMiddleware, authController.iniciarSesion);
router.post('/datos_usuario/', authMiddleware, authController.obtener);
router.post('/registrar', authController.registrar);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida' });
});

module.exports = router;
