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
import {logoutUser} from "../../actions/userActions";
import lightLogo from "../../assets/light-logo.svg";
import darkLogo from "../../assets/dark-logo.svg";

class AppHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
            search: "",
            invertTheme: (this.props.theme === 'dark') ?  'dark' : 'light',
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
                <Navbar expand="lg"
                        variant={this.props.theme}
                        bg={this.props.theme}
                        fluid="true"
                        fixed="top"
                        style={{borderRadius:0, backgroundOpacity: 1}}>
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

                    <Form inline>
                        <FormControl onChange={this.updateDetails.bind(this)}
                                     type="text"
                                     placeholder="Search"
                                     style={{flex:1}}
                                     className="mr-sm-2" />
                        <Button onClick={()=>{alert(this.state.search)}}
                                variant="outline-success"
                                style={{borderColor:"#55828b"}}>Search</Button>
                    </Form>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link>
                                <LinkContainer to="/home">
                                    <NavItem eventkey={1} >Home </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                            <Nav.Link disabled={!this.props.loggedIn}>
                                <LinkContainer to="/profile">
                                    <NavItem eventkey={2}>Profile </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                            <NavDropdown title="Feeds" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <LinkContainer to="/discover">
                                        <NavItem eventkey={3} disabled={!this.props.loggedIn}>Discover </NavItem>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item disabled={!this.props.loggedIn}>
                                    <LinkContainer to="/userfeed">
                                        <NavItem eventkey={4} >Home Feed </NavItem>
                                    </LinkContainer>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link >
                                <LinkContainer to="/ColorWheelGame">
                                    <NavItem eventkey={5}>C.W.G. </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                            <Nav.Link>
                                <LinkContainer to="/signin">
                                    <NavItem eventkey={6}>
                                        {/*{this.props.loggedIn ? <Button style={{height:20, justifyContent: 'center'}} variant={'outline-' + this.state.invertTheme} onClick={this.logout.bind(this)}>Logout</Button>  : 'Login'}*/}
                                        {this.props.loggedIn ? <div style={{textDecoration:'line-through'}}>Logout</div>  : 'Login'}
                                    </NavItem>
                                </LinkContainer>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="Top-buffer"/>
            </header>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.user.loggedIn,
        username: state.user.username,
        theme: state.glob.theme,
    }
}

export default withRouter(connect(mapStateToProps)(AppHeader));