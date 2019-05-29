import React  from 'react';
import Popup from 'reactjs-popup'
import { FaExclamationCircle } from 'react-icons/fa';
const moment = require('moment');


const mapMarker = (props) => {
    return (
        (<Popup closeOnDocumentClick = {true} trigger={<FaExclamationCircle size="3em" />} position="right center">
            <div>
                <h6>{props.event.title}</h6>
                <p>{props.event.description}</p>
                <hr />
                <p>{props.event.locationName}</p>
                <hr />
                <p>Start Date : {moment(props.event.start).format('YYYY-MM-DD')}</p>
                <p>End Date : {moment(props.event.end).format('YYYY-MM-DD')}</p>
            </div>
        </Popup>)
    )
}

export default mapMarker;