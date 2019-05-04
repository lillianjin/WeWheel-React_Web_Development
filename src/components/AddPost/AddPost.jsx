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
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";

const options = [
  { key: "C", text: "Champaign", value: "Champaign" },
  { key: "U", text: "Urbana", value: "Urbana" },
  { key: "S", text: "Savoy", value: "Savoy" },
  { key: "bd", text: "Bondville", value: "Bondville" },
  { key: "mr", text: "Mira", value: "Mira" }
];

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carlist: [],
      car: {
        id: "",
        startdate: "",
        enddate: "",
        pickuplocation: "",
        brand: "",
        capacity: "",
        vid: "",
        username: Authentication.getUsername(),
        email: "",
        priceperday: "",
        priceperhour: ""
      },
      start: undefined,
      end: undefined
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.onChangePricePerHour = this.onChangePricePerHour.bind(this);
    this.onChangePricePerDay = this.onChangePricePerDay.bind(this);
    this.onChangeCar = this.onChangeCar.bind(this);
  }

  componentDidMount() {
    var username = Authentication.getUsername();
    axios
      .get("http://54.161.49.214:4000/api/users/username/" + username)
      .then(response => {
        console.log(response.data.data);
        console.log(this.state);
        let tmp = this.state;
        window.carchoice = [];
        tmp.carlist = response.data.data[0].MyCars;
        tmp.car.email = response.data.data[0].Email;
        this.setState(tmp);

        for (var i = 0; i < tmp.carlist.length; i++) {
          axios
            .get("http://54.161.49.214:4000/api/car/" + tmp.carlist[i])
            .then(response => {
              var tempdata = response.data.data;
              window.carchoice.push({
                text: tempdata.Brand + " " + tempdata.Vid,
                value: tempdata
              });
            })
            .catch(function(error) {
              // handle error
              console.log(error);
            });
        }
        console.log(window.carchoice);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }

  onSubmit(event) {
    console.log(this.state);
    // let start = this.state.car.startdate;
    // let end = this.state.car.enddate;
    //
    // if (Date.parse(start) > Date.parse(end)){
    //     return ("Date does not matc")
    // }

    event.preventDefault();

    axios
      .post("http://54.161.49.214:4000/api/posts/createPost", {
        CarId: this.state.car.id,
        Capacity: parseInt(this.state.car.capacity),
        Location: this.state.car.pickuplocation,
        UserName: this.state.car.username,
        StartDate: this.state.car.startdate,
        EndDate: this.state.car.enddate,
        PricePerDay: this.state.car.priceperday,
        PricePerHour: this.state.car.priceperhour
        //Picture:this.state.car.picture
      })
      .then(response => {
        console.log("Add your car successfully");
        console.log(response);
        this.props.history.push("/profile", null);
      })
      .catch(function(error) {
        console.log("Unable to Add");
        console.log(error);
        alert("Failed to Sahre Your Car! Please double check!");
      });
  }

  handleStartChange(date) {
    const car = this.state.car;
    car.startdate = moment(date).format("YYYY-MM-DD");
    this.setState({
      car,
      start: date
    });
  }

  handleEndChange(date) {
    const car = this.state.car;
    car.enddate = moment(date).format("YYYY-MM-DD");
    this.setState({
      car,
      end: date
    });
  }
  onChangeCar(event, res) {
    const car = this.state.car;
    console.log(event);
    console.log(res);
    car.vid = res.value.Vid;
    car.brand = res.value.Brand;
    car.id = res.value._id;
    car.capacity = res.value.Capacity;
    console.log(car);
    this.setState({
      car
    });
  }

  onChangeLocation(event, res) {
    const car = this.state.car;
    console.log(event);
    console.log(res);
    car.pickuplocation = res.value;
    console.log(car);
    this.setState({
      car
    });
  }

  onChangePricePerHour(event) {
    const car = this.state.car;
    car.priceperhour = event.target.value;
    this.setState({
      car
    });
  }

  onChangePricePerDay(event) {
    const car = this.state.car;
    car.priceperday = event.target.value;
    this.setState({
      car
    });
  }

  render() {
    const start = this.state.start;
    const end = this.state.end;
    if (!Authentication.isLoggedIn()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { isLoggedIn: false }
          }}
        />
      );
    } else {
      return (
        <div>
          <NavBar />
          <img className="addcarBackgroundimg" src={background} />
          <div className="addpostBox">
            <Header as="h2" textAlign="center" color="black">
              <Icon name="car" />
              Share Your Car!
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <div className="post-block">
                <Form.Field>
                  <label>Car: </label>
                  <Form.Select
                    options={window.carchoice}
                    placeholder="Choose your car"
                    onChange={this.onChangeCar}
                    required
                  />
                </Form.Field>
              </div>
              <div className="post-block">
                <Form.Field>
                  <label>Pickup Date: </label>
                  <DayPickerInput
                    placeholder="Pick-up  Date"
                    // value={this.state.startDate}
                    onDayChange={this.handleStartChange}
                    dayPickerProps={{
                      disabledDays: { after: end },
                      month: new Date(),
                      showWeekNumbers: true,
                      todayButton: "Today"
                    }}
                    // style= {{margin: '0.2em 0 1em 0'}}
                  />
                </Form.Field>
              </div>
              <div className="post-block">
                <Form.Field>
                  <label>Return Date: </label>
                  <DayPickerInput
                    placeholder="Return  Date"
                    // value={this.state.endDate}
                    onDayChange={this.handleEndChange}
                    dayPickerProps={{
                      disabledDays: { before: start },
                      month: new Date(),
                      showWeekNumbers: true,
                      todayButton: "Today"
                    }}
                    // style= {{margin: '0.2em 0 1em 0'}}
                  />
                </Form.Field>
              </div>
              <div className="post-block">
                <Form.Field>
                  <label>Pickup Location: </label>
                  <Form.Select
                    options={options}
                    placeholder="Where to pick up"
                    onChange={this.onChangeLocation}
                    required
                  />
                </Form.Field>
              </div>
              <div className="post-block">
                <Form.Field>
                  <label>Price Per Hour($): </label>
                  <input
                    placeholder="Price Per Hour"
                    onChange={this.onChangePricePerHour}
                    required
                  />
                </Form.Field>
              </div>
              <div className="post-block">
                <Form.Field>
                  <label>Price Per Day($): </label>
                  <input
                    placeholder="Price Per Day"
                    onChange={this.onChangePricePerDay}
                    required
                  />
                </Form.Field>
              </div>
              <p />
              <Button color="black" fluid size="large" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  }
}

export default AddPost;
