import { FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';
import firebase from '../services/firebase';

// Obtendo a instância do Firestore
const db = firebase.firestore();


// Função para buscar um usuário no GitHub
async function buscarUsuario(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { username } = request.params as any;

        // Fazendo a requisição à API do GitHub
        const response = await axios.get(`https://api.github.com/users/${username}`);

        // Salvando os dados do usuário no Firestore
        await db.collection('usuarios').doc(username).set(response.data);

        reply.code(200).send(response.data);
    } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
        reply.code(500).send('Erro ao buscar o usuário.');
    }
}

export default {
    buscarUsuario
}

