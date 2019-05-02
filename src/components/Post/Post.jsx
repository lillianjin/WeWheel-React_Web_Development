import React, { Component } from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import PostInfo from "./PostInfo";
import Reviews from "./Reviews";
import RightInfo from "./RightInfo";

import "./Post.css";

class Posts extends Component {
  componentDidMount() {
    const index = this.props.match.params.index;
  }

  render() {
    return (
      <div>
        <NavBar />
        <div style={{ display: "flex" }}>
          <div style={{ width: "75%" }}>
            <PostInfo />
            <Reviews />
          </div>
          <RightInfo />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Posts;
