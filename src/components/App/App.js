import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Launch from '../Launch/Launch';
import Main from '../Main/Main';

import './App.scss';
import { FhirProvider } from '../../context/FhirContext';
import { StoreProvider } from '../../context/storeContext';

function App() {
  return (
    <Router>
      <div className="header"></div>
      <Switch>
        <Route path="/launch">
          <Launch />
        </Route>
        <Route path="/">
          <FhirProvider>
            <StoreProvider>
              <Main />
            </StoreProvider>
          </FhirProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
