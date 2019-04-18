import React, { Component } from 'react';
import Icon from 'semantic-ui-react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Map_ from './Map_.jsx';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from '@material-ui/core/styles';

const locations = [
    { key: 'ch', name: 'Champaign', lat: '40.116329', lng: '-88.243523' },
    { key: 'sa', name: 'Savory', lat: '40.069031', lng: '-88.253433' },
    { key: 'ur', name: 'Urbana', lat: '40.112461', lng: '-88.207458'  },
];

export class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
        this.onMarkerClick=this.onMarkerClick.bind(this);
        this.onMarkerClose=this.onMarkerClose.bind(this);

    };

    onMarkerClick = (props, marker, e) => {
        console.log(this.state.selectedPlace.position);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
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
        if (locations !== null) {
            markers = locations.map((location, i) => {
                return (
                    <Marker
                        key={i}
                        position={{ lat: location.lat, lng: location.lng}}
                        label={(i + 1).toString()}
                        onClick={this.onMarkerClick}
                        name={location.name}
                    />
                )
            })
        } 

        return (
            <Map_
                centerAroundCurrentLocation
                google={this.props.google}
            >
                {markers}
                <Marker 
                    onClick={this.onMarkerClick} 
                    name={'Current Location'}
                    icon='https://findicons.com/files/icons/2540/glyph_icons/32/location.png'
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onMarkerClose}
                >
                    <Paper>
                        <Typography
                            variant='headline'
                            component='h5'
                        >
                            {this.state.selectedPlace.name}
                        </Typography>
                        <Typography
                            component='p'
                        >
                        {/* lat: {this.state.selectedPlace.position} */}
                        </Typography>
                        </Paper>
                    </InfoWindow>
            </Map_>
        );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAJNbOFFGV2FE-yLYI8L-XWK5GG3Gpb-2U'
  })(MapBox);
