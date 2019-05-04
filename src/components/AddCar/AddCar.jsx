import React, { Component } from "react";
import {
  Button,
  Input,
  Card,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Divider,
  Icon,
  Checkbox,
  Dropdown
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.gif";
import background from "../assets/backgroundimg.jpg";
import NavBar from "../NavBar/NavBar.jsx";
import Home from "../Home/Home.jsx";
import Choices from "../Home/Choices.jsx";
import Authentication from "../Authentication/Authentication.js";
import addcar from "./addcar.scss";

const options = [
  { key: "2", text: "2 seats", value: "2" },
  { key: "5", text: "5 seats", value: "5" },
  { key: "7", text: "7 seats", value: "7" }
];

class AddCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {
        description: "",
        brand: "",
        capacity: "",
        VID: "",
        username: Authentication.getUsername(),
        email: "",
        picture: ""
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeVID = this.onChangeVID.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeDes = this.onChangeDes.bind(this);
    this.onSelectPic = this.onSelectPic.bind(this);
  }

  onSubmit(event) {
    console.log(this.state.car.picture);
    event.preventDefault();

    axios
      .post("http://54.161.49.214:4000/api/cars/createCar", {
        Brand: this.state.car.brand,
        Vid: this.state.car.VID,
        UserName: this.state.car.username,
        Description: this.state.car.description,
        Capacity: this.state.car.capacity,
        Picture: this.state.car.picture
      })
      .then(response => {
        console.log("Add your car successfully");
        console.log(response);
        alert("Add Car Successfully!");
        this.props.history.push("/profile", null);
      })
      .catch(function(error) {
        console.log("Unable to Add");
        console.log(error);
        alert("Faild to Add Car! Please Double Check");
        this.props.history.push("/addcar", null);
      });
  }

  onSelectPic(event) {
    const state = this.state;
    const car = this.state.car;
    var preview = document.querySelector("imageUpload");
    state.preview = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    //console.log(reader);
    reader.onload = function(e) {
      var base64 = reader.result;
      //console.log(base64)
      car.picture = base64;
      document.getElementById("imageContents").innerHTML =
        '<p><img width="100%" src="' + reader.result + '"/></p>';
    };
    this.setState({
      car
    });
  }
  onChangeBrand(event) {
    const car = this.state.car;
    car.brand = event.target.value;
    this.setState({
      car
    });
  }

  onChangeVID(event) {
    const car = this.state.car;
    car.VID = event.target.value;
    this.setState({
      car
    });
  }

  onChangeCapacity(event, result) {
    const car = this.state.car;
    car.capacity = result.value;
    this.setState({
      car
    });
  }

  onChangeDes(event) {
    const car = this.state.car;
    car.description = event.target.value;
    this.setState({
      car
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { isLoggedIn: false }
          }}
        />
      );
    } else {
      return (
        <div>
          <NavBar />
          <img className="addcarBackgroundimg" src={background} />
          <div className="addcarBox">
            <Header as="h2" textAlign="center" color="black">
              <Icon name="add circle" />
              Add Your Car!
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <div className="block">
                <Form.Field>
                  <label>Brand: </label>
                  <input
                    placeholder="Your Car Brand"
                    defaultValue={this.state.car.brand}
                    onChange={this.onChangeBrand}
                    required
                  />
                </Form.Field>
              </div>
              <div className="block">
                <Form.Field>
                  <label>VID: </label>
                  <input
                    placeholder="Your Car VID"
                    defaultValue={this.state.car.VID}
                    onChange={this.onChangeVID}
                    required
                  />
                </Form.Field>
              </div>
              <div className="block">
                <Form.Field>
                  <label>Capacity:</label>
                  <Form.Select
                    options={options}
                    placeholder="Capacity"
                    onChange={this.onChangeCapacity}
                    required
                  />
                </Form.Field>
              </div>
              <div className="block">
                <Form.Field>
                  <label>Description: </label>
                  <Form.TextArea
                    placeholder="Tell us more about your car..."
                    defaultValue={this.state.car.description}
                    onChange={this.onChangeDes}
                  />
                </Form.Field>
              </div>
              <div className="imageUpload">
                <Form.Field>
                  <label>Upload Image: </label>
                  <input type="file" onChange={this.onSelectPic} />
                </Form.Field>
              </div>
              <div id="imageContents" />
              <p />
              <Button color="black" size="large" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  }
}

export default AddCar;
