const express = require('express');
const { sequelize } = require('../orm');
const authRoutes = require('../routes/authRoutes');
const empresaRoutes = require('../routes/empresaRoutes');
const personaRoutes = require('../routes/personaIndividualRoutes');
const empleadoRoutes = require('../routes/empleadoRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/persona', personaRoutes);
app.use('/api/empleado', empleadoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  await sequelize.authenticate();
  console.log('Base de datos conectada');
});
