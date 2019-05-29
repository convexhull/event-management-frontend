import React , { Component } from 'react';
import axios from 'axios';
import Calendar from "react-big-calendar";
import moment from "moment";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment);

class Eventdate extends Component {
    state = {
        events : []
    }
    componentDidMount() {
        axios.get('https://ancient-wave-89479.herokuapp.com/allEvents')
            .then( response => {
                this.setState({
                    events : response.data.data
                })
            })
            .catch ( e => {
                console.log(e);
                NotificationManager.error("An Error occurred");
            })
    }
    render() {
        let events = [];
        if(this.state.events) {
            events = this.state.events
        }
        return (
            <div>
                <NotificationContainer />
                <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "90vh" }}
                />
            </div>
            
        );
    }
}

export default Eventdate;