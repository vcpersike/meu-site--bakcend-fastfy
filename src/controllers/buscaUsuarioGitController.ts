import { FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';
import firebase from '../services/firebase';

const db = firebase.firestore();
const usuariosGitCollection = db.collection('usuariosgit');

async function buscarUsuario(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { username } = request.params as any;
        const response = await axios.get(`https://api.github.com/users/${username}`);

        // Verificar se a coleção 'usuariosgit' existe
        const collectionSnapshot = await usuariosGitCollection.get();
        if (collectionSnapshot.empty) {
            // A coleção não existe, então vamos criá-la
            await usuariosGitCollection.doc(); // Criar um documento vazio para criar a coleção
        }

        // Agora podemos salvar os dados do usuário na coleção existente
        await usuariosGitCollection.doc(username).set(response.data);

        reply.code(200).send(response.data);
    } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
        reply.code(500).send('Erro ao buscar o usuário.');
    }
}

async function recuperarUsuarios(_: FastifyRequest, reply: FastifyReply) {
    try {
        const usuariosSnapshot = await usuariosGitCollection.get();
        const usuarios = usuariosSnapshot.docs.map(doc => doc.data());

        reply.code(200).send({ usuarios });
    } catch (error) {
        console.error('Erro ao recuperar os usuários:', error);
        reply.code(500).send('Erro ao recuperar os usuários.');
    }
}

export default {
    buscarUsuario,
    recuperarUsuarios
}
