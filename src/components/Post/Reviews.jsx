import React, { Component } from "react";
import { TextArea, Form, Button, Rating } from "semantic-ui-react";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewContent: "",
      reviewList: [
        "this is 1st review content, this is review content, this is review\
      content, this is review content, this is review content, this is\
      review content, this is review content.",
        "this is 2nd review content, this is review content, this is review\
      content, this is review content, this is review content, this is\
      review content, this is review content."
      ]
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRating = (e, { rating }) => {
    console.log(rating);
  };

  handleSubmit = e => {
    let reviewContent = this.state.reviewContent;
    console.log(reviewContent);
    let reviewList = this.state.reviewList.slice();
    reviewList.push(reviewContent);
    this.setState({ reviewContent: "", reviewList: reviewList });
  };

  handleClear = e => {
    this.setState({ reviewContent: "" });
  };

  render() {
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
            {this.state.reviewList.map(review => (
              <tr>
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
                color="blue"
                style={{ marginRight: "1em" }}
              >
                Submit
              </Button>
              <Button color="blue" onClick={this.handleClear}>
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
