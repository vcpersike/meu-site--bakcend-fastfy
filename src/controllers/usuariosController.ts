import { FastifyRequest, FastifyReply } from 'fastify';
import Usuario from '../models/usuarioModel';
import firebase from '../services/firebase';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

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

async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { login, senha } = request.body as { login: string, senha: string };

    // Verificar se o usuário existe no banco de dados
    const snapshot = await db.collection('usuarios').where('login', '==', login).get();

    if (snapshot.empty) {
      reply.code(401).send('Usuário não encontrado ou senha inválida.');
      return;
    }

    const usuario = snapshot.docs[0].data();
    const senhaCorreta = senha === usuario.senha

    if (!senhaCorreta) {
      reply.code(401).send('Usuário não encontrado ou senha inválida.');
      return;
    }

    // Se a senha estiver correta, criar e retornar um token de acesso personalizado
    const token = criarTokenDeAcesso(snapshot.docs[0].id);

    reply.code(200).send({ token });
  } catch (error) {
    console.error('Erro ao verificar o usuário:', error);
    reply.code(500).send('Erro ao verificar o usuário.');
  }
}

function criarTokenDeAcesso(userId: string): string {
  // Defina as informações do payload do token
  const payload: JwtPayload = {
    sub: userId, // ID do usuário
    iat: Math.floor(Date.now() / 1000), // Timestamp de emissão do token
    // Outras informações do usuário, se necessário
  };

  // Defina a chave secreta para assinar o token
  const secretKey = process.env.JWT_SECRET_KEY as string;

  // Gere o token JWT
  const token = jwt.sign(payload, secretKey);

  return token;
}

async function criarUsuario(request: FastifyRequest, reply: FastifyReply) {
  try {
    console.log(request.body); // Verificar o conteúdo do objeto request.body

    await verificarECriarColecaoUsuarios();

    const { nome, email, login, senha, celular } = request.body as Usuario;
    const novoUsuario: Omit<Usuario, 'id'> = { nome, email, login, senha, celular };

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
    reply.code(500).send({ error: 'Erro ao listar usuários' });
  }
}

export default {
  criarUsuario,
  excluirUsuario,
  atualizarUsuario,
  listarUsuarios,
  login
};
