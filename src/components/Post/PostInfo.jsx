import React, { Component } from "react";
import { Button, Icon, Rating } from "semantic-ui-react";

class PostInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="postinfo-container">
        <div className="car-image-container">
          <img
            className="car-image"
            src="https://cdn.motor1.com/images/mgl/9ANEb/s1/2019-bmw-3-series.jpg"
            alt="car image"
          />
        </div>
        <div className="car-detail-container">
          <div className="car-model-text">
            <strong>BMW Series 3</strong>
            <Rating
              icon="star"
              defaultRating={3}
              maxRating={5}
              disabled
              style={{ position: "absolute", right: "1em" }}
            />
          </div>
          <div className="car-price-text">
            <strong>$30 RENT / PER DAY</strong>
            <br />
            <strong>$10 RENT / PER HOUR</strong>
          </div>
          <hr />
          <div className="car-description">
            This is the sample description of the post. This is the sample
            description of the post. This is the sample description of the post.
            This is the sample description of the post.
          </div>
          <hr />
          <div className="table-container">
            <table
              className="ui fixed celled table"
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <td>
                    <Icon name="yellow check square" />
                    <strong>Air Condition</strong>
                  </td>
                  <td>
                    <Icon name="yellow check square" />
                    <strong>Diesel</strong>
                  </td>
                  <td>
                    <Icon name="yellow check square" />
                    <strong>Auto</strong>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <hr />
          <div className="car-detail-button-container">
            <Button color="black" style={{ marginRight: "1em" }}>
              Book It
            </Button>
            <Button color="black">Favorites</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PostInfo;
