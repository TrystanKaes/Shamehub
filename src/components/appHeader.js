import React, { Component } from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {logoutUser} from "../actions/authActions";

class AppHeader extends Component {

    logout(){
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                ShameHub
                            </Navbar.Brand>
                        </LinkContainer>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to="/profile">
                            <NavItem eventKey={1} disabled={!this.props.loggedIn}>Profile </NavItem>
                        </LinkContainer>
                        <LinkContainer to='/feed'>
                            <NavItem eventKey={2} disabled={!this.props.loggedIn}>Feed </NavItem>
                        </LinkContainer>
                        <LinkContainer to="/signin">
                            <NavItem eventKey={3}>{this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Logout</button> : 'Login'}</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
        selectedMovie: ''//state.movie.selectedMovie,
    }
}

export default withRouter(connect(mapStateToProps)(AppHeader));