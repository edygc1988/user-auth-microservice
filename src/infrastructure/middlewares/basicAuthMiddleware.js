const jwt = require('jsonwebtoken');
require('dotenv').config();


// Middleware para autenticación básica
const basicAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('No authorization header provided');
  }

  // Extract 'Basic' part and base64 encoded credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

  // Validar usuario y contraseña
  if (process.env.AUT_CREDENTIAL==credentials) {
    next(); // Usuario autenticado correctamente
  } else {
    res.status(401).send('Invalid credentials');
  }
};

module.exports = basicAuthMiddleware;
