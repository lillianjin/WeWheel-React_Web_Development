import React, { Component } from "react";
import PostInfo from "./PostInfo";
import Reviews from "./Reviews";
import RightInfo from "./RightInfo";
import "./Post.css";

import { Button } from "semantic-ui-react";

class Post extends Component {
  render() {
    return (
      <div>
        <Button
          color="black"
          style={{ marginTop: "1em", marginLeft: "1em" }}
          onClick={this.props.handleGoBack}
        >
          Go Back
        </Button>
        <div style={{ display: "flex" }}>
          <div style={{ width: "75%" }}>
            <PostInfo curPost={this.props.curPost} />
          </div>
          <RightInfo curPost = {this.props.curPost} viewDetails = {this.props.viewDetails}/>
        </div>
      </div>
    );
  }
}

export default Post;
