import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import buscaUsuarioGitController from '../controllers//buscaUsuarioGitController';

const simplesRoutes: FastifyPluginCallback = (fastify, _, done) => {
    fastify.get('/usuarios/:username', buscaUsuarioGitController.buscarUsuario)
    done();
}
export default fp(simplesRoutes, { name: 'simplesRoutes' });

