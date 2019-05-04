import React, { Component } from "react";
import ListBox_2 from "./ListBox_2.jsx";
import { SearchResult } from "semantic-ui-react";
import axios from 'axios'
class RightInfo extends Component {
  /*
    constructor(props) {
      super(props);
    }
  */
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      isDetail: false,
      cpId: "",
      searchResult: []
    }

    // this.viewDetails = this.viewDetails.bind(this);

  }

  componentDidMount() {
    console.log(this.props.curPost._id);
    axios.get('http://localhost:4000/api/posts?limit=3')
      .then((response) => {
        console.log(response);
        //  const user = update(this.state.user, { username: { $set: response.data.data.UserName } });
        // user = update(this.state.user, { email: { $set: response.data.data.Email } });

        //   console.log(this.state.user.UserName); // initial value

        //console.log(this.state.user.username);
        //console.log(response.data.data.UserName); // further value

        // this.state.user.username = response.data.data.UserName;
        let predata = [];
        console.log(response.data.data);
        // console.log(this.state.user.LikedCars)
        // console.log(this.state.user.username);
        predata = response.data.data;
        let afterdata = [];
        for (var i = 0; i < predata.length; i++) {
          if (predata[i]._id == this.props.curPost._id) {
            continue;
          }
          afterdata.push(predata[i]);

        }
        console.log(afterdata);
        this.setState({
          searchResult: afterdata,
          cpId: this.props.curPost._id
        });


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });


  }


  componentDidUpdate() {
    console.log(this.props.curPost._id);
    axios.get('http://localhost:4000/api/posts?limit=3')
      .then((response) => {
        console.log(response);
        //  const user = update(this.state.user, { username: { $set: response.data.data.UserName } });
        // user = update(this.state.user, { email: { $set: response.data.data.Email } });

        //   console.log(this.state.user.UserName); // initial value

        //console.log(this.state.user.username);
        //console.log(response.data.data.UserName); // further value

        // this.state.user.username = response.data.data.UserName;
        let predata = [];
        console.log(response.data.data);
        // console.log(this.state.user.LikedCars)
        // console.log(this.state.user.username);
        predata = response.data.data;
        let afterdata = [];
        for (var i = 0; i < predata.length; i++) {
          if (predata[i]._id == this.props.curPost._id) {
            continue;
          }
          afterdata.push(predata[i]);

        }
        console.log(afterdata);
        this.setState({
          searchResult: afterdata,
          cpId: this.props.curPost._id
        });


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });


  }

  // viewDetails(e, post) {
  //   this.setState({
  //     isDetail: !this.state.isDetail,
  //     currtPost: post
  //   });
  // }


  render() {
    /*

  */
    return (
      <div className="rightinfo-container">
        <div className="yellow-box">
          <h5 style={{fontSize: "1.3vw"}}>OTHER CAR YOU MAY LIKE NEARBY</h5>
          <ListBox_2
            cardinfo={this.state.searchResult}
            viewDetails={this.props.viewDetails}
          />
        </div>
      </div>
    );
  }
}

export default RightInfo;
