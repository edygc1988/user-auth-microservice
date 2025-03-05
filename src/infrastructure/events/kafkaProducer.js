// Kafka Producer en el Microservicio de Registro de Empleados
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'employee-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:29092'], // Usa la variable de entorno o un valor por defecto
});

const producer = kafka.producer();

const startProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka Producer conectado');
  } catch (error) {
    console.error('Error al conectar el productor Kafka:', error);
    throw error; // Re-lanza el error para manejarlo en el llamador
  }
};

const sendEmployeeEvent = async (employeeData) => {  
  // Emitir el evento de registro de empleado
  await producer.send({
    topic: 'empleado-events',
    messages: [
      { value: JSON.stringify(employeeData) },
    ],
  });

  console.log('Evento de empleado enviado:', employeeData);
  await producer.disconnect();
};

const sendBossEvent = async (bossData) => {
  console.log(bossData);
  await producer.send({
      topic: 'jefe-events',
      messages: [{
        value: JSON.stringify(bossData)
      }],
  });
  console.log('Evento de jefe enviado:', bossData);
  await producer.disconnect();
}

const shutdownProducer = async () => {
  try {
    await producer.disconnect();
    console.log('Kafka Producer desconectado');
  } catch (error) {
    console.error('Error al desconectar el productor Kafka:', error);
  }
};


module.exports = { startProducer, sendEmployeeEvent, sendBossEvent, shutdownProducer };
