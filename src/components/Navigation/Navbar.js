import React, {Component} from 'react';
import { Navbar , Nav, NavDropdown } from 'react-bootstrap';

class Navigationbar extends Component {

    clickHandler = () => {
        console.log("clicked");
    }
    render() {
        return (
            <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">Event Management</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/createEvent">Create Event</Nav.Link>
      <NavDropdown title="My Events" id="basic-nav-dropdown">
        <NavDropdown.Item href="/getEventsByLoc">Location View</NavDropdown.Item>
        <NavDropdown.Item href="/getEventsByDate">Calendar View</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
        )
    }
}

export default Navigationbar;