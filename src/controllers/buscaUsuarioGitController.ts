import { FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';
import firebase from '../services/firebase';

const db = firebase.firestore();

async function buscarUsuario(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { username } = request.params as any;
        const response = await axios.get(`https://api.github.com/users/${username}`);
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

