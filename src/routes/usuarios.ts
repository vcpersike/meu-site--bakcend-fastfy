import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import usuariosController from '../controllers/usuariosController';

export default function usuariosRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  fastify.post('/usuarios', usuariosController.criarUsuario);
  fastify.delete('/usuarios/:id', usuariosController.excluirUsuario);
  fastify.put('/usuarios/:id', usuariosController.atualizarUsuario);
  fastify.get('/usuarios', usuariosController.listarUsuarios);
  done();
}
