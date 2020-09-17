import React, { useEffect, useState } from 'react';
import './App.css';
import { LootWindow } from './features/loot-window/LootWindow';
import { ItemData } from './types/types';
import { Sidebar } from './features/sidebar/Sidebar';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { TaskSelector } from './features/task-selector/TaskSelector';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from './app/store';
import { NameState } from './builders/CharacterBuilder';
import { Bank } from './features/bank/Bank';
import { TaskList } from './features/task-list/TaskList';
import { Log } from './features/task-log/Log';
import { TaskTimer } from './features/TaskTimer/TaskTimer';
import { monsters } from "./monsters/"
import { itemMapToItemData } from './drop-simulator/DropSimulator';

const SingleCharacterView = () => { // pass components into this i think
  const ids: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);
  const { characterId } = useParams<{ characterId: string }>();

  const initla: ItemData[] = []
  const [loot, setLoot] = useState(initla)

  useEffect(() => {
    const { commanderZilyana, corporealBeast, chaosDruid } = monsters;


    console.time("Loot Sim")
    let loot3 = corporealBeast.getLoot(100)
    setLoot(itemMapToItemData(loot3))
    console.timeEnd("Loot Sim")

  }, [])

  if (ids[characterId] === undefined) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="middel-panel">
        <LootWindow bank={loot} />
        <Log />
        <TaskList />
        <Bank id={characterId} />
      </div>
      <TaskSelector />
    </div>
  );
};

const App = () => {

  useEffect(() => {

    //  console.table(testMonster.resultToNames(50));

  }, [])

  return (
    <div className="App">
      {/* <p>{JSON.stringify(loot2.map((item) => {
        return item.item
      }), null, 2)}</p> */}
      <TaskTimer />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <div className="middel-panel">
            some content
        </div>

        </Route>
        <Route path="/character/:characterId">
          <SingleCharacterView />
        </Route>
        <Route>
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
