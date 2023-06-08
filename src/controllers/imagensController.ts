import { FastifyRequest, FastifyReply } from 'fastify';
import firebase from '../services/firebase';
import UploadImagem from '../models/uploadImagens';

const db = firebase.firestore();

async function criarImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const imagem: UploadImagem = request.body as UploadImagem;
    const id = db.collection('uploadImagens').doc().id;
    await db.collection('uploadImagens').doc(id).set(imagem);
    reply.code(201).send({ id });
  } catch (error) {
    console.error('Erro ao criar a imagem:', error);
    reply.code(500).send('Erro ao criar a imagem.');
  }
}

async function obterImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;
    const doc = await db.collection('uploadImagens').doc(id).get();
    if (!doc.exists) {
      reply.code(404).send('Imagem não encontrada.');
      return;
    }
    const imagem = doc.data() as UploadImagem;
    reply.code(200).send(imagem);
  } catch (error) {
    console.error('Erro ao obter a imagem:', error);
    reply.code(500).send('Erro ao obter a imagem.');
  }
}

async function atualizarImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;
    const data: Partial<UploadImagem> = request.body as UploadImagem;
    const doc = await db.collection('uploadImagens').doc(id).get();
    if (!doc.exists) {
      reply.code(404).send('Imagem não encontrada.');
      return;
    }
    await db.collection('uploadImagens').doc(id).update(data);
    reply.code(200).send('Imagem atualizada com sucesso.');
  } catch (error) {
    console.error('Erro ao atualizar a imagem:', error);
    reply.code(500).send('Erro ao atualizar a imagem.');
  }
}

async function excluirImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;
    const doc = await db.collection('uploadImagens').doc(id).get();
    if (!doc.exists) {
      reply.code(404).send('Imagem não encontrada.');
      return;
    }
    await db.collection('uploadImagens').doc(id).delete();
    reply.code(200).send('Imagem excluída com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir a imagem:', error);
    reply.code(500).send('Erro ao excluir a imagem.');
  }
}

async function listarImagens(_: FastifyRequest, reply: FastifyReply) {
  try {
    const querySnapshot = await db.collection('uploadImagens').get();
    const imagens: UploadImagem[] = [];
    querySnapshot.forEach((doc) => {
      const imagem = doc.data() as UploadImagem;
      imagens.push(imagem);
    });
    reply.code(200).send(imagens);
  } catch (error) {
    console.error('Erro ao listar as imagens:', error);
    reply.code(500).send('Erro ao listar as imagens.');
  }
}

export default {
  criarImagem,
  obterImagem,
  listarImagens,
  atualizarImagem,
  excluirImagem
}