import React, { Component } from 'react'
// import { Link } from './node_modules/react-router-dom'
import card1 from '../assets/card1.jpg'
import card2 from '../assets/card2.jpg'
import { Row, Col, Card } from 'react-bootstrap';
import './Home.css'

class Choices extends Component {

  render() {
    return(
      <div>
        <div className="home-row">
          <Col xs={12} sm={6} md={5} className="home-col">
            <Card className="choice1">
              <Card.Body>
                <Card.Title>Rent a Car</Card.Title>
                <Card.Text>
                  Our car rental service provides any available cars at your area. You can explore all the sights. Find out how to get the best rates on your ideal vehicle.
                    </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={5} className="home-col">
            <Card className="choice2">
              <Card.Body>
                <Card.Title>Share a Car</Card.Title>
                <Card.Text>
                  Have an idle car at home? You can add the information of your car on WeWheel to maximize the value of your car. Start to be an owner today!
                    </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    );  
  }
}

export default Choices;
