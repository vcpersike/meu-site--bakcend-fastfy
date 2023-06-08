import { FastifyPluginCallback } from 'fastify';
import uploadAudioController from '../controllers/uploadAudioController';
import fp from 'fastify-plugin';

const uploadAudioroutes: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post('/documents', uploadAudioController.createDocument);
  fastify.get('/documents/:id', uploadAudioController.getDocument);
  fastify.put('/documents/:id', uploadAudioController.updateDocument);
  fastify.delete('/documents/:id', uploadAudioController.deleteDocument);
  done();
}

export default fp(uploadAudioroutes, { name: 'uploadAudioroutes' });


