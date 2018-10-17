import React, { Component } from 'react';

import Services from './components/services/services';
import Quotes from './components/quotes/quotes';
import ShareQuote from './components/quotes/shareQuote';


import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.css";
import './App.css';

import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Quotes}/>
            <Route path='/services' component={Services}/>
            <Route exact path={`/shareQuote/:id`} component={ShareQuote}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;