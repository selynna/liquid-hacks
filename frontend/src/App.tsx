import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'

const Header = styled.h1`
  font-family: Valorant;
`

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/pickems">
        </Route>
        <Route path="/">
          <div className="App">
            <header className="App-header">
            <Header>Valorant But Fantasy Football</Header>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
