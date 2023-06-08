import { FastifyPluginCallback } from 'fastify';
import usuariosController from '../controllers/usuariosController';
import fp from 'fastify-plugin';

const usuariosRoutes: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post('/usuarios', usuariosController.criarUsuario);
  fastify.delete('/usuarios/:id', usuariosController.excluirUsuario);
  fastify.put('/usuarios/:id', usuariosController.atualizarUsuario);
  fastify.get('/usuarios', usuariosController.listarUsuarios);
  done();
}

export default fp(usuariosRoutes, { name: 'usuariosRoutes' });
