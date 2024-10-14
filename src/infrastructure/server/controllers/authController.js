//Repositorios
const UsuarioRepository = require('../../../domain/repositories/usuarioRepository');
const EmpleadoRepository = require('../../../domain/repositories/empleadoRepository');

//Modelos
const { EmpleadoModel, UsuarioModel, RolModel, EmpresaModel, PersonaIndividualModel } = require('../../database');

//Casos de uso
const RegistrarUsuario = require('../../../application/usecases/RegistrarUsuario');
const IniciarSesion = require('../../../application/usecases/IniciarSesion');
const RegistrarEmpleado = require('../../../application/usecases/registrarEmpleado');

//Inicializacion de repositorios
const empleadoRepository = new EmpleadoRepository({ EmpleadoModel, EmpresaModel, PersonaIndividualModel });
const usuarioRepository = new UsuarioRepository({ UsuarioModel, RolModel, EmpresaModel, PersonaIndividualModel });

//Inicializacion de casos de uso
const registrarEmpleado = new RegistrarEmpleado(empleadoRepository);
const registrarUsuario = new RegistrarUsuario(usuarioRepository);
const iniciarSesion = new IniciarSesion(usuarioRepository);


exports.registrar = async (req, res) => {
  try {
    const usaurioData = req.body;
    const usuario = await registrarUsuario.execute(usaurioData);

    if (roles) {
      await usuarioRepository.asignarRoles(usuario, usuarioData.roles);
    } else {
      await usuarioRepository.asignarRoles(usuario, ['empleado']);
    }

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerEmpresaPeronaByUserId = async (req, res) => {
  try {
    //const { correo } = req.body; // Obtener el ID de los parámetros de la ruta
    const id = req.userId;
    const usuario = await registrarUsuario.obtenerEmpresaPeronaByUserId(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtener = async (req, res) => {
  try {
    const { correo } = req.body; // Obtener el ID de los parámetros de la ruta
    const usuario = await registrarUsuario.getUserMail(correo);

    const empleado = await registrarEmpleado.getEmpleadoByMail(correo);
    console.log(empleado);

    let empleadoId;
    if(empleado)
      empleadoId = empleado.id;

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ "respuesta" : 1, "usuarioId": usuario.id, "empleadoId": empleadoId, "username":usuario.correo, "nombres": usuario.nombre, "idRol": usuario.Rols[0]?.id || null, "rol": usuario.Rols[0]?.nombre || null });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña, refresh_token, grant_type } = req.body;
    if(grant_type=='password'){
      const {token, refresh_token} = await iniciarSesion.execute(correo, contraseña);
      this.token = token;
      this.refreshToken = refresh_token;

      await iniciarSesion.asignarRefreshToken(correo, this.refreshToken);
    }

    if(grant_type=='refresh_token'){
      const {token} = await iniciarSesion.getTokenRefresh(refresh_token);
      this.token = token;
      this.refreshToken = refresh_token;
    }

    res.status(200).json({ 
      "access_token" : this.token,  
      "refresh_token" : this.refreshToken,  
      "expires_in": Number(process.env.TOKEN_TIME),
      "token_type": 'Bearer' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
