import * as fs from 'node:fs';
import * as path from 'node:path';
import SQLiteCloud from 'sqlitecloud-sdk';

const docFilePath = path.resolve(__dirname, '../config/credenciais.json');
const docFile = fs.readFileSync(docFilePath, {
  encoding: 'utf-8',
});

const serviceAccount = JSON.parse(docFile);

var onErrorCallback = function (event: any, msg: any) {
  console.log("WebSocket onError callback:" + msg);
  console.log(event);
}
var onCloseCallback = function (msg: any) {
  console.log("WebSocket OnClose callback:" + msg);
}
var clientDb = new SQLiteCloud(serviceAccount.PROJECT_ID, serviceAccount.API_KEY, onErrorCallback, onCloseCallback)

export default clientDb