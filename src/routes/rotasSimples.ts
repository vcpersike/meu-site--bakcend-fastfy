import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import buscaUsuarioGitController from '../controllers//buscaUsuarioGitController';

const simplesRoutes: FastifyPluginCallback = (fastify, _, done) => {
    fastify.get('/usuariosgit/:username', buscaUsuarioGitController.buscarUsuario),
        fastify.get('/usuariosgit', buscaUsuarioGitController.recuperarUsuarios),

        done();
}
export default fp(simplesRoutes, { name: 'simplesRoutes' });

