import { FastifyPluginCallback } from 'fastify';
import imagensController from '../controllers/imagensController';
import fp from 'fastify-plugin';

const imagensRoutes: FastifyPluginCallback = (fastify, _, done) => {
    fastify.post('/imagens', imagensController.criarImagem);
    fastify.get('/imagens/:id', imagensController.obterImagem);
    fastify.get('/imagens', imagensController.listarImagens);
    fastify.put('/imagens/:id', imagensController.atualizarImagem);
    fastify.delete('/imagens/:id', imagensController.excluirImagem);
    done()
}

export default fp(imagensRoutes, { name: 'imagensRoutes' });


