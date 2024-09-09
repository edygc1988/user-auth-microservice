const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class ValidarSesion {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async autenticarUsuario(correo, contraseña) {
    const usuario = await this.usuarioRepository.obtenerPorCorreo(correo);
    if (!usuario) throw new Error('Usuario no encontrado');
  
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) throw new Error('Contraseña incorrecta');
  
    return usuario;
  }
  
  async verificarToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(new Error('Token no válido'));
        } else {
          resolve(decoded);
        }
      });
    });
  }
  
  async execute(correo, contraseña, token) {
    try {
      const usuario = await this.autenticarUsuario(correo, contraseña);
      const decodedToken = await this.verificarToken(token);
      
      console.log('login successful for user:', usuario.id);
      return { usuario, decodedToken };
    } catch (error) {
      console.error('Error en la autenticación:', error.message);
      throw error;
    }
  }
}

module.exports = ValidarSesion;
