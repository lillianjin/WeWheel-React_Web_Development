import React, { Component } from 'react'
import { Button, Input, Card, Form, Grid, Header, Image, Message, Segment, Divider, Icon, Checkbox } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.gif'
import background from '../assets/backgroundimg.jpg'
import NavBar from '../NavBar/NavBar.jsx'
import Home from '../Home/Home.jsx'
import Choices from '../Home/Choices.jsx'
import login from './login.scss'
import Footer from '../Footer/Footer.jsx';
import Authentication from '../Authentication/Authentication.js'



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
        email: ''
      },
      isLoggedin: false,
      message: '',
      redirect: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this)

  }

      onSubmit(event){
        event.preventDefault();
        // create HTTP body message
        axios.post('http://localhost:4000/api/users/login', {
          password: this.state.user.password,
          UserName:this.state.user.username
        })
        .then((response) => {
          console.log("Login successfully")
          console.log(response);
          this.setState({isLoggedin:true});
          Authentication.login(this.state.user.username)
          this.props.history.push( '/',null)
        })
        .catch((error) => {
          alert("Wrong Password!");
          console.log("Unable to login");
          console.log(error);
        });


  }

  onChangePassword(event) {
    const user = this.state.user;
    user.password = event.target.value;
    this.setState({
      user
    })
  }

  onChangeUserName(event) {
    const user = this.state.user;
    user.username = event.target.value;
    this.setState({
      user
    })
  }

  render() {
    console.log("render")
    if (this.state.redirect) {
      return (
        <Redirect to={
          {
            pathname: '/',
            state: { isLoggedIn: false }
          }
        } />
      )
    } else {
      return (
        <div>
          <NavBar isLoggedIn={false} />
          <img className="loginBackgroundimg" src={background} />
          <div className="login-bg-filter" />
          <div className="logInBox">
            <Header as='h2' textAlign='center' color='black'>
              <Icon name='sign in' />Login Your Account!
                            </Header>
            <Form size='large' onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Username</label>
                <input placeholder='Your Username' onChange={this.onChangeUserName} required />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" onChange={this.onChangePassword} required />
              </Form.Field>
              <Button color='black' fluid size='large' type='submit'>Log in</Button>
            </Form>
            <Message> Don't have an account? <Link to="/register">Sign up now!</Link> </Message>
            {/* <Message> Forget your password? <Link to="/register">Reset here!</Link> </Message> */}
          </div>
          <Footer />
        </div>

      )
    }

  }

}

export default Login
