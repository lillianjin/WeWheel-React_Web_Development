import React, { Component } from 'react'
// import { Link } from './node_modules/react-router-dom'
import './NavBar.css';
import logo from '../assets/logo.gif'
import { faSignInAlt, faHome, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar,  Nav } from 'react-bootstrap';

class NavBar extends Component {

  render() {
      return(
        <div>
          <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand href="/">
              <img alt="logo" src={logo} width="30" height="30"
                className="logo"/>
              <p className="wewheel"> WeWheel</p>
            </Navbar.Brand>
            <Nav activeKey="/">
              <Nav.Item>
                <Nav.Link href="/">
                  <FontAwesomeIcon className="icon" icon={faHome} size="sm" />
                  {" HOME"}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signup">
                  <FontAwesomeIcon className="icon" icon={faSignInAlt} size="sm" />
                  {" LOGIN"}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">
                  <FontAwesomeIcon className="icon" icon={faUserPlus} size="sm" />
                  {" SIGNUP"}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
        </div>
      );  
  }
}

export default NavBar;
