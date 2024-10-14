const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class IniciarSesion {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async asignarRefreshToken(correo, refreshToken){
    await this.usuarioRepository.asignarRefreshToken(correo, refreshToken);
  }

  async execute(correo, contraseña) {
    const usuario = await this.usuarioRepository.obtenerPorCorreo(correo);
    if (!usuario) throw new Error('Usuario no encontrado');

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) throw new Error('Contraseña incorrecta');

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: Number(process.env.TOKEN_TIME) });
    const refresh_token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);
    
    return {token, refresh_token};
  }

  async getTokenRefresh(refreshToken){
    const usuario = await this.usuarioRepository.obtenerPorToken(refreshToken);
    if (!usuario) throw new Error('Usuario no encontrado');

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: Number(process.env.TOKEN_TIME) });
    
    return {token};
  }
}

module.exports = IniciarSesion;
