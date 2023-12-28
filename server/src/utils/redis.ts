import Redis from 'ioredis';

export const client = new Redis();

export const connectToRedis = () => {
  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
  });
};
