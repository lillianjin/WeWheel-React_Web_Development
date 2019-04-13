import React, { Component } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

// Include your new Components here
import Home from '../Home/Home.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';

class App extends Component {
  render() {
    return (
      <div id="root">
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route  path="/register" component={Register}/>
            <Route  path="/login" component={Login}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
