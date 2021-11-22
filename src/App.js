import { Header, Body } from './components'
import style from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { appContext, initialContext } from './context';
import React, { useState } from 'react';

function App() {

  const [appState, setAppState] = useState(initialContext)
  const value = { appState, setAppState }

  return (
    <appContext.Provider value={value}>
      <div className={style.app}>
        <Header className={style.header}></Header>
        <Body></Body>
      </div>
    </appContext.Provider>
    
  );
}

export default App;
