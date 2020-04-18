import React, { Component} from 'react';
import { submitRegister } from '../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import {SketchPicker } from 'react-color'

class Register extends Component {

    constructor(){
        super();

        //We are required to bind this to use these functions, if you add a function, bind it
        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.toggleWheel = this.toggleWheel.bind(this);
        this.state = {
            details:{
                name: '',
                username: '',
                password: ''
            },
            background: '#fff',
            show: false
        };
    }

    handleChangeComplete = (color) => {
        //every color change, we update the background and password
        this.setState({
            details:{
                name: this.state.details.name,
                username: this.state.details.username,
                password: color.hex
            },
            background: color.hex,
        });
    };

    toggleWheel(){
        //everytime this function executes(executes from a button click) it toggles the show variable to the opposite
        this.setState({
            show: !this.state.show
        });
        console.log(this.state);
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    register(){
        const {dispatch} = this.props;
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="name">
                    <Col as={FormLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.name} type="text" placeholder="Name" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="username">
                    <Col as={FormLabel} sm={2}>
                        username
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col as={FormLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <Button onClick={this.toggleWheel}> Click To Enter Password </Button>
                        <Button onClick={this.register}>Register</Button>
                        {this.state.show ? <SketchPicker color={ this.state.background }
                                                         onChangeComplete={ this.handleChangeComplete }/> : ''}
                        {/*^^^ goes back and forth between rendering the colorwheel or nothing, show variable in
                        state toggles from a button*/}
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

export default connect(mapStateToProps)(Register);