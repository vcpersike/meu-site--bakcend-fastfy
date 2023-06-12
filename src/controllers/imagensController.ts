import { FastifyRequest, FastifyReply } from "fastify";
import UploadImagem from "../models/uploadImagensModel";
import { firebase, storageRef } from "../services/firebase";
import { getStorage, ref, uploadBytes } from "@firebase/storage";

const db = firebase.firestore();

const storage = getStorage();
const imagesRef = ref(storage, "meusite-2a728.appspot.com/uploadImageTeste");

function generateCustomId(): string {
  const firebaseId = db.collection("imagens").doc().id;
  return `I${firebaseId}ENS`;
}

async function verificarECriarColecaoImagens() {
  const collectionRef = db.collection("imagens");
  const collectionSnapshot = await collectionRef.limit(1).get();

  if (collectionSnapshot.empty) {
    await collectionRef.doc().set({});
  }
}

//createfunction uploadImage firebaseStorage gs://meusite-2a728.appspot.com/uploadImageTeste

// async function uploadFile(request: FastifyRequest, reply: FastifyReply) {

//   await verificarECriarColecaoImagens();
//   await generateCustomId();
//   try {
//     const { file } = request.body as UploadImagem;
//     const { name, data } = file;
//     const customId = generateCustomId();
//     const fileRef = storageRef.fullPath(`${customId}-${name}`);
//     const snapshot = await uploadBytes(fileRef, data);
//     const url = await snapshot.ref.getDownloadURL();
//     const imagem: UploadImagem = {
//       id: customId,
//       name,
//       url,
//     };
//     await db.collection("uploadImagens").doc(customId).set(imagem);
//     reply.code(201).send(imagem);
//   } catch (error) {
//     console.error("Erro ao fazer upload da imagem:", error);
//     reply.code(500).send("Erro ao fazer upload da imagem.");
//   }
// }

async function obterImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;
    const doc = await db.collection("uploadImagens").doc(id).get();
    if (!doc.exists) {
      reply.code(404).send("Imagem não encontrada.");
      return;
    }
    const imagem = doc.data() as UploadImagem;
    reply.code(200).send(imagem);
  } catch (error) {
    console.error("Erro ao obter a imagem:", error);
    reply.code(500).send("Erro ao obter a imagem.");
  }
}

async function atualizarImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;
    const data: Partial<UploadImagem> = request.body as UploadImagem;
    const doc = await db.collection("uploadImagens").doc(id).get();
    if (!doc.exists) {
      reply.code(404).send("Imagem não encontrada.");
      return;
    }
    await db.collection("uploadImagens").doc(id).update(data);
    reply.code(200).send("Imagem atualizada com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar a imagem:", error);
    reply.code(500).send("Erro ao atualizar a imagem.");
  }
}

async function excluirImagem(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as UploadImagem;
    const doc = await db.collection("uploadImagens").doc(id).get();
    if (!doc.exists) {
      reply.code(404).send("Imagem não encontrada.");
      return;
    }
    await db.collection("uploadImagens").doc(id).delete();
    reply.code(200).send("Imagem excluída com sucesso.");
  } catch (error) {
    console.error("Erro ao excluir a imagem:", error);
    reply.code(500).send("Erro ao excluir a imagem.");
  }
}

async function listarImagens(_: FastifyRequest, reply: FastifyReply) {
  try {
    const querySnapshot = await db.collection("uploadImagens").get();
    const imagens: UploadImagem[] = [];
    querySnapshot.forEach((doc) => {
      const imagem = doc.data() as UploadImagem;
      imagens.push(imagem);
    });
    reply.code(200).send(imagens);
  } catch (error) {
    console.error("Erro ao listar as imagens:", error);
    reply.code(500).send("Erro ao listar as imagens.");
  }
}

export default {
  //uploadImage,
  obterImagem,
  listarImagens,
  atualizarImagem,
  excluirImagem,
};
