const express = require('express');
const personaController = require('../controllers/personaIndividualController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/registrar', authMiddleware, personaController.registrar);
router.get('/listar', authMiddleware, personaController.getByUser);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida' });
});

module.exports = router;
