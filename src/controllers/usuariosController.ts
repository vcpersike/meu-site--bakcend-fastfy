import { FastifyRequest, FastifyReply } from 'fastify';
import Usuario from '../models/usuarioModel';
import firebase from '../services/firebase';

const db = firebase.firestore();

function generateCustomId(): string {
  const firebaseId = db.collection('usuarios').doc().id;
  return `U${firebaseId}SER`;
}

async function verificarECriarColecaoUsuarios() {
  const collectionRef = db.collection('usuarios');
  const collectionSnapshot = await collectionRef.limit(1).get();

  if (collectionSnapshot.empty) {
    await collectionRef.doc().set({});
  }
}

async function criarUsuario(request: FastifyRequest, reply: FastifyReply) {
  try {
    await verificarECriarColecaoUsuarios();

    const { nome, email, senha } = request.body as Usuario;
    const novoUsuario: Omit<Usuario, 'id'> = { nome, email, senha };

    const customId = generateCustomId();
    const docRef = db.collection('usuarios').doc(customId);

    await docRef.set(novoUsuario);

    reply.code(201).send({ id: customId, ...novoUsuario });
  } catch (error) {
    reply.code(500).send({ error: 'Erro ao criar usuário' });
  }
}

async function excluirUsuario(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as Usuario;

    await db.collection('usuarios').doc(id).delete();

    reply.send({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    reply.code(500).send({ error: 'Erro ao excluir usuário' });
  }
}

async function atualizarUsuario(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as Usuario;
    const { nome, email, senha } = request.body as Usuario;

    await db.collection('usuarios').doc(id).update({ nome, email, senha });

    reply.send({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    reply.code(500).send({ error: 'Erro ao atualizar usuário' });
  }
}

async function listarUsuarios(_: FastifyRequest, reply: FastifyReply) {
  try {
    const usuariosSnapshot = await db.collection('usuarios').get();
    const usuarios: Usuario[] = [];

    usuariosSnapshot.forEach((doc) => {
      usuarios.push({ id: doc.id, ...doc.data() } as Usuario);
    });
    reply.send({ usuarios });
  } catch (error) {
    console.log(error)
    reply.code(500).send({ error: 'Erro ao listar usuários' });
  }
}

export default {
  criarUsuario,
  excluirUsuario,
  atualizarUsuario,
  listarUsuarios
};
