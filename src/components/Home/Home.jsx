import React, { Component } from 'react'
import './Home.css';
import NavBar from '../NavBar/NavBar.jsx';
import MyCarousel from './MyCarousel.jsx';
import Choices from './Choices.jsx';

class Home extends Component {

  render() {
      return(
        <div>
          <NavBar/>
          <MyCarousel/>
          <div className="home-bg-filter"></div>
          <h1 className="home-slogan">
          SHARE A CAR TODAY!
          </h1>
          <Choices/>
        </div>
    )
  }
}


export default Home;
