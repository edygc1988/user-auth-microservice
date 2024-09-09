const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class IniciarSesion {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(correo, contraseña) {
    const usuario = await this.usuarioRepository.obtenerPorCorreo(correo);
    if (!usuario) throw new Error('Usuario no encontrado');

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) throw new Error('Contraseña incorrecta');

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = IniciarSesion;
