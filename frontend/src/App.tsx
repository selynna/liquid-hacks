import React from 'react';
import styled from 'styled-components'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Dashboard from 'pages/dashboard/Dashboard'
import TeamCreation from 'pages/pickems/TeamCreation'


const Header = styled.h1`
  font-family: Valorant;
`

const Header2 = styled.h2`
font-family: Tungsten-Bold;
`

const Text = styled.p`
font-family: OpenSans-Regular;
`

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
        </Route>
        <Route path="/pickems">
        </Route>
        <Route path="/">
          <div className="App">
            <header className="App-header">
            <Header>Valorant But Fantasy Football</Header>
              <img src={logo} className="App-logo" alt="logo" />
              <Header2>Section Header</Header2>
              <Text>
                Edit <code>src/App.tsx</code> and save to reload.
              </Text>
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
