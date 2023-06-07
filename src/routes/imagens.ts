import { FastifyInstance } from 'fastify';
import imagensController from '../controllers/imagensController';

export default function imagensRoutes(fastify: FastifyInstance, _: any) {
    fastify.post('/imagens', imagensController.criarImagem);
    fastify.get('/imagens/:id', imagensController.obterImagem);
    fastify.get('/imagens', imagensController.listarImagens);
    fastify.put('/imagens/:id', imagensController.atualizarImagem);
    fastify.delete('/imagens/:id', imagensController.excluirImagem);
}
