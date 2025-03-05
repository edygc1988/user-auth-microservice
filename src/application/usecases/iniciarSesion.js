const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../../domain/entities/usuario');

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
    
    // Crear una instancia de Usuario para enviar notificaciones
    const usuarioEntidad = new Usuario(usuario);

    // Llamar al método notify para enviar las notificaciones
    try {
      await usuarioEntidad.notifyLogin();
      console.log("Notificaciones enviadas con éxito.");
    } catch (error) {
      console.error("Error al enviar notificaciones:", error);
    }
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
