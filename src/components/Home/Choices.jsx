import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Grid, Header } from 'semantic-ui-react'
import './Home.css'

class Choices extends Component {

  render() {
    return (
      <Segment style={{ padding: '0', marginTop: '0', marginBottom: '0', border: 'none' }}>
        <Grid celled='internally' columns='2' stackable>
          <Grid.Row textAlign='center' style={{ backgroundColor: '#52616b', margin: '0' }}>
            <Grid.Column style={{ marginTop: '2vw', marginBottom: '2vw' }}>
              <Link to='/rent'>
                <Header as='h3' style={{ fontSize: '3vw', marginBottom: '1.5vw', marginTop: '1vw', color: '#c9d6df', cursor: 'pointer' }}>
                  Rent a Car
                </Header>
              </Link>
              <p style={{ fontSize: '2vw', marginLeft: '2vw', marginRight: '2vw', color: '#f0f5f9' }}>Our car rental service provides any available cars at your area. You can explore all the sights. Find out how to get the best rates on your ideal vehicle.</p>
            </Grid.Column>
            <Grid.Column style={{ marginTop: '2vw', marginBottom: '2vw' }}>
              <Link to='/addpost'>
                <Header as='h3' style={{ fontSize: '3vw', marginBottom: '1.5vw', marginTop: '1vw', color: '#c9d6df', cursor: 'pointer' }}>
                  Share a Car
                </Header>
              </Link>
              <p style={{ fontSize: '2vw', marginLeft: '2vw', marginRight: '2vw', color: '#f0f5f9' }}>Have an idle car at home? You can add the information of your car on WeWheel to maximize the value of your car!</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Choices;
