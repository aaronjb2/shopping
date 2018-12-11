import React, { Component } from 'react';
import {HashRouter, Route, Switch, Redirect,Link} from 'react-router-dom';
import Cart from './components/Cart.js';
import Shop from './components/Shop.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
      <div className ="App">
        <Switch>
          <Route exact path = '/' component = {Shop}/>
          <Route exact path = '/cart' component = {Cart}/>
        </Switch>
      </div>
      </HashRouter>
    );
  }
}

export default App;
