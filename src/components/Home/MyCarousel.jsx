import React, { Component } from 'react'
// import { Link } from './node_modules/react-router-dom'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'
import Carousel from 'react-bootstrap/Carousel'

class MyCarousel extends Component {
  constructor(){
    super();

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(i, temp) {
    this.setState({
      index: i,
      direction: temp.direction,
    });
  }

  render() {
    const { index, direction } = this.state;
    return(
      <div>
        <Carousel activeIndex={index} direction={direction} onSelect={this.handleSelect}>
          <Carousel.Item>
            <img className="d-block w-100"
              src={pic1} alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100"
              src={pic2} alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100"
              src={pic3} alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );  
  }
}

export default MyCarousel;
