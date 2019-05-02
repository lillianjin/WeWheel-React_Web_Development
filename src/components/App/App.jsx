import React, { Component } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

// Include your new Components here
import Home from '../Home/Home.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import RentCar from '../RentCar/RentCar.jsx';
import Posts from '../Posts/Posts.jsx';
import AddCar from '../AddCar/AddCar.jsx';
import AddPost from '../AddPost/AddPost.jsx';

class App extends Component {
  render() {
    return (
      <div id="root">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/rent" component={RentCar}/>
            <Route exact path="/addcar" component={AddCar}/>
            <Route exact path="/addpost" component={AddPost}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
