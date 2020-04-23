import React, { Component} from 'react';
import { connect } from 'react-redux'
import {ButtonGroup, Button} from 'react-bootstrap'
import Login from './login';
import Register from './register';
import { logoutUser } from '../actions/userActions';
import Welcomebanner from "./welcomebanner";

class Authentication extends Component {

    constructor(){
        super();

        this.state = {
            toggleReg: false,
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
        const theme = {
            invertTheme: (this.props.theme === 'dark') ?  'light' : 'dark',
            text: (this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text',
        }
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

        const userLoggedIn = (<div class={theme.text}>Logged in as: {this.props.username}<div style={{width:2, height:4}}/>
        <Button style={{justifyContent: 'center'}}
                variant={'outline-' + theme.invertTheme}
                onClick={this.logout.bind(this)}>Logout</Button></div>);

        return (
            <div>
                <Welcomebanner/>
                <div style={{padding: 10}} />
                {this.props.loggedIn ?
                    userLoggedIn
                    :
                    userNotLoggedIn
                }
                <div style={{height:window.innerHeight}}></div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.user.loggedIn,
        username: state.user.username,
        theme: state.glob.theme
    }
}

export default connect(mapStateToProps)(Authentication)