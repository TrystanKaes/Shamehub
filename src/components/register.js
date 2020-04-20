import React, { Component} from 'react';
import { submitRegister } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import {SketchPicker } from 'react-color'

class Register extends Component {

    constructor(){
        super();

        //We are required to bind this to use these functions, if you add a function, bind it
        this.updateDetails = this.updateDetails.bind(this);
        this.bypassSignup = this.bypassSignup.bind(this);
        this.register = this.register.bind(this);
        this.toggleWheel = this.toggleWheel.bind(this);
        this.state = {
            details:{
                name: '',
                username: '',
                password: ''
            },
            background: '#fff',
            show: false,
            bypass: false
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

    bypassSignup(){
        //username and password stored in plane text aaaahhh!!!, use env file instead :)
        let bypassColor = this.state.bypass
        this.setState({bypass: !bypassColor})
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
                    <div style={{display: 'flex', justifyContent: 'center'}} componentClass={FormLabel} sm={2}>
                        <h3>Name</h3>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                        <FormControl style={{width: window.innerWidth/4}}
                                     onChange={this.updateDetails}
                                     value={this.state.details.name}
                                     type="name"
                                     placeholder="Name" />
                    </div>
                </FormGroup>
                <FormGroup controlId="username">
                    <div style={{display: 'flex', justifyContent: 'center'}} componentClass={FormLabel} sm={2}>
                        <h3>Username</h3>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                        <FormControl style={{width: window.innerWidth/4}}
                                     onChange={this.updateDetails}
                                     value={this.state.details.username}
                                     type="username"
                                     placeholder="Username" />
                    </div>
                </FormGroup>
                <FormGroup controlId="password">
                    <div style={{display: 'flex', justifyContent: 'center'}} componentClass={FormLabel} sm={2}>
                        <h3>Password</h3>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                        {this.state.bypass ?
                            <FormControl style={{width: window.innerWidth / 4}}
                                         onChange={this.updateDetails}
                                         value={this.state.details.password}
                                         type="password"
                                         placeholder="Password"/>
                            :
                            <SketchPicker color={ this.state.background }
                                          onChangeComplete={ this.handleChangeComplete }/>
                        }
                    </div>
                </FormGroup>
                <FormGroup>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                        {this.state.bypass ?
                            <Button style={{backgroundColor: '#55828b',
                                color: '#87bba2',
                                borderColor: '#c03221',
                            }}
                                    onClick={this.bypassSignup}> Color Signup</Button>
                            :
                            <Button variant="light" onClick={this.bypassSignup}> Standard Signup</Button>
                        }
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                        <Button variant="secondary" onClick={this.register}>Register</Button>
                    </div>
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