import React, { Component } from 'react'
import { Button, Input,Card, Form, Grid, Header, Image, Message, Segment, Divider, Icon, Checkbox, Dropdown} from 'semantic-ui-react'
import { Link,Redirect } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo.gif'
import background from '../assets/backgroundimg.jpg'
import NavBar from '../NavBar/NavBar.jsx'
import Home from '../Home/Home.jsx'
import Choices from '../Home/Choices.jsx'
import  Authentication  from '../Authentication/Authentication.js'
import addcar from './addcar.scss'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

const options = [
  { key: 'C', text: 'Champaign', value: 'Champaign' },
  { key: 'U', text: 'Urbana', value: 'Urbana' },
  { key: 'S', text: 'Savoy', value: 'Savoy' }
]

class AddPost extends Component {
      constructor(props){
        super(props);

        this.state ={
            car:{
                startdate:'',
                enddate:'',
                pickuplocation:'',
                brand:'',
                capacity:'',
                VID:'',
                username:Authentication.getUsername(),
                email:'',
                priceperday:'',
                priceperhour:''
            }
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCapacity = this.onChangeCapacity.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
        this.onChangePricePerHour = this.onChangePricePerHour.bind(this)
        this.onChangePricePerDay = this.onChangePricePerDay.bind(this)

      }

      onSubmit(event){
        console.log(this.state)
        event.preventDefault();

        axios.post('http://localhost:4000/api/posts/createPost', {
          UserId:this.state.car.username,
          Capacity: this.state.car.capacity,
          StartDate:this.state.car.startdate,
          EndDate:this.state.car.enddate,
          PricePerDay:this.state.car.priceperday,
          PricePerHour:this.state.car.priceperhour
          //Picture:this.state.car.picture
        })
        .then((response) => {
          console.log("Add your car successfully")
          console.log(response);
          this.props.history.push( '/',null)
        })
        .catch(function (error) {
          console.log("Unable to Add")
          console.log(error);
        });
      }

      handleStartChange(date){
        const car = this.state.car;
        car.startdate = date;
        this.setState({
          car
        })
      }

      handleEndChange (date) {
        const car = this.state.car;
        car.enddate = moment(date).format("YYYY-MM-DD");
        this.setState({
          car
        })
      }

      onChangeCapacity(event,value){
        const car = this.state.car;
        car.capacity = value.value;
        this.setState({
          car
        })
      }

      onChangePricePerHour(event) {
        const car = this.state.car;
        car.priceperhour = event.target.value
        this.setState({
          car
        })
      }

      onChangePricePerDay(event) {
        const car = this.state.car;
        car.priceperday = event.target.value
        this.setState({
          car
        })
      }


      render() {
        if(!Authentication.isLoggedIn()){
            return(
              <Redirect to = {
                {
                  pathname:'/login',
                  state:{isLoggedIn:false}
                }
              }/>
            )
        } else{
            return (
              <div>
                    <NavBar/>
                    <img className = "addcarBackgroundimg" src = {background}/>
                    <div className = "addpostBox">
                            <Header as='h2' textAlign='center' color = 'black'>
                            <Icon name = 'car'/>Share Your Car!
                            </Header>
                            <Form size='large' onSubmit={this.onSubmit}>
                              <div className = "post-block">
                                <Form.Field>
                                  <label>Pickup Date: </label>
                                  <DayPickerInput

                                      placeholder='Pick-up  Date'
                                      // value={this.state.startDate}
                                      onDayChange={this.handleStartChange}
                                      dayPickerProps={{
                                          month: new Date(),
                                          showWeekNumbers: true,
                                          todayButton: 'Today',
                                      }}
                                      // style= {{margin: '0.2em 0 1em 0'}}
                                  />
                                </Form.Field>
                              </div>
                              <div className = "post-block">
                                <Form.Field >
                                    <label>Return Date: </label>
                                    <DayPickerInput

                                        placeholder='Return  Date'
                                        // value={this.state.endDate}
                                        onDayChange={this.handleEndChange}
                                        dayPickerProps={{
                                            month: new Date(),
                                            showWeekNumbers: true,
                                            todayButton: 'Today',
                                        }}
                                        // style= {{margin: '0.2em 0 1em 0'}}
                                    />
                                </Form.Field>
                              </div>
                              <div className = "post-block">
                                <Form.Field >
                                    <label>Pickup Location: </label>
                                    <Form.Select options={options}  placeholder='Where to pick up' onChange={this.onChangeCapacity} required />
                                </Form.Field >
                              </div>
                              <div className = "post-block">
                                <Form.Field >
                                    <label>Price Per Hour($): </label>
                                    <input placeholder='Price Per Hour' onChange={this.onChangePricePerHour} required/>
                                </Form.Field>
                              </div>
                              <div className = "post-block">
                                <Form.Field >
                                    <label>Price Per Day($): </label>
                                    <input placeholder='Price Per Day' onChange={this.onChangePricePerDay} required/>
                                </Form.Field>
                              </div>
                              <p></p>
                                <Button color = 'black' fluid size='large' type='submit'>Submit</Button>
                            </Form>
                    </div>
              </div>
            )
        }

      }

}

export default AddPost
