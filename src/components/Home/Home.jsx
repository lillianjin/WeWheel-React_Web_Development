import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Home.css';
import PropTypes from 'prop-types';

import axios from 'axios'
import { faStar, faList, faImage, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Home extends Component {
  constructor(props){
    super(props);
  }

  render() {
      return(
        <div className='Home'>
          <div className='header'>
          <Link to = '/'>
            <img className="logo" src="assets/logo.jpg" alt="logo"></img>
          </Link>
          <h1 className='title'>WeWheel</h1>
          <div className="toggle-container">
            <Link to="/">
              <Button
                title="Gallery View"
                className={window.location.hash==='#/' ? "toggle-active toggle-button": "toggle-button"}>
                <FontAwesomeIcon className="toggle-icon" icon={faImage} size="2x" />
              </Button>
            </Link>
            <Link to="/list">
              <Button
                title="List View"
                className={window.location.hash==='#/list' ? "toggle-active toggle-button": "toggle-button"}>
              <FontAwesomeIcon className="toggle-icon" icon={faList} size="2x" />
              </Button>
            </Link>
          </div>
          </div>
        </div>
    )
  }

}

Home.propTypes = {

}

export default Home
