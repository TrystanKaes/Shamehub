import React, { Component } from 'react';
import {Navbar,
        NavItem,
        Nav,
        NavDropdown,
        Form,
        FormControl,
        Button,
        Container,
        } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {logoutUser} from "../actions/authActions";
import lightLogo from "../assets/light-logo.svg";
import darkLogo from "../assets/dark-logo.svg";

class AppHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            search: ""
        };
    }

    logout(){
        this.props.dispatch(logoutUser());
    }

    updateDetails(event){
        this.setState({search: event.target.value})
    }

    render() {
        return (
            <Container>
            <header>
                <Navbar expand="lg" variant={this.props.theme} bg={this.props.theme} fluid fixed="top" style={{borderRadius:0, backgroundOpacity: 1}} class="Drop-Shadow-Dark">
                    <Navbar.Brand href="/welcome">
                        {(this.props.theme === 'dark') ?
                        <img
                            src={darkLogo}
                            width="80"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        :
                        <img
                            src={lightLogo}
                            width="80"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />}

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <LinkContainer to="/home">
                                    <NavItem eventKey={1} >Home </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                            <Nav.Link disabled={this.props.loggedIn}>
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
                            <FormControl onChange={this.updateDetails.bind(this)} type="text" placeholder="Search" className="mr-sm-2" />
                            <Button onClick={()=>{alert(this.state.search)}}
                                    variant="outline-success"
                                    style={{borderColor:"#55828b"}}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <div class="Top-buffer"/>
            </header>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
        theme: state.glob.theme,
    }
}

export default withRouter(connect(mapStateToProps)(AppHeader));