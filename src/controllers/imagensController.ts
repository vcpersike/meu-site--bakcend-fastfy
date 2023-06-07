import { FastifyRequest, FastifyReply } from 'fastify';
import firebase from '../services/firebase';
import UploadImagem from '../models/uploadImagens';

// Obtendo a instância do Firestore
const db = firebase.firestore();

// Função para criar uma nova imagem
async function criarImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const imagem: UploadImagem = request.body as UploadImagem;

    // Gerando um ID único para a imagem
    const id = db.collection('uploadImagens').doc().id;

    // Definindo o ID e salvando a imagem no Firestore
    await db.collection('uploadImagens').doc(id).set(imagem);

    reply.code(201).send({ id });
  } catch (error) {
    console.error('Erro ao criar a imagem:', error);
    reply.code(500).send('Erro ao criar a imagem.');
  }
}

// Função para obter uma imagem pelo ID
async function obterImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;

    // Buscando a imagem no Firestore
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

// Função para atualizar uma imagem pelo ID
async function atualizarImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;
    const data: Partial<UploadImagem> = request.body as UploadImagem;

    // Verificando se a imagem existe
    const doc = await db.collection('uploadImagens').doc(id).get();

    if (!doc.exists) {
      reply.code(404).send('Imagem não encontrada.');
      return;
    }

    // Atualizando a imagem no Firestore
    await db.collection('uploadImagens').doc(id).update(data);

    reply.code(200).send('Imagem atualizada com sucesso.');
  } catch (error) {
    console.error('Erro ao atualizar a imagem:', error);
    reply.code(500).send('Erro ao atualizar a imagem.');
  }
}

// Função para excluir uma imagem pelo ID
async function excluirImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;

    // Verificando se a imagem existe
    const doc = await db.collection('uploadImagens').doc(id).get();

    if (!doc.exists) {
      reply.code(404).send('Imagem não encontrada.');
      return;
    }

    // Excluindo a imagem do Firestore
    await db.collection('uploadImagens').doc(id).delete();

    reply.code(200).send('Imagem excluída com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir a imagem:', error);
    reply.code(500).send('Erro ao excluir a imagem.');
  }
}

async function listarImagens(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Obtendo todas as imagens da coleção
    const querySnapshot = await db.collection('uploadImagens').get();

    // Criando um array para armazenar as imagens
    const imagens: UploadImagem[] = [];

    // Iterando sobre os documentos e adicionando as imagens ao array
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