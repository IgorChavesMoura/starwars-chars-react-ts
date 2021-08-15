import React from 'react';
import { PersonagemData } from '../../../model';

import { isColor } from '../../../util';

import './Personagem.scss';

interface PersonagemProp {
  mode: string;
  data: PersonagemData;
  onRemove: Function;
}

const DEFAULT_COLOR = 'blue';

function Personagem(props: PersonagemProp) {
  const { mode, data, onRemove } = props;

  const onRemoveClick = () => {
    onRemove();
  };

  return (
    <div
      className={`personagem ${mode}`}
      style={{ color: isColor(data.cor) ? data.cor : DEFAULT_COLOR }}
    >
      <span className="personagem-nome">{data.nome}</span>
      <span className="remove-btn" onClick={onRemoveClick}>
        <i className="fas fa-times" />
      </span>
    </div>
  );
}

export default Personagem;
