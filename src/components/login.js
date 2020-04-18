import React, { Component } from 'react';
import { submitLogin } from '../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import {SketchPicker } from 'react-color'   //THIS IS THE NEW WHEEL THAT WILL FUCKING WORK
//import iro from '@jaames/iro';  //SHIT WHEEL, BAD, NIGHTMARE, BAD, LOSER WHEEL, BAD(I like it better but I can't get it to work :[ )

class Login extends Component {

    constructor(props) {
        super(props);
        //If we don't bind (this) then the functions say that 'this' is undefined
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);
        this.bypassLogin = this.bypassLogin.bind(this);
        this.toggleWheel = this.toggleWheel.bind(this);

        this.state = {
            details:{
                username: '',
                password: '',
            },
            background: '#fff',
            show: false
        };
    }

    handleChangeComplete = (color) => {
        //everytime a color is changed, we will change the background and password
        this.setState({
            details:{
                username: this.state.details.username,
                password: color.hex
            },
            background: color.hex,
        });
    };

    toggleWheel(){
        //everytime the button is clicked to reveal the wheel, the show variable toggles
        this.setState({
            show: !this.state.show
        });
    }

    bypassLogin(){
        //username and password stored in plane text aaaahhh!!!, use env file instead :)
        let bypassDetails = this.state.details
        bypassDetails['username'] = "Anthony";
        bypassDetails['password'] = "food";
        this.setState({details: bypassDetails})
        this.login();
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    login() {
        const {dispatch} = this.props;
        dispatch(submitLogin(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="username">
                    <Col as={FormLabel} sm={2}>
                        username
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col as={FormLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <Button onClick={this.toggleWheel}> Click To Enter Password </Button>
                        <Button onClick={this.bypassLogin}> Bypass Login </Button>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={9}>
                        <Button onClick={this.login}>Sign in</Button>
                    </Col>
                    <Col smOffset={2} sm={9}>
                        {this.state.show ? <SketchPicker color={ this.state.background }
                                                         onChangeComplete={ this.handleChangeComplete }/> : ''}
                        {/*^^^ this code will switch back and forth between rendering the colorwheel or nothing
                        based on the state variable that toggles from clicking a button*/}
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(Login);