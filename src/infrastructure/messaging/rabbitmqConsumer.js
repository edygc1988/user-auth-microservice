const amqp = require('amqplib');
const ValidarSesion = require('../../domain/usecases/ValidarSesion');

class RabbitMQConsumer {
  constructor({ usuarioRepository }) {
    this.queue = 'usuarios';
    this.usuarioRepository = usuarioRepository;
  }

  async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
  }

  async consume(onMessageCallback) {
    if (!this.channel) await this.connect();

    this.channel.consume(this.queue, async (msg) => {
      if (msg !== null) {
        const usuarioData = JSON.parse(msg.content.toString());
        console.log("Prueba " + usuarioData.token + usuarioData.correo + usuarioData.contraseña);
        // Procesar el mensaje
        
        const validarSesion = new ValidarSesion(this.usuarioRepository);
        const result = await onMessageCallback(validarSesion.execute(usuarioData.correo, usuarioData.contraseña, usuarioData.token));
        console.log(result);
        //await this.authController.validarSesion(usuarioData);

        this.channel.ack(msg);
      }
    });
  }
}

module.exports = RabbitMQConsumer;
