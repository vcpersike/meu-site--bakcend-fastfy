import { FastifyInstance } from 'fastify';
import buscaUsuarioGitController from '../controllers//buscaUsuarioGitController';

export default function simplesRoutes(app: FastifyInstance, opts: any, done: () => void) {
    app.get('/usuarios/:username', buscaUsuarioGitController.buscarUsuario);

    done();
}