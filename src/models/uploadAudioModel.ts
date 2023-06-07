interface UploadAudio {
  id: string;
  nome: string;
  caminho: string;
  tipo: string;
  tamanho: number;
  dataCriacao: Date;
}

export default UploadAudio;