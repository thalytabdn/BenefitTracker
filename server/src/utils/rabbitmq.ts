import amqp from 'amqplib';
import 'dotenv/config';

const amqpUrl = process.env.AMQP_URL || '';

let channel: amqp.Channel;

export const connectToQueue = async () => {
  try {
    const connection = await amqp.connect(amqpUrl);
    channel = await connection.createChannel();
    await channel.assertQueue('cpfQueue', { durable: true });
  } catch (error) {
    console.error('Error connecting to RabbitMQ');
  }
};

export const addToQueue = (cpf: string) => {
  try {
    channel.sendToQueue('cpfQueue', Buffer.from(cpf), { persistent: true });
    console.log('Added to RabbitMQ:', cpf);
  } catch (error) {
    console.error('Error adding to RabbitMQ');
  }
};
