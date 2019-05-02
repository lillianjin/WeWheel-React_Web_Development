import React, { Component } from 'react'
import { Message, Segment, Responsive, Form, Grid, Row, Col, Input, TextArea, Button, Select } from 'semantic-ui-react'
// import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment'
import 'react-day-picker/lib/style.css';

class FilterBox extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     startDate: undefined,
        //     endDate: undefined,
        //     location: "",
        //     seats: ""
        // };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleStartChange = this.handleStartChange.bind(this);
        // this.handleEndChange = this.handleEndChange.bind(this);
    }
     
    // handleChange = (e, { name, value }) => {
    //     console.log(this.state);
    //     this.setState({ [name]: value })
    // }
    // handleStartChange = date => this.setState({ startDate: moment(date).format("YYYY-MM-DD") })
    // handleEndChange = date => this.setState({ endDate: moment(date).format("YYYY-MM-DD") })


    render() {
        const {handleChange, handleStartChange, handleEndChange, clickHandler, flags, total_res } = this.props;
        var showError = false;
        for (var i in flags) {
            if (flags[i] === true) {
                showError = true;
                break;
            }
        }
        // console.log(flags,showError);
        const locationOptions = [
            { key: 'all', text: 'All', value: '*' },
            { key: 'ch', text: 'Champaign', value: 'Champaign' },
            { key: 'sa', text: 'Savoy', value: 'Savoy' },
            { key: 'ur', text: 'Urbana', value: 'Urbana' },
        ];
        const seatsOptions = [
            { key: 'all', text: 'All', value: '*' },
            { key: 'sm', text: '2 Seats', value: '2' },
            { key: 'md', text: '5 Seats', value: '5' },
            { key: 'lag', text: '7 Seats', value: '7' },
        ];
        return (
        <Responsive as={Segment} style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={12}>
                        <Form style={{padding: "2em 0"}} className={showError===true ? "error" : "success"}>
                            <div className="search-lab" >Pick-up Date</div>
                            <Form.Field className={(flags.startflg===true || flags.dateflg===true) ? "error" : ""}>
                                <DayPickerInput
                                    label="Pick-up Date"
                                    placeholder='Pick-up  Date'
                                    // value={this.state.startDate}
                                    onDayChange={handleStartChange}
                                    dayPickerProps={{
                                        month: new Date(),
                                        showWeekNumbers: true,
                                        todayButton: 'Today',
                                    }}
                                    // style= {{margin: '0.2em 0 1em 0'}}
                                />
                            </Form.Field>
                            
                            <div className="search-lab">Return Date</div>
                            <Form.Field className={(flags.endflg===true || flags.dateflg===true) ? "error" : ""}>
                                <DayPickerInput
                                    label="Return Date"
                                    placeholder='Return  Date'
                                    // value={this.state.endDate}
                                    onDayChange={handleEndChange}
                                    dayPickerProps={{
                                        month: new Date(),
                                        showWeekNumbers: true,
                                        todayButton: 'Today',
                                    }}
                                    // style= {{margin: '0.2em 0 1em 0'}}
                                />
                            </Form.Field>
                            
                            <div className="search-lab">Capacity</div>
                            <Form.Field
                                className={flags.capacityflg===true ? "error" : ""}
                                width={12}
                                control={Select}
                                options={seatsOptions}
                                label={{ htmlFor: 'filter-seats' }}
                                placeholder='Seats  Capacity'
                                search
                                searchInput={{ id: 'filter-seats' }}
                                // value={this.state.seats}
                                name="seats"
                                onChange={handleChange}
                            />
                            <div className="search-lab">Location</div>
                            <Form.Field
                                className={flags.locationflg===true ? "error" : ""}
                                width={12}
                                control={Select}
                                options={locationOptions}
                                label={{ htmlFor: 'filter-location' }}
                                placeholder='Pick-up  Location'
                                search
                                searchInput={{ id: 'filter-location' }}
                                // value={this.state.location}
                                name="location"
                                onChange={handleChange}
                                style={{marginBottom: '0.8em'}}
                            />
                            <Message
                                error
                                header='Wrong Input'
                                content='Please check the required field and make sure that the start date is earlier than end date!'
                            />
                            <Message 
                                success 
                                header='Succeeded' 
                                content={"There are " + total_res + " choices nearby!"} />
                            <Button type='submit' onClick={clickHandler}>
                                SEARCH NOW
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Responsive>

        );
    }
}
export default FilterBox;
