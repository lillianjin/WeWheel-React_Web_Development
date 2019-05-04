import React, { Component } from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import FilterBox from "./FilterBox.jsx";
import MapBox from "./MapBox.jsx";
import ListBox from "./ListBox.jsx";
import "./RentCar.scss";
import ToggleButton from "react-toggle-button";
import axios from "axios";
import moment from "moment";
import sortby from "sort-by";
import { Icon, Dropdown } from "semantic-ui-react";

import Post from "../Post/Post";

const options1 = [
  {
    key: "1",
    text: "Rating",
    value: "Car.Rating"
  },
  {
    key: "2",
    text: "Popularity",
    value: "Car.RentCount"
  },
  {
    key: "3",
    text: "Price Per Hour",
    value: "PricePerHour"
  },
  {
    key: "4",
    text: "Price Per Day",
    value: "PricePerDay"
  }
];
const options2 = [
  {
    key: "5",
    text: "Descending Order",
    value: "-",
    icon: "sort amount down"
  },
  {
    key: "6",
    text: "Ascending Order",
    value: "+",
    icon: "sort amount up"
  }
];

class RentCar extends Component {
  constructor() {
    super();
    this.state = {
      toggleActive: true, //mapView
      search_result: [],
      total_res: 0,
      startDate: "",
      endDate: "",
      location: "",
      seats: "",
      sortby: "Car.Rating",
      direction: "-",
      flags: {
        startflg: false,
        endflg: false,
        locationflg: false,
        capacityflg: false,
        dateflg: false
      },
      isDetail: false,
      currtPost: ""
    };

    this.onToggle = this.onToggle.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.searchAll = this.searchAll.bind(this);
    this.getUniqueValuesOfKey = this.getUniqueValuesOfKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.sort1 = this.sort1.bind(this);
    this.sort2 = this.sort2.bind(this);
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log(name, value, this.state);
  };

  handleStartChange = date =>
    this.setState({ startDate: moment(date).format("YYYY-MM-DD") });
  handleEndChange = date =>
    this.setState({ endDate: moment(date).format("YYYY-MM-DD") });

  // function of changing between the map view and list view
  onToggle() {
    this.setState({
      toggleActive: !this.state.toggleActive
    });
  }

  handleGoBack = e => {
    this.setState({
      isDetail: !this.state.isDetail,
      currtPost: ""
    });
  };

  viewDetails(e, post) {
    this.setState({
      isDetail: true,
      currtPost: post
    });
  }

  componentDidMount() {
    this.searchAll();
  }

  sort1 = (e, { name, value }) => {
    let data = this.state.search_result;
    data.sort(sortby(`${this.state.direction}${value}`, ""));
    this.setState({
      [name]: value,
      search_result: data
    });
  };

  sort2 = (e, { name, value }) => {
    let data = this.state.search_result;
    let dir = value === "+" ? "" : "-";
    data.sort(sortby(`${dir}${this.state.sortby}`, ""));
    this.setState({
      [name]: dir,
      search_result: data
    });
  };

  // Date input check
  checkInput(seats, location, startDate, endDate) {
    var startflg = false,
      endflg = false,
      locationflg = false,
      capacityflg = false,
      dateflg = false;

    if (startDate === "" || endDate === "") {
      if (startDate === "") {
        startflg = true;
      }
      if (endDate === "") {
        endflg = true;
      }
    } else {
      if (Date.parse(startDate) > Date.parse(endDate)) {
        dateflg = true;
      }
    }
    if (seats === "") {
      capacityflg = true;
    }
    if (location === "") {
      locationflg = true;
    }
    this.setState({
      flags: {
        startflg: startflg,
        endflg: endflg,
        locationflg: locationflg,
        capacityflg: capacityflg,
        dateflg: dateflg
      }
    });
    if (startflg || endflg || capacityflg || locationflg || dateflg) {
      return false;
    } else {
      return true;
    }
  }

  // click function when clicking submit
  clickHandler() {
    var seats = this.state.seats,
      location = this.state.location,
      startDate = this.state.startDate,
      endDate = this.state.endDate;
    if (this.checkInput(seats, location, startDate, endDate) === true) {
      axios
        .get(
          `http://54.161.49.214:4000/api/posts?Capacity=${seats}&Location=${location}&StartDate=${startDate}&EndDate=${endDate}`
        )
        .then(response => {
          let myData = response.data.data;
          myData.sort(
            sortby(`${this.state.direction}${this.state.sortby}`, "")
          );
          this.setState({
            search_result: myData,
            total_res: myData.length
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // search all results before the user do the filtering
  searchAll() {
    axios
      .get(`http://54.161.49.214:4000/api/posts`)
      .then(response => {
        // console.log(response.data.data);
        let myData = response.data.data;
        myData.sort(sortby(`${this.state.direction}${this.state.sortby}`, ""));
        this.setState({
          search_result: myData,
          total_res: response.data.data.length
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // get a list of locations that show in the search result
  getUniqueValuesOfKey(array, key) {
    return array.reduce(function(carry, item) {
      if (item[key] && !~carry.indexOf(item[key])) carry.push(item[key]);
      return carry;
    }, []);
  }

  render() {
    // console.log(this.state);
    const posts = this.state.search_result;
    const curPost = this.state.currtPost;

    const locations = this.getUniqueValuesOfKey(posts, "Location");
    let MapView = this.state.toggleActive;
    let isDetail = this.state.isDetail;

    if (!isDetail) {
      if (MapView) {
        return (
          <div>
            <NavBar />
            <div className="rent">
              <div className="search-box">
                <FilterBox
                  handleChange={this.handleChange}
                  handleStartChange={this.handleStartChange}
                  handleEndChange={this.handleEndChange}
                  clickHandler={this.clickHandler}
                  flags={this.state.flags}
                  total_res={this.state.total_res}
                />
              </div>
              <div className="sort-box">
                <Icon name="filter" />
                <span>
                  Sort Results By &nbsp;
                  <Dropdown
                    options={options1}
                    defaultValue={options1[0].value}
                    name="sortby"
                    onChange={this.sort1}
                  />
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  <Icon name="filter" />
                  <Dropdown
                    options={options2}
                    defaultValue={options2[0].value}
                    name="direction"
                    onChange={this.sort2}
                  />
                </span>
              </div>
              <div className="toggle-label">Map View</div>
              <div className="toggle-box">
                <ToggleButton
                  value={this.state.toggleActive}
                  thumbStyle={{ borderRadius: 2 }}
                  trackStyle={{ borderRadius: 2 }}
                  onToggle={this.onToggle}
                />
              </div>
              <div className="map">
                <MapBox
                  posts={this.state.search_result}
                  locations={locations}
                  onToggle={this.onToggle}
                />
              </div>
            </div>
            <Footer />
          </div>
        );
      } else {
        return (
          <div>
            <NavBar />
            <div className="rent">
              <div className="search-box">
                <FilterBox
                  handleChange={this.handleChange}
                  handleStartChange={this.handleStartChange}
                  handleEndChange={this.handleEndChange}
                  clickHandler={this.clickHandler}
                  flags={this.state.flags}
                  total_res={this.state.total_res}
                />
              </div>
              <div className="sort-box">
                <Icon name="filter" />
                <span>
                  Sort Results By &nbsp;
                  <Dropdown
                    options={options1}
                    defaultValue={options1[0].value}
                    name="sortby"
                    onChange={this.sort1}
                  />
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Icon name="filter" />
                <span>
                  <Dropdown
                    options={options2}
                    defaultValue={options2[0].value}
                    name="direction"
                    onChange={this.sort2}
                  />
                </span>
              </div>
              <div className="toggle-label">Map View</div>
              <div className="toggle-box">
                <ToggleButton
                  value={this.state.toggleActive}
                  thumbStyle={{ borderRadius: 2 }}
                  trackStyle={{ borderRadius: 2 }}
                  onToggle={this.onToggle}
                />
              </div>
              <div className="map">
                <ListBox
                  cardinfo={this.state.search_result}
                  viewDetails={this.viewDetails}
                />
              </div>
            </div>
            <Footer />
          </div>
        );
      }
    } else {
      return (
        <div>
          <NavBar />
          {/* <div className="rent" /> */}
          <Post
            curPost={curPost}
            handleGoBack={this.handleGoBack}
            viewDetails={this.viewDetails}
          />
          <Footer />
        </div>
      );
    }
  }
}

export default RentCar;
