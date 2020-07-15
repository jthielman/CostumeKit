import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import Home from '../components/pages/Home/Home';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <button className="btn btn-success">hey</button>
        <Home />
      </div>
    );
  }
}

export default App;
