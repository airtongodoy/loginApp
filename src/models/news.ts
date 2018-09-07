import { Usuario } from './usuario';

export interface News {
  idNews: string,
  titulo: string,
  conteudo: string,
  dataNovidade: Date,
  usuarioCriacao: Usuario,
  dataValidade: Date,
  urlImagem: string
}
