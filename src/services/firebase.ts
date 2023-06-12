import * as admin from "firebase-admin";
import "firebase/storage";
import * as fs from "node:fs";
import * as path from "node:path";
import { getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";

const docFilePath = path.resolve(__dirname, "../config/credenciais.json");
const docFile = fs.readFileSync(docFilePath, {
  encoding: "utf-8",
});

const serviceAccount = JSON.parse(docFile);

const app = initializeApp(serviceAccount);

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const storage = getStorage(app);

const storageRef = ref(storage);

export { firebase, storage, storageRef };
