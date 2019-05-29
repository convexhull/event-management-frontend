import React , { Component } from 'react';
import axios from 'axios';
import Button from '../../../components/UI/Button/Button'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Geosuggest from 'react-geosuggest';
import './Newevent.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

 

class ContactData extends Component {
    state = {
        title : '',
        description : '',
        location : null,
        start : null,
        end : null,
        mindate : null,
        maxdate : null,
        locationName : null
    }

    onSuggestSelect = (suggest) => {
        if(suggest) {
            this.setState({
                location : suggest.location,
                locationName : suggest.description
            })
        }
        
    }

    handleStartDateChange = (date) => {
        this.setState({
            start : date,
            mindate : date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            end : date,
            maxdate : date
        })
    }

    titleChangedHandler = (event) => {
        this.setState({
            title : event.target.value
        })
    }

    descriptionChangedHandler = (event) => {
        this.setState({
            description : event.target.value
        })
    }

    createHandler = (event) => {
        event.preventDefault();
        let formValid = this.state.title && this.state.description && this.state.location && this.state.start && this.state.end ;
        if(!formValid) {
            NotificationManager.warning('Plese fill out all the fields in order to create an event.', "Form Invalid", 3000);
            return ;
        }
        axios.post('https://ancient-wave-89479.herokuapp.com/createEvent', this.state)
            .then ( response => {
                response = response.data;
                console.log(response);
                if(response.message === "event_overlap_error") {
                    NotificationManager.warning("Event overlaps with another event.","Event not created");
                }
                else if(response.data._id) {
                    NotificationManager.success("Event was created");
                    setTimeout(()=>this.props.history.push('/'),1000);
                }
            })
            .catch( e => {
                console.log(e);
                NotificationManager.error("An Error Occurred");
            })
    }

    render() {
        let form = (
            <form className="form-class" onSubmit={this.createHandler}>
                <NotificationContainer />
                <label>Title</label><input type="text" value={this.state.title} onChange={this.titleChangedHandler} />
                <label>Description</label><input type="text" value={this.state.description} onChange={this.descriptionChangedHandler} />
                <label>Location</label> <Geosuggest onSuggestSelect={this.onSuggestSelect} />
                <label>Start Date</label>
                <DatePicker
                    selected={this.state.start}
                    onChange={this.handleStartDateChange}
                    maxDate={this.state.maxdate}
                />
                <label>End Date</label>
                <DatePicker
                    selected={this.state.end}
                    onChange={this.handleEndDateChange}
                    minDate={this.state.mindate}
                />
                <Button  btnType="Success">CREATE</Button>
            </form>
        )
        return (
            <div >
                <NotificationContainer />
                {form}
            </div>
        )
    }
}

export default ContactData;