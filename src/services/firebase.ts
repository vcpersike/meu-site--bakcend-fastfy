import * as admin from 'firebase-admin';
import * as fs from 'node:fs';
import * as path from 'node:path';


const docFilePath = path.resolve(__dirname, '../config/credenciais.json');
const docFile = fs.readFileSync(docFilePath, {
  encoding: 'utf-8',
});

const serviceAccount = JSON.parse(docFile);

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default firebase

