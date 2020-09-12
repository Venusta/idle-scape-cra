import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { commanderZilyana } from './drop-simulator/CommanderZilyana';
import { LootWindow } from './features/loot-window/LootWindow';
import { ItemData } from './types/types';
import { corporealBeast } from './drop-simulator/CorporealBeast';

function App() {
  let loot: ItemData[] = []
  let loot2: ItemData[] = []
  console.time("Loot Sim")
  loot = commanderZilyana.kill(1000);
  console.timeEnd("Loot Sim")
  console.time("Loot Sim2")
  
  loot2 = corporealBeast.kill(1000);
  console.timeEnd("Loot Sim2")
  console.log(loot2);
  useEffect(() => {

    //  console.table(testMonster.resultToNames(50));
    
  }, [])



  return (
    <div className="App">
      {/* <p>{JSON.stringify(loot2.map((item) => {
        return item.item
      }), null, 2)}</p> */}
      <LootWindow bank={loot2} />
      <LootWindow bank={loot} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
