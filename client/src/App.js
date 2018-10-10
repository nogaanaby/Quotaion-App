import React, { Component } from 'react';

import AppNavbar from './components/appNavbar';
import Services from './components/services/services';
import Quotes from './components/quotes/quotes';

import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.css";
import { Container } from 'reactstrap';
import './App.css';

import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Switch>
            <Route exact path='/' component={Quotes}/>
            <Route path='/services' component={Services}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
