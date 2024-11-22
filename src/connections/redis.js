import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'redis',
  port: 6379,
  password: 'minha_senha_redis', 
});


redisClient.on('connect', () => {
  console.log('Conectado ao Redis com sucesso!');
});

redisClient.on('error', (err) => {
  console.error('Erro ao conectar ao Redis:', err);
});

export default redisClient;
