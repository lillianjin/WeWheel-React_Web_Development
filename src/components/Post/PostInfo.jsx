import React, { Component } from "react";
import { Button, Icon, Rating } from "semantic-ui-react";
import Axios from "axios";
import Authentication from "../Authentication/Authentication";

import Reviews from "./Reviews";

class PostInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: ""
    };
  }

  componentDidMount() {
    if (Authentication.getUserId() != "") {
      this.getUserInfo();
    }
  }

  // get user detail info from server
  getUserInfo = async () => {
    await Axios.get(
      `http://localhost:4000/api/users/${Authentication.getUserId()}`
    ).then(res => {
      const userInfo = res.data.data;
      this.setState({ userInfo: userInfo });
    });
  };

  handleBook = e => {
    const bookObject = {
      userId: Authentication.getUserId(),
      carId: this.props.curPost.CarId
    };
    Axios.post("http://localhost:4000/api/book/add", bookObject).then(doc => {
      alert("Book Succeed!");
    });
    let { userInfo } = this.state;
    userInfo.RentedCars.push(this.props.curPost.CarId);
    this.setState({ userInfo });
  };

  handleFavorite = e => {
    const favoriteObject = {
      userId: Authentication.getUserId(),
      carId: this.props.curPost.CarId
    };
    Axios.post("http://localhost:4000/api/favorite/add", favoriteObject).then(
      doc => {
        alert("Add to Favorite!");
      }
    );
    let { userInfo } = this.state;
    userInfo.LikedCars.push(this.props.curPost.CarId);
    this.setState({ userInfo });
  };

  render() {
    const curPost = this.props.curPost;
    const userInfo = this.state.userInfo;

    return (
      <div>
        <div className="postinfo-container">
          <div className="car-image-container">
            <img
              className="car-image"
              src={curPost.Car.Picture}
              alt="car image"
            />
          </div>
          <div className="car-detail-container">
            <div className="car-model-text">
              <strong>{curPost.Car.Brand}</strong>
              <Rating
                icon="star"
                defaultRating={curPost.Car.Rating}
                maxRating={5}
                disabled
                style={{ position: "absolute", right: "1em" }}
              />
            </div>
            <div className="car-price-text">
              <strong>${curPost.PricePerDay} RENT / PER DAY</strong>
              <br />
              <strong>${curPost.PricePerHour} RENT / PER HOUR</strong>
            </div>
            <hr />
            <div className="car-date">
              <strong>
                {curPost.StartDate} - {curPost.EndDate}
              </strong>
            </div>
            <hr />
            <div className="car-description">{curPost.Car.Description}</div>
            <hr />
            <div className="table-container">
              <table
                className="ui fixed celled table"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <td>
                      <Icon name="check square" color="yellow" />
                      <strong>Air Condition</strong>
                    </td>
                    <td>
                      <Icon name="check square" color="yellow" />
                      <strong>Diesel</strong>
                    </td>
                    <td>
                      <Icon name="check square" color="yellow" />
                      <strong>Auto</strong>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
            <hr />
            <div className="car-detail-button-container">
              {!userInfo ||
              (userInfo && userInfo.RentedCars.includes(curPost.CarId)) ? (
                <Button
                  disabled
                  color="black"
                  style={{ marginRight: "1em" }}
                  onClick={this.handleBook}
                >
                  Book It
                </Button>
              ) : (
                <Button
                  color="black"
                  style={{ marginRight: "1em" }}
                  onClick={this.handleBook}
                >
                  Book It
                </Button>
              )}
              {!userInfo ||
              (userInfo && userInfo.LikedCars.includes(curPost.CarId)) ? (
                <Button disabled color="black" onClick={this.handleFavorite}>
                  Favorites
                </Button>
              ) : (
                <Button color="black" onClick={this.handleFavorite}>
                  Favorites
                </Button>
              )}
            </div>
          </div>
        </div>
        <Reviews carId={curPost.CarId} userInfo={userInfo} />
      </div>
    );
  }
}

export default PostInfo;
