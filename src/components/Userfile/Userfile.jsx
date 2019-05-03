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
import Post from '../Post/Post.jsx'
import FontAwesome from 'react-fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Footer from '../Footer/Footer.jsx';
import Postdetail from "../Post/Post.jsx";

//import 'font-awesome/css/font-awesome.min.css';

//import { Button, Image, Grid, Icon } from 'semantic-ui-react'

import ReactDOM from "react-dom";

var forEach = require('async-foreach').forEach;

class Userfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                userID: '',
                username: '',
                password: 'laal',
                email: '',
                MyCars: [],
                LikedCars: [],
                RentedCars: [],
                posts: [],
                renderList: []

            },
            postinfo: [],
            likedcarsinfo: [],
            rentedcarsinfo: [],
            mycarsinfo: [],
            isDetail: false,
            currtPost: {}

        }

        this.viewDetails = this.viewDetails.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    handleGoBack = e => {
        this.setState({
            isDetail: !this.state.isDetail,
            currtPost: ""
        });
    };
    componentDidMount() {
        //  console.log(this.props);

        var username = Authentication.getUsername();



        axios.get('http://localhost:4000/api/users/username/' + username)
            .then((response) => {
                console.log(response);
                //  const user = update(this.state.user, { username: { $set: response.data.data.UserName } });
                // user = update(this.state.user, { email: { $set: response.data.data.Email } });

                //   console.log(this.state.user.UserName); // initial value


                //console.log(this.state.user.username);
                //console.log(response.data.data.UserName); // further value

                // this.state.user.username = response.data.data.UserName;
                console.log(response.data.data);
                console.log(response.data.data[0].Email);
                let tmp = this.state;

                tmp.user.email = response.data.data[0].Email;
                tmp.user.username = response.data.data[0].UserName;
                tmp.user.MyCars = response.data.data[0].MyCars;
                tmp.user.LikedCars = response.data.data[0].LikedCars;
                tmp.user.RentedCars = response.data.data[0].RentedCars;
                tmp.user.posts = response.data.data[0].MyPosts;
                tmp.user.password = response.data.data[0].password;

                this.setState(tmp);
                // console.log(this.state.user.LikedCars)
                // console.log(this.state.user.username);



            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });


    }






    clickposts = () => {

        var curdata = [];
        let idlist = this.state.user.posts;
        if (idlist.length == 0) {
            var tmp = this.state;

            tmp.likedcarsinfo = [];
            tmp.rentedcarsinfo = [];
            tmp.mycarsinfo = [];
            tmp.postinfo = [];
            this.setState(tmp);
        }

        for (var i = 0; i < idlist.length; i++) {
            axios.get('http://localhost:4000/api/post/' + idlist[i])
                .then((response) => {
                    //   console.log(response);
                    //    cur_json: { item: response.data.data }
                    // console.log(this.state.user.LikedCars)
                    // console.log(this.state.user.username);


                    curdata.push(response.data.data);
                })
                .then(() => {
                    console.log(curdata.length);
                    if (curdata.length == idlist.length) {
                        var tmp = this.state;

                        tmp.likedcarsinfo = [];
                        tmp.rentedcarsinfo = [];
                        tmp.mycarsinfo = [];
                        tmp.postinfo = curdata;
                        this.setState(tmp);
                        console.log(curdata.length);
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        };
    }

    clickmycars = () => {

        var curdata = [];
        let idlist = this.state.user.MyCars;
        if (idlist.length == 0) {
            var tmp = this.state;

            tmp.likedcarsinfo = [];
            tmp.rentedcarsinfo = [];
            tmp.mycarsinfo = [];
            tmp.postinfo = [];
            this.setState(tmp);
        }

        for (var i = 0; i < idlist.length; i++) {
            axios.get('http://localhost:4000/api/car/' + idlist[i])
                .then((response) => {
                    //   console.log(response);
                    //    cur_json: { item: response.data.data }
                    // console.log(this.state.user.LikedCars)
                    // console.log(this.state.user.username);


                    curdata.push(response.data.data);
                })
                .then(() => {

                    if (curdata.length == idlist.length) {
                        var tmp = this.state;
                        tmp.mycarsinfo = curdata;
                        tmp.postinfo = [];
                        tmp.likedcarsinfo = [];
                        tmp.rentedcarsinfo = [];

                        this.setState(tmp);
                        console.log(curdata.length);
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        };
    }
    clickmylikes = () => {

        var curdata = [];
        let idlist = this.state.user.LikedCars;
        if (idlist.length == 0) {
            var tmp = this.state;

            tmp.likedcarsinfo = [];
            tmp.rentedcarsinfo = [];
            tmp.mycarsinfo = [];
            tmp.postinfo = [];
            this.setState(tmp);
        }

        for (var i = 0; i < idlist.length; i++) {
            axios.get('http://localhost:4000/api/car/' + idlist[i])
                .then((response) => {
                    //   console.log(response);
                    //    cur_json: { item: response.data.data }
                    // console.log(this.state.user.LikedCars)
                    // console.log(this.state.user.username);


                    curdata.push(response.data.data);
                })
                .then(() => {
                    console.log(curdata.length);
                    if (curdata.length == idlist.length) {
                        var tmp = this.state;
                        tmp.likedcarsinfo = curdata;
                        tmp.postinfo = [];

                        tmp.rentedcarsinfo = [];
                        tmp.mycarsinfo = [];
                        this.setState(tmp);
                        console.log(curdata.length);
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        };
    }

    clickrentedcars = () => {

        var curdata = [];
        let idlist = this.state.user.RentedCars;

        if (idlist.length == 0) {
            var tmp = this.state;

            tmp.likedcarsinfo = [];
            tmp.rentedcarsinfo = [];
            tmp.mycarsinfo = [];
            tmp.postinfo = [];
            this.setState(tmp);
        }
        for (var i = 0; i < idlist.length; i++) {
            axios.get('http://localhost:4000/api/car/' + idlist[i])
                .then((response) => {
                    //   console.log(response);
                    //    cur_json: { item: response.data.data }
                    // console.log(this.state.user.LikedCars)
                    // console.log(this.state.user.username);


                    curdata.push(response.data.data);
                })
                .then(() => {
                    console.log(curdata.length);
                    if (curdata.length == idlist.length) {
                        var tmp = this.state;
                        tmp.rentedcarsinfo = curdata;
                        tmp.postinfo = [];
                        tmp.likedcarsinfo = [];

                        tmp.mycarsinfo = [];
                        this.setState(tmp);
                        console.log(curdata.length);
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        };
    }

    viewDetails(e, post) {
        this.setState({
            isDetail: !this.state.isDetail,
            currtPost: post
        });
    }

    deletePost(e, card, username) {
        console.log(card._id)
        console.log(username)
        axios.delete('http://localhost:4000/api/post/' + card._id, { data: { UserName: username } })
            .then((response) => {
                console.log(response);
                console.log(this.state.postinfo)
                for(var i = 0; i < this.state.postinfo.length; i++){
                  if(response.data.data.CarId === this.state.postinfo[i].CarId){
                    this.state.postinfo.splice(i,1);
                    this.state.user.posts.splice(this.state.user.posts.indexOf(card._id),1)
                    break;
                  }
                }
                this.setState({Remainder:"Deletion Completed"});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }
    deletemycars(e, card, username) {
        console.log(card._id)
        console.log(username)
        axios.delete('http://localhost:4000/api/car/' + card._id, { data: { UserName: username } })
            .then((response) => {
                console.log(response);

            })
            .then(() => {
                this.forceUpdate();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }


    render() {

        console.log("render")
        console.log(this.state.user.posts);
        var postinfo = this.state.postinfo;
        var likedcarsinfo = this.state.likedcarsinfo;
        var rentedcarsinfo = this.state.rentedcarsinfo;
        var mycarsinfo = this.state.mycarsinfo;
        console.log(postinfo);
        const myposts = postinfo.map((card, i) => {


            return (
                <div className="ui card" style={{ maxWidth: '100%', minWidth: '100%', height: '20vw', left: '0%' }} key={"card" + i}>
                    <div className="content" style={{ padding: '0', height: '100%' }}>
                        <div className="ui items" style={{ height: '100%' }}>
                            <div className="item" style={{ height: '100%' }}>
                                <Image src={card.Car.Picture} style={{ height: "18vw", width: "auto", maxWidth: "60%", top: '1vw', left: '1vw' }} />
                                <div className="content" style={{ padding: '1vw 2vw' }}>
                                    <div className="header" style={{ margin: '0', fontSize: '2vw' }}>
                                        {card.Car.Brand}
                                    </div>
                                    <div className="meta" style={{ fontSize: '1.2vw', textAlign: "left", paddingLeft: "3vw", color: "#ff5959" }}>
                                        <span>
                                            {card.StartDate.substring(0, 10)}
                                            &nbsp; to &nbsp;
                                            {card.EndDate.substring(0, 10)}
                                        </span>
                                    </div>
                                    <div className="description" style={{ fontSize: '1.2vw', textAlign: "left", paddingLeft: "3vw" }}>
                                        <div>
                                            <b>Seats: &nbsp;</b>
                                            {new Array(card.Capacity || 1).fill(null).map((n, i) =>
                                                <Icon name="user outline" key={"capacity" + i} />)}
                                        </div>
                                        <div className="ui">
                                            <b>Location: &nbsp;</b>
                                            {card.Location}
                                        </div>
                                        <div className="ui">
                                            <b>Price:&nbsp;</b>
                                            <Icon name="dollar sign" />
                                            <b>{card.PricePerHour}</b>&nbsp;Per Hour
                                        <div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Icon name="dollar sign" />
                                                <b>{card.PricePerDay}</b>&nbsp;Per Day
                                        </div>
                                        </div>
                                        <div className="ui">
                                            <b>Rating:&nbsp;</b>{card.Car.Rating}/5
                                    </div>
                                        <div className="ui">
                                            <b>Rent Count:&nbsp;</b>
                                            {card.Car.RentCount}
                                        </div>
                                    </div>
                                    <div className="extra" style={{ textAlign: "right" }}>
                                        <Button color='vk' compact basic
                                            onClick={e => this.viewDetails(e, card)}
                                            name={card}
                                        >
                                            <Icon name='plus square outline' />
                                            View more
                                    </Button>
                                        <Button color='vk' compact basic
                                            onClick={e => this.deletePost(e, card, this.state.user.username)}
                                            name={card}
                                        >
                                            <Icon name='plus square outline' />
                                            Delete Post
                                    </Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });


        const mycars = mycarsinfo.map((card, i) => {
            console.log("lalala")
            // console.log(card);
            return (
                <div className="ui card" style={{ maxWidth: '100%', minWidth: '100%', height: '20vw', left: '0%', top: "0 vw" }} key={"card" + i}>
                    <div className="content" style={{ padding: '0', height: '100%' }}>
                        <div className="ui items" style={{ height: '100%' }}>
                            <div className="item" style={{ height: '100%' }}>
                                <Image src={card.Picture} style={{ height: "18vw", width: "auto", maxWidth: "60%", top: '1vw', left: '1vw' }} />
                                <div className="content" style={{ padding: '1vw 2vw' }}>
                                    <div className="header" style={{ margin: '0', fontSize: '2vw' }}>
                                        {card.Brand}
                                    </div>

                                    <div className="description" style={{ fontSize: '1.2vw', textAlign: "left", paddingLeft: "3vw" }}>
                                        <div>
                                            <b>Seats: &nbsp;</b>
                                            {new Array(card.Capacity || 1).fill(null).map((n, i) =>
                                                <Icon name="user outline" key={"capacity" + i} />)}
                                        </div>


                                        <div className="ui">
                                            <b>Rating:&nbsp;</b>{card.Rating}/5
                                    </div>
                                        <div className="ui">
                                            <b>Rent Count:&nbsp;</b>
                                            {card.RentCount}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        const likedcars = likedcarsinfo.map((card, i) => {
            console.log("lalala")
            // console.log(card);
            return (
                <div className="ui card" style={{ maxWidth: '100%', minWidth: '100%', height: '20vw', left: '0%' }} key={"card" + i}>
                    <div className="content" style={{ padding: '0', height: '100%' }}>
                        <div className="ui items" style={{ height: '100%' }}>
                            <div className="item" style={{ height: '100%' }}>
                                <Image src={card.Picture} style={{ height: "18vw", width: "auto", maxWidth: "60%", top: '1vw', left: '1vw' }} />
                                <div className="content" style={{ padding: '1vw 2vw' }}>
                                    <div className="header" style={{ margin: '0', fontSize: '2vw' }}>
                                        {card.Brand}
                                    </div>

                                    <div className="description" style={{ fontSize: '1.2vw', textAlign: "left", paddingLeft: "3vw" }}>
                                        <div>
                                            <b>Seats: &nbsp;</b>
                                            {new Array(card.Capacity || 1).fill(null).map((n, i) =>
                                                <Icon name="user outline" key={"capacity" + i} />)}
                                        </div>


                                        <div className="ui">
                                            <b>Rating:&nbsp;</b>{card.Rating}/5
                                    </div>
                                        <div className="ui">
                                            <b>Rent Count:&nbsp;</b>
                                            {card.RentCount}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        const rentedcars = rentedcarsinfo.map((card, i) => {
            console.log("lalala")
            // console.log(card);
            return (
                <div className="ui card" style={{ maxWidth: '100%', minWidth: '100%', height: '20vw', left: '0%' }} key={"card" + i}>
                    <div className="content" style={{ padding: '0', height: '100%' }}>
                        <div className="ui items" style={{ height: '100%' }}>
                            <div className="item" style={{ height: '100%' }}>
                                <Image src={card.Picture} style={{ height: "18vw", width: "auto", maxWidth: "60%", top: '1vw', left: '1vw' }} />
                                <div className="content" style={{ padding: '1vw 2vw' }}>
                                    <div className="header" style={{ margin: '0', fontSize: '2vw' }}>
                                        {card.Brand}
                                    </div>

                                    <div className="description" style={{ fontSize: '1.2vw', textAlign: "left", paddingLeft: "3vw" }}>
                                        <div>
                                            <b>Seats: &nbsp;</b>
                                            {new Array(card.Capacity || 1).fill(null).map((n, i) =>
                                                <Icon name="user outline" key={"capacity" + i} />)}
                                        </div>


                                        <div className="ui">
                                            <b>Rating:&nbsp;</b>{card.Rating}/5
                                    </div>
                                        <div className="ui">
                                            <b>Rent Count:&nbsp;</b>
                                            {card.RentCount}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        console.log(myposts);
        if (!this.state.isDetail) {

            console.log("render once");
            console.log(myposts);
            return (
                <div className="userFile">
                    <NavBar />
                    <img className="loginBackgroundimg_2" src={background} />
                    <div className="login-bg-filter_2" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <div class="usercontainer">
                        <div class="innerwrap">
                            <section class="section1 clearfix" style={{ width: "100%", height: "40vw" }}>
                                <div>
                                    <div class="row grid clearfix">
                                        <div class="col2 first">

                                            <h1 >{this.state.user.username}</h1>
                                            <p>{this.state.user.email}</p>

                                        </div>
                                        <div class="col2 last">
                                            <div class="grid clearfix">
                                                <div class="col3 first">

                                                    <h1>{this.state.user.posts.length}</h1>
                                                    <span>My Posts</span>
                                                </div>
                                                <div class="col3"><h1>{this.state.user.MyCars.length}</h1>
                                                    <span>My Cars</span></div>

                                                <div class="col3 last"><h1>{this.state.user.RentedCars.length}</h1>

                                                    <span>Rented Cars</span></div>
                                                <div class="col3 lastlast"><h1>{this.state.user.LikedCars.length}</h1>

                                                    <span>My Likes</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix">
                                        <ul class="row2tab clearfix">
                                            <li id="b1" onClick={this.clickposts}><i class="fa fa-list-alt"></i> My posts</li>
                                            <li id="b2" onClick={this.clickmycars}><i class="fa fa-car"></i> My Cars</li>
                                            <li id="b3" onClick={this.clickmylikes}><i class="fa fa-heart"></i> My Likes</li>
                                            <li id="b4" onClick={this.clickrentedcars}><i class="fa fa-car"></i> Rented Cars</li>

                                            <a href="#/addcar"> <li id="b5" ><i class="fa fa-plus"></i> Add car</li></a>
                                            < a href="#/addpost"><li id="b5"><i class="fa fa-bullhorn"></i> Share car</li></a>
                                        </ul>
                                    </div>

                                </div>

                            </section>
                            <section class="section2 clearfix" style={{ overflow: 'auto', postion: "fixed" }}>
                                <Grid divided style={{ margin: "0", padding: '0' }}>
                                    <Grid.Row style={{ margin: "0" }}>
                                        {myposts}
                                        {mycars}
                                        {likedcars}
                                        {rentedcars}
                                    </Grid.Row>
                                </Grid>
                            </section>
                        </div>
                    </div>
                </div >
            )


        }
        else {
            return (
                <div>
                    <NavBar />
                    <div >
                        <Postdetail curPost={this.state.currtPost} handleGoBack={this.handleGoBack} />
                    </div>
                    <Footer />
                </div>
            );
        }

    }


}

export default Userfile
