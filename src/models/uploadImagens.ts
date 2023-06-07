interface UploadImagem {
  id: string;
  nome: string;
  caminho: string;
  tipo: string;
  tamanho: number;
  largura: number;
  altura: number;
  dataCriacao: Date;
}

export default UploadImagem