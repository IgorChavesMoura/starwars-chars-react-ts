import React, { useState } from 'react';
import { render } from 'react-dom';
import ListaPersonagens from './components/lista-personagens/ListaPersonagens';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';

interface AppProps {}
interface AppState {
  navigation: string;
}

function App(props: AppProps) {
  const [appState, setAppState] = useState<AppState>({ navigation: 'list' });

  const onNavigationSwitchChange = () => {
    setAppState({
      ...appState,
      navigation: appState.navigation === 'list' ? 'grid' : 'list'
    });
  };

  return (
    <div>
      <header>
        <h1>Star Wars</h1>
        <span className="navigation-switch">
          <label className="switch">
            <input type="checkbox" onChange={onNavigationSwitchChange} />
            <span className="slider" />
          </label>
        </span>
      </header>
      <main>
        <ListaPersonagens mode={appState.navigation} />
      </main>
    </div>
  );
}

render(<App />, document.getElementById('root'));
