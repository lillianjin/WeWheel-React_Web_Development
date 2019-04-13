import React, { Component } from 'react'
import { Button, Input,Card, Form, Grid, Header, Image, Message, Segment, Divider, Icon, Checkbox} from 'semantic-ui-react'
import { Link,Redirect } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.gif'
import background from '../assets/backgroundimg.jpg'
import NavBar from '../NavBar/NavBar.jsx'
import Home from '../Home/Home.jsx'
import Choices from '../Home/Choices.jsx'
import register from './register.scss'




class Register extends Component {
      constructor(props){
        super(props);

        this.state ={
            user:{
                username:'',
                password:'',
                email:''
            },
            isLoggedin:false,
            message:'',
            redirect:false,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeUserName = this.onChangeUserName.bind(this)

      }

      onSubmit(event){
        event.preventDefault();
        // create HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `UserName=${name}&Email=${email}&Password=${password}`;


      }

      onChangeEmail(event){
        const user = this.state.user;
        user.email = event.target.value;
        this.setState({
          user
        })
      }

      onChangePassword(event){
        const user = this.state.user;
        user.password = event.target.value;
        this.setState({
          user
        })
      }

      onChangeUserName(event){
        const user = this.state.user;
        user.username = event.target.value;
        this.setState({
          user
        })
      }

      render() {
        console.log("render")
        if(this.state.redirect){
            return(
              <Redirect to = {
                {
                  pathname:'/login',
                  state:{isLoggedIn:false}
                }
              }/>
            )
        } else{
            return (
              <div>
                    <NavBar isLoggedIn = {false}/>
                    <img className = "registerBackgroundimg" src = {background}/>
                    <div className = "registerBox">
                            <Header as='h2' textAlign='center' color = 'black'>
                            <Icon name = 'registered outline'/>Sign Up for WeWheel!
                            </Header>
                            <Form size='large' onSubmit={this.onSubmit}>
                                <Form.Field>
                                  <label>Email</label>
                                  <input placeholder='Your Email(Use for retrieve your password)' onChange={this.onChangeEmail} />
                                </Form.Field>
                                <Form.Field>
                                  <label>Username</label>
                                  <input placeholder='Your Username(Use for login)' onChange={this.onChangeUserName} />
                                </Form.Field>
                                <Form.Field>
                                  <label>Password</label>
                                  <input placeholder='Password(at least 6 characters)' onChange={this.onChangePassword} />
                                </Form.Field>
                                <Button color = 'black' fluid size='large' type='submit'>Sign Up</Button>
                            </Form>
                            <Message> Already a member? <Link to="/login">Login in here</Link> </Message>
                    </div>
              </div>
            )
        }

      }

}

export default Register
