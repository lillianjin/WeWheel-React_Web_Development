import React, { Component } from "react";
import { TextArea, Form, Button, Rating } from "semantic-ui-react";
import Axios from "axios";
import Authentication from "../Authentication/Authentication";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewContent: "",
      reviewList: []
    };
  }

  componentDidMount() {
    this.retrieveReviews();
  }

  retrieveReviews = () => {
    Axios.get(
      `http://localhost:4000/api/comments?where={"CarId": "${
        this.props.carId
      }"}`
    ).then(res => {
      let reviewList = [];
      res.data.data.map(reviewObject => {
        reviewList.push(reviewObject.Content);
      });
      this.setState({ reviewList: reviewList });
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRating = (e, { rating }) => {
    console.log("rating: " + rating);
    const ratingObject = {
      Content: rating,
      CarId: this.props.carId,
      UserId: Authentication.getUserId()
    };
    Axios.post("http://localhost:4000/api/rates/createRate", ratingObject);
  };

  handleSubmit = e => {
    const reviewContent = this.state.reviewContent;
    console.log("submit: " + reviewContent);
    // submit review
    const reviewObject = {
      Content: reviewContent,
      CarId: this.props.carId,
      UserId: Authentication.getUserId()
    };
    Axios.post(
      "http://localhost:4000/api/comments/createComment",
      reviewObject
    );
    // append current review to reviewList
    let reviewList = this.state.reviewList.slice();
    reviewList.push(reviewContent);
    this.setState({ reviewContent: "", reviewList: reviewList });
  };

  handleClear = e => {
    this.setState({ reviewContent: "" });
  };

  render() {
    const { reviewList } = this.state;

    return (
      <div className="review-container">
        <table
          className="ui fixed celled table"
          style={{ margin: "1em", width: "95%" }}
        >
          <thead>
            <tr>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {reviewList.map((review, i) => (
              <tr key={i}>
                <td>{review}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div className="review-form-container">
          <Form>
            <Rating
              onRate={this.handleRating}
              icon="star"
              size="huge"
              maxRating={5}
              style={{ margin: "1em 0" }}
            />
            <TextArea
              onChange={this.handleChange}
              value={this.state.reviewContent}
              name="reviewContent"
              placeholder="Write your review here!"
            />
            <div style={{ margin: "1em auto" }}>
              <Button
                onClick={this.handleSubmit}
                color="black"
                style={{ marginRight: "1em" }}
              >
                Submit
              </Button>
              <Button color="black" onClick={this.handleClear}>
                Clear
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Reviews;
