import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Wizard from './components/Wizards/Wizard';



class App extends Component {
  render() {
    return (
     
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/wizard/:step" component={Wizard} />
        </Switch>
      </Router>
      
    );
  }
}

export default App;
