import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import usuariosRoutes from './routes/usuarios';
import uploadAudioroutes from './routes/uploudAudio';
import imagensRoutes from './routes/imagens';
import simplesRoutes from './routes/rotasSimples';
import dotenv from 'dotenv';

dotenv.config();
export const app: FastifyInstance = fastify();

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(usuariosRoutes);
app.register(uploadAudioroutes);
app.register(imagensRoutes);
app.register(simplesRoutes);

app.listen({
  port: 6001,
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});

