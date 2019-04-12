import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css';
import logo from '../assets/logo.gif'
import { faSignInAlt, faHome, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends Component {

  render() {
      return(
        <div className='NavBar'>
          <div className='header'>
          <Link to = '/'>
            <img className="logo" src={logo} alt="logo"/>
          </Link>
          <h1 id='wewheel'>WeWheel</h1>
          <ul id="navbar">
            <li className="active">
              <FontAwesomeIcon className="icon" icon={faHome} size="sm" />
              <a href="#section1" id="nav1" className="nav">HOME</a>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faSignInAlt} size="sm" />
              <a href="#section2" id="nav2" className="nav">LOGIN</a>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faUserPlus} size="sm" />
              <a href="#section3" id="nav3" className="nav">SIGNUP</a>
            </li>
          </ul>
          </div>
        </div>
    )
  }

}


export default NavBar
