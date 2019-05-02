import React, { Component } from 'react'
import { Button, Input, Card, Form, Grid, Header, Image, Message, Segment, Divider, Icon, Checkbox } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.gif'
import background from '../assets/backgroundimg.jpg'
import NavBar from '../NavBar/NavBar.jsx'
import Home from '../Home/Home.jsx'
import Choices from '../Home/Choices.jsx'
import login from './Userfile.scss'
import Authentication from '../Authentication/Authentication.js'


class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {

            posts: []



        }



    }
    componentDidMount() {
        console.log(this.props);
        var uu = this.props.match.url.split('/');
        axios.get('http://localhost:4000/api/users/' + uu[2])
            .then((response) => {
                console.log(response);
                //  const user = update(this.state.user, { username: { $set: response.data.data.UserName } });
                // user = update(this.state.user, { email: { $set: response.data.data.Email } });

                //   console.log(this.state.user.UserName); // initial value


                //console.log(this.state.user.username);
                //console.log(response.data.data.UserName); // further value

                // this.state.user.username = response.data.data.UserName;
                let tmp = this.state;

                tmp.posts = response.data.data.MyPosts;

                this.setState(tmp);
                console.log(this.state)
                // console.log(this.state.user.username);



            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }




    render() {

        console.log("render");

        return (
            <div class="row clearfix">
                <ul class="row2tab clearfix">
                    <li><i class="fa fa-list-alt"></i> My posts </li>
                    <li><i class="fa fa-heart"></i> My Cars </li>
                    <li><i class="fa fa-car"></i> My Likes </li>
                    <li><i ></i> Rented Cars</li>


                </ul>
            </div>
        )
    }

}





export default MyPosts
