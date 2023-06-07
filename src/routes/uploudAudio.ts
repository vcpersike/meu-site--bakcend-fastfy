import { FastifyInstance } from 'fastify';
import uploadAudioController from '../controllers/uploadAudioController';

export default function uploadAudioroutes(app: FastifyInstance, opts: any, done: () => void) {
  app.post('/documents', uploadAudioController.createDocument);
  app.get('/documents/:id', uploadAudioController.getDocument);
  app.put('/documents/:id', uploadAudioController.updateDocument);
  app.delete('/documents/:id', uploadAudioController.deleteDocument);

  done();
}


