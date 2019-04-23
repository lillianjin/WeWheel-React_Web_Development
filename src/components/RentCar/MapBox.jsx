import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Card, Image, Rating, Icon, Button} from 'semantic-ui-react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Map from './Map.jsx';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const locations = [
    { key: 'ch', name: 'Champaign', lat: '40.116329', lng: '-88.243523' },
    { key: 'sa', name: 'Savoy', lat: '40.069031', lng: '-88.253433' },
    { key: 'ur', name: 'Urbana', lat: '40.112461', lng: '-88.207458'  },
];

export class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            model_content: []
        };
        this.onMarkerClick=this.onMarkerClick.bind(this);
        this.onMarkerClose=this.onMarkerClose.bind(this);
        this.onInfoWindowOpen=this.onInfoWindowOpen.bind(this);
    };

    onMarkerClick = (props, marker, e) => {
        // console.log(this.props.posts);
        this.setState({
            showingInfoWindow: true,
            selectedPlace: props,
            activeMarker: marker,
        });
        let temp_content = [];
        let posts = this.props.posts;
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].Location === this.state.selectedPlace.name) {
            temp_content.push(posts[i]);
          }
        }
        this.setState({
            model_content: temp_content,
        });
    };

    onInfoWindowOpen(props, e) {
        const button = (
          <Button compact basic
            floated='right'
            onClick={this.props.onToggle}
          >
            View More
          </Button>
        );
        ReactDOM.render(
          React.Children.only(button),
          document.getElementById("iwc")
        );
      }

    onMarkerClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    

    render() {
        let markers;
        const marked_location = this.props.locations;
        if (locations !== null) {
            var i = 0;
            markers = locations.map((loc) => {
                if(marked_location.indexOf(loc.name) > -1){
                    i += 1;
                    return (
                        <Marker
                            key={i}
                            position={{ lat: loc.lat, lng: loc.lng}}
                            label={i.toString()}
                            onClick={this.onMarkerClick}
                            name={loc.name}
                        />
                    )
                }
            })
        }
        let contents = this.state.model_content;
        let models;
        if(contents && contents.length>0){
            models = contents.map((content, i) => {
                return (
                    <Card key={"model"+i} raised color="black" style={{border: "solid grey 0.1em"}} >
                        <Image src={content.Car.Picture} size='medium' />
                        <Card.Content>
                            <Card.Header style={{ marginBottom: '0.5vw', fontSize: '1.2vw' }}>
                                {content.Car.Brand}
                            </Card.Header>
                            <Card.Meta style={{fontSize: '0.8vw', textAlign: "left", paddingLeft: "2vw"}}>
                                <span>
                                    {content.StartDate.substring(0, 10)}
                                    &nbsp; to &nbsp;
                                    {content.EndDate.substring(0, 10)}
                                </span>
                            </Card.Meta>
                            <Card.Description style={{fontSize: '0.8vw', textAlign: "left", paddingLeft: "2vw"}}>
                                <div className="ui" style={{marginBottom: "0.5vw"}}>
                                    <b>Seats:&nbsp;</b>
                                    { new Array(content.Capacity || 1).fill(null).map(n => <Icon name="user outline" key={i} />)}
                                </div>
                                <div className="ui" style={{marginBottom: "0.5vw"}}>
                                    <b>Price:&nbsp;</b>
                                    <Icon name="dollar sign" />
                                    <b>{content.PricePerHour}</b>&nbsp;Per Hour
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Icon name="dollar sign" />
                                    <b>{content.PricePerDay}</b>&nbsp;Per Day
                                </div>
                                <div className="ui" style={{marginBottom: "0.5vw"}}>
                                    <b>Rating:&nbsp;</b>
                                    <Rating defaultRating={content.Car.Rating} icon='star' maxRating={5} disabled />
                                </div>
                                <div className="ui">
                                    <b>Rent Count:&nbsp;</b>
                                    {content.Car.RentCount}
                                </div>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                );
            });
        }

        return (
            <Map
                centerAroundCurrentLocation
                google={this.props.google}
            >
                {markers}
                {/* <Marker 
                    onClick={this.onMarkerClick} 
                    name={'Current Location'}
                    icon='https://findicons.com/files/icons/2540/glyph_icons/32/location.png'
                /> */}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onMarkerClose}
                    onOpen={e => {
                        this.onInfoWindowOpen(this.props, e);
                    }}
                >
                    <Paper style={{marginRight: "1vw", boxShadow: 'none'}}>
                        <Typography
                            variant='headline'
                            component='h5'
                            style={{fontWeight: 'bold', fontSize: "2vw", fontFamily: "Poiret One, cursive"}}
                        >
                            {this.state.selectedPlace.name}
                        </Typography>
                        <Typography component='p'>
                            {models}
                        </Typography>
                        <div id="iwc"/>
                    </Paper>
                </InfoWindow>
            </Map>
        );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAJNbOFFGV2FE-yLYI8L-XWK5GG3Gpb-2U'
  })(MapBox);

