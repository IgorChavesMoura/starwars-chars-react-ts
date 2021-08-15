import uuid from 'react-uuid';

export class PersonagemData {
  id: string;
  nome: string;
  cor: string;

  constructor({ nome, cor }) {
    this.id = uuid();
    this.nome = nome;
    this.cor = cor;
  }
}
