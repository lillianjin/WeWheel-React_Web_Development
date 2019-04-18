import React, { Component } from 'react'
import { Segment, Responsive, Form, Grid, Row, Col, Input, TextArea, Button, Select } from 'semantic-ui-react'
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class FilterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            location: "",
            seats: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }
     
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleStartChange = date => this.setState({ startDate: date })
    handleEndChange = date => this.setState({ endDate: date })


    render() {
        const locationOptions = [
            { key: 'ch', text: 'Champaign', value: 'Champaign' },
            { key: 'sa', text: 'Savoy', value: 'Savory' },
            { key: 'ur', text: 'Urbana', value: 'Urbana' },
        ]
        const seatsOptions = [
            { key: 'sm', text: '2 Seats', value: '2' },
            { key: 'md', text: '5 Seats', value: '5' },
            { key: 'lag', text: '7 Seats', value: '7' },
        ]
        console.log(this.state);
        return (
        <Responsive as={Segment} style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={12}>
                        <Form style={{padding: "2em 0"}}>
                            <div className="search-lab" >Pick-up Date</div>
                            <DayPickerInput
                                label="Pick-up Date"
                                placeholder='Pick-up  Date'
                                value={this.state.startDate}
                                onDayChange={this.handleStartChange}
                                dayPickerProps={{
                                    month: new Date(),
                                    showWeekNumbers: true,
                                    todayButton: 'Today',
                                }}
                                style= {{margin: '0.2em 0 1em 0'}}
                            />

                            <div className="search-lab">Return Date</div>
                            <DayPickerInput
                                label="Return Date"
                                placeholder='Return  Date'
                                value={this.state.endDate}
                                onDayChange={this.handleEndChange}
                                dayPickerProps={{
                                    month: new Date(),
                                    showWeekNumbers: true,
                                    todayButton: 'Today',
                                }}
                                style= {{margin: '0.2em 0 1em 0'}}
                            />
                            <div className="search-lab">Capacity</div>
                            <Form.Field
                                width={12}
                                control={Select}
                                options={seatsOptions}
                                label={{ htmlFor: 'filter-seats' }}
                                placeholder='Seats  Capacity'
                                search
                                searchInput={{ id: 'filter-seats' }}
                                value={this.state.seats}
                                name="seats"
                                onChange={this.handleChange}
                            />
                            <div className="search-lab">Location</div>
                            <Form.Field
                                width={12}
                                control={Select}
                                options={locationOptions}
                                label={{ htmlFor: 'filter-location' }}
                                placeholder='Pick-up  Location'
                                search
                                searchInput={{ id: 'filter-location' }}
                                value={this.state.location}
                                name="location"
                                onChange={this.handleChange}
                                style={{marginBottom: '0.8em'}}
                            />
                            <Form.Field
                                id='form-button-control-public'
                                control={Button}
                                content='SEARCH NOW'
                            />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Responsive>

        );
    }
}
export default FilterBox;
