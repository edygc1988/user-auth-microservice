const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('../database');
const authRoutes = require('./routes/authRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const personaRoutes = require('./routes/personaIndividualRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const { startProducer } = require('../events/kafkaProducer');
const metricsRoutes = require('./routes/metricasRoutes');
const { collectDefaultMetrics } = require('prom-client');

const app = express();

// Configura la recolección de métricas por defecto
collectDefaultMetrics();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/empresa', empresaRoutes);
app.use('/api/v1/persona', personaRoutes);
app.use('/api/v1/empleado', empleadoRoutes);
app.use('/', metricsRoutes);

/*
app.use((req, res, next) => {
  incrementRequestsCounter();
  next();
});*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  await sequelize.authenticate();
  console.log('Base de datos conectada');
  await startProducer();
});