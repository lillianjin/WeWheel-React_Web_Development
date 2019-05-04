import React, { Component } from "react";
import { Button, Icon, Rating } from "semantic-ui-react";
import Axios from "axios";
import Authentication from "../Authentication/Authentication";

class PostInfo extends Component {
  handleBook = e => {
    const bookObject = {
      userId: Authentication.getUserId(),
      carId: this.props.curPost.CarId
    };
    Axios.post("http://localhost:4000/api/book/add", bookObject).then(doc => {
      alert("Book Succeed!");
    });
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
  };

  render() {
    const curPost = this.props.curPost;
    console.log(curPost);

    return (
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
              defaultRating={curPost.Car.Rating / curPost.Car.RentCount}
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
            <Button
              color="black"
              style={{ marginRight: "1em" }}
              onClick={this.handleBook}
            >
              Book It
            </Button>
            <Button color="black" onClick={this.handleFavorite}>
              Favorites
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostInfo;
