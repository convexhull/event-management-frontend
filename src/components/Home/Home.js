import React  , {Component} from 'react';
import './Home.css'
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { NotificationManager , NotificationContainer } from 'react-notifications';
import MapMarker from '../UI/MapMarker/mapMarker';

const moment = require('moment');

class Home extends Component {

  state = {
    events : [],
    todayEvent : null,
    center : {
      lat : 25.00,
      lng : 28.00
    },
    zoom : 1
  }

  componentDidMount() {
    axios.get('https://stormy-basin-42021.herokuapp.com//allEvents')
      .then ( response => {
        let fetchedEvents = response.data.data;
        this.setState({
          events : fetchedEvents
        })
      })
      .catch ( error =>{
        console.log(error);
        NotificationManager.error("An error occurred");
      })
      
    axios.get('https://stormy-basin-42021.herokuapp.com//eventToday')
      .then ( response => {
        let event = response.data.data;
        if(event && event.location) {
          let newCenter = {
            lat : Number(event.location.lat),
            lng : Number(event.location.lng)
          }
          this.setState({
            todayEvent : event,
            center : newCenter
          })
        }
      })
      .catch( e => {
        console.log(e);
        NotificationManager.error("An error occurred");
      })
  }

  render() {
    let colorOptions = ["primary", "secondary", "success", "danger","info","warning","light","dark","danger"];
    let count = 0;
    let leftDivContent = this.state.events.map( (event) => (
      <ListGroup.Item key={event._id} variant={colorOptions[(count++)%8]}>
        <h4>{event.title}</h4>
        <h6>{event.description}</h6>
        <h6>{event.locationName}</h6>
        <h6>Start Date : <strong>{moment(event.start).format('YYYY-MM-DD')}</strong> , End Date : <strong>{moment(event.end).format('YYYY-MM-DD')}</strong></h6>
      </ListGroup.Item>
    ))

    let googleMap = <h1>No Event today. Try creating one !</h1> , mapMarker = null ;

    if(this.state.todayEvent && this.state.todayEvent.location ) {

      mapMarker = (
        <MapMarker
          event={this.state.todayEvent}
          lat={this.state.todayEvent.location.lat}
          lng={this.state.todayEvent.location.lng} />
      ) 
      googleMap = <div style={{ height: '80vh', width: '100%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: "AIzaSyB1JyDahKwe1wPXoFeNMQJ34BCzzm6boXI" }}
                      defaultCenter={this.state.center}
                      defaultZoom={this.state.zoom}
                      hoverDistance={30}
                    >
                    {mapMarker}
                    </GoogleMapReact>
                  </div>
    }

    let listOfEvents = <h1>No events to display. Try creating one !</h1>

    if(this.state.events.length) {
      listOfEvents = <ListGroup>{leftDivContent}</ListGroup>;
    }

    return (
      <div className="home-div">
        <NotificationContainer />
        <div className="event-div">
          <div>
            <h1 style={{textAlign: "center" , borderBottom : "3px solid grey"}}>List of Events</h1>
          </div>
          {listOfEvents}
        </div>
        <div className="map-div">
          <div>
            <h1 style={{textAlign : "center" , borderBottom : "3px solid grey"}}>Today's Event Location(Map)</h1>
            {googleMap}
          </div>
        </div>
      </div>
    )
    
  }
}


export default Home;