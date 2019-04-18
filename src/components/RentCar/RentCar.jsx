import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import FilterBox from './FilterBox.jsx';
import MapBox from './MapBox.jsx';
import './RentCar.scss';
import ToggleButton from 'react-toggle-button'


class RentCar extends Component {
  constructor() {
    super();
    this.state = { 
      toggleActive: true 
    };
    this.onToggle = this.onToggle.bind(this);
  }
 
  onToggle() {
    this.setState({ 
      toggleActive: !this.state.toggleActive 
    });
  }

  render() {
    const borderRadiusStyle = { borderRadius: 2 }

    return (
      <div>
        <NavBar />
        <div className="rent">
          <div className="search-box">
            <FilterBox />
          </div>
          <div className="toggle-label">
            Map View
          </div>
          <div className="toggle-box">
            <ToggleButton
              value={this.state.toggleActive}
              thumbStyle={borderRadiusStyle}
              trackStyle={borderRadiusStyle}
              onToggle={this.onToggle} 
            />
          </div>
          <div className="map">
            <MapBox />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}


export default RentCar;
