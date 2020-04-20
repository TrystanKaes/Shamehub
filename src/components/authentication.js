import React, { Component} from 'react';
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import Login from './login';
import Register from './register';
import { logoutUser } from '../actions/authActions';
import Welcomebanner from "./welcomebanner";

class Authentication extends Component {

    constructor(){
        super();

        this.state = {
            toggleReg: false
        };
    }

    componentDidMount(){

    }

    showLogin(){
        this.setState({
            toggleReg: false
        });
    }

    showReg(){
        this.setState({
            toggleReg: true
        });
    }

    logout(){
        this.props.dispatch(logoutUser());
    }

    render(){

        const userNotLoggedIn = (
            <div style={{justifyContent: 'center'}}>
                    {this.state.toggleReg?
                        <ButtonGroup style={{padding: 15}}>
                            <Button variant="secondary" onClick={this.showLogin.bind(this)}>Login</Button>
                            <Button variant="dark" onClick={this.showReg.bind(this)}>Register</Button>
                        </ButtonGroup>
                        :
                        <ButtonGroup style={{padding: 15}}>
                            <Button variant="dark" onClick={this.showLogin.bind(this)}>Login</Button>
                            <Button variant="secondary" onClick={this.showReg.bind(this)}>Register</Button>
                        </ButtonGroup>
                    }
                { this.state.toggleReg ? <Register /> : <Login /> }
            </div>

        );

        const userLoggedIn = (<div>Logged in as: {this.props.username} <button onClick={this.logout.bind(this)}>Logout</button></div>);

        return (
            <div>
                <Welcomebanner/>
                <div style={{padding: 10}} />
                {this.props.loggedIn ? userLoggedIn : userNotLoggedIn}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Authentication)