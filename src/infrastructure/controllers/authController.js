const UsuarioRepository = require('../../domain/repositories/UsuarioRepository');
const { UsuarioModel, RolModel } = require('../orm');
const RegistrarUsuario = require('../../domain/usecases/RegistrarUsuario');
const IniciarSesion = require('../../domain/usecases/IniciarSesion');
const RabbitMQConsumer = require('../messaging/rabbitmqConsumer');


const usuarioRepository = new UsuarioRepository({ UsuarioModel, RolModel });

(async () => {
  const rabbitMQConsumer = new RabbitMQConsumer({ usuarioRepository });

  try {
    await rabbitMQConsumer.connect();  // Conectar al servidor RabbitMQ
    await rabbitMQConsumer.consume(async (messageContent) => {
      // Process the message and return a value
      const result = 'Correcto';
  
      // Do something with the result, like updating a database or returning it to a service
      return result;
    });
      
    console.log('RabbitMQ consumer started');
  } catch (err) {
    console.error('Failed to start RabbitMQ consumer:', err);
  }
})();


exports.registrar = async (req, res) => {
  try {
    const usaurioData = req.body;
    const registrarUsuario = new RegistrarUsuario(usuarioRepository);
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

exports.obtener = async (req, res) => {
  try {
    const { correo } = req.body; // Obtener el ID de los parámetros de la ruta
    const registrarUsuario = new RegistrarUsuario(usuarioRepository);
    const usuario = await registrarUsuario.getUserMail(correo);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ "respuesta" : 1, "nombres": usuario.nombre, "rol": "usuario" });
    //res.json(100, usuario.nombre, usuario.roles);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const iniciarSesion = new IniciarSesion(usuarioRepository);
    const token = await iniciarSesion.execute(correo, contraseña);
    res.status(200).json({ "access_token" : token,  
      "expires_in": Number(process.env.TOKEN_TIME),
      "token_type": 'Bearer' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
