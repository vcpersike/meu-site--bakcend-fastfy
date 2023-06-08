import { FastifyRequest, FastifyReply } from 'fastify';
import firebase from '../services/firebase';
import UploadAudio from '../models/uploadAudioModel';

const db = firebase.firestore();

async function createDocument(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { nome, caminho, tipo, tamanho, dataCriacao } = request.body as UploadAudio;
    const docRef = await db.collection('uploadAudio').add({
      nome,
      caminho,
      tipo,
      tamanho,
      dataCriacao
    });
    reply.code(201).send({ id: docRef.id });
  } catch (err) {
    console.error('Erro ao criar o documento:', err);
    reply.code(500).send('Erro ao criar o documento.');
  }
}

async function getDocument(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadAudio;
    const docRef = await db.collection('uploadAudio').doc(id).get();
    if (!docRef.exists) {
      reply.code(404).send('Documento não encontrado.');
      return;
    }
    const document = docRef.data();
    reply.send(document);
  } catch (err) {
    console.error('Erro ao ler o documento:', err);
    reply.code(500).send('Erro ao ler o documento.');
  }
}

async function updateDocument(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadAudio;
    const { nome, caminho, tipo, tamanho, dataCriacao } = request.body as UploadAudio;
    await db.collection('uploadAudio').doc(id).update({
      nome,
      caminho,
      tipo,
      tamanho,
      dataCriacao
    });
    reply.send('Documento atualizado com sucesso.');
  } catch (err) {
    console.error('Erro ao atualizar o documento:', err);
    reply.code(500).send('Erro ao atualizar o documento.');
  }
}

async function deleteDocument(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadAudio;
    await db.collection('uploadAudio').doc(id).delete();
    reply.send('Documento excluído com sucesso.');
  } catch (err) {
    console.error('Erro ao excluir o documento:', err);
    reply.code(500).send('Erro ao excluir o documento.');
  }
}

export default {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
}
