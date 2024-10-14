const express = require('express');
const cors = require('cors');  // Importa el paquete CORS

const bodyParser = require('body-parser');
const { sequelize } = require('../database');
const authRoutes = require('./routes/authRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const personaRoutes = require('./routes/personaIndividualRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const { startProducer } = require('../events/kafkaProducer');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/empresa', empresaRoutes);
app.use('/api/v1/persona', personaRoutes);
app.use('/api/v1/empleado', empleadoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  await sequelize.authenticate();
  console.log('Base de datos conectada');
  await startProducer();
});
