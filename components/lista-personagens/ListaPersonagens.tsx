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

  const onRemovePersonagem = personagem => {
    setPersonagens(personagens.filter(p => p !== personagem));
  };

  useEffect(() => {
    swapi.getPeople().then(({ data }) => {
      const results = data.results.map(
        ({ name: nome, eye_color: cor }) => new PersonagemData({ nome, cor })
      );

      setPersonagens(results);
    });
  }, []);

  return (
    <div className="lista-personagens-container">
      <div className="lista-personagens-dropdown">
        <select placeholder="Selecione um personagem" >
          <option value="" selected ></option>
          {
            personagens.map(personagem => (
              <option value={personagem.id} >{ personagem.nome }</option>
            ))
          }
        </select>
        <button >
          <i className="fas fa-trash"></i>
        </button>
      </div>
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
