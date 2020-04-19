import React, { Component } from 'react';
import {Navbar,
        NavItem,
        Nav,
        NavDropdown,
        Form,
        FormControl,
        Button
        } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {logoutUser} from "../actions/authActions";
import logo from "../assets/logo.svg";

class AppHeader extends Component {

    logout(){
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <header>
                <Navbar expand="lg" variant="light" bg="light" fluid fixed="top">
                    <Navbar.Brand href="/welcome">
                        <img
                            src={logo}
                            width="80"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <LinkContainer to="/welcome">
                                    <NavItem eventKey={1} >Home </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                            <Nav.Link disabled={!this.props.loggedIn}>
                                <LinkContainer to="/profile">
                                    <NavItem eventKey={2}>Profile </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                            <NavDropdown title="Feeds" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <LinkContainer to="/discover">
                                        <NavItem eventKey={4} disabled={!this.props.loggedIn}>Discover </NavItem>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item disabled={!this.props.loggedIn}>
                                    <LinkContainer to="/userfeed">
                                        <NavItem eventKey={3} >Home Feed </NavItem>
                                    </LinkContainer>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link>
                                <LinkContainer to="/signin">
                                    <NavItem eventKey={3}>
                                        {this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Logout</button>  : 'Login'}
                                    </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <div class="Top-buffer"/>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
    }
}

export default withRouter(connect(mapStateToProps)(AppHeader));