import React, { useState, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { PersonagemData } from '../../model';

import { useSwapi } from '../../services/swapi.service';

import Personagem from './personagem/Personagem';

import './ListaPersonagens.scss';

interface ListaPersonagensProps {
  mode: string;
}

function ListaPersonagens(props: ListaPersonagensProps) {
  const { mode } = props;

  const swapi = useSwapi();

  const [personagens, setPersonagens] = useState<Array<PersonagemData>>([]);
  const [selectedPersonagemId, setSelectedPersonagemId] = useState<string>('');

  const onRemovePersonagem = personagem => {
    setPersonagens(personagens.filter(p => p !== personagem));
  };

  const onRemoveSelectedPersonagem = () => {
    if (!!selectedPersonagemId) {
      setPersonagens(
        personagens.filter(({ id }) => id !== selectedPersonagemId)
      );
    }
  };

  const onSelectPersonagem = e => {
    setSelectedPersonagemId(e.target.value);
  };

  useEffect(() => {
    swapi.getPeople().then(({ data }) => {
      const results = data.results
        .map(
          ({ name: nome, eye_color: cor }) => new PersonagemData({ nome, cor })
        )
        .sort((p1, p2) => {
          if (p1.nome < p2.nome) {
            return -1;
          } else if (p1.nome > p2.nome) {
            return 1;
          }

          return 0;
        });

      setPersonagens(results);
    });
  }, []);

  return (
    <div className="lista-personagens-container">
      {personagens.length ? (
        <div className="lista-personagens-dropdown">
          <select
            placeholder="Selecione um personagem"
            onChange={onSelectPersonagem}
          >
            <option value="" selected />
            {personagens.map(personagem => (
              <option value={personagem.id}>{personagem.nome}</option>
            ))}
          </select>
          <button
            disabled={!selectedPersonagemId}
            onClick={onRemoveSelectedPersonagem}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      ) : (
        <div className="fa-3x">
          <i className="fas fa-sync fa-spin" />
        </div>
      )}
      <TransitionGroup className={`lista-personagens ${mode}`}>
        {personagens.map((personagem, index) => (
          <CSSTransition
            key={personagem.id}
            timeout={500 + (index + 1) * 0.05}
            classNames="personagem-item"
            unmountOnExit
          >
            <Personagem
              data={personagem}
              mode={mode}
              onRemove={() => onRemovePersonagem(personagem)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default ListaPersonagens;
