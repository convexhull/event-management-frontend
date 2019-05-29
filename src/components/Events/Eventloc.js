import React , { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import MapMarker from '../UI/MapMarker/mapMarker'


class SimpleMap extends Component {
    state = {
        center : {
            lat : 27.25,
            lng : 72.45
        },
        zoom : 1,
        show : false,
        events : []
    }
 

    componentDidMount() {
        axios.get('https://stormy-basin-42021.herokuapp.com//allEvents')
            .then ( response => {
                let events = response.data.data;
                if(events.length) {
                    this.setState({
                        events
                    })   
                }
            })
            .catch ( e => {
                console.log(e);
                NotificationManager.error("An Error Occured")
            })
    }
    render() {
        let events = this.state.events;
  

        let markers = events.map( event => (
            <MapMarker key={event._id} event={event} lat={event.location.lat} lng={event.location.lng} />
        ))

        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <NotificationContainer />
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB1JyDahKwe1wPXoFeNMQJ34BCzzm6boXI" }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    hoverDistance={30}>

                {markers}
                
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;