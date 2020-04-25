import React, { Component} from 'react';
import { submitRegister } from '../actions/userActions';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import {LoadState} from "../actions/globalActions";

class Register extends Component {

    constructor(){
        super();

        //We are required to bind this to use these functions, if you add a function, bind it
        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            details:{
                github_username: '',
                username: '',
                password: ''
            },
            background: '#fff',
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        updateDetails['github_username'] =  updateDetails['username'];
        this.setState({
            details: updateDetails
        });
    }

    register(){
        const {dispatch} = this.props;
        dispatch(LoadState('Creating your profile'))
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="username">
                    <div style={{display: 'flex', justifyContent: 'center'}} componentClass={FormLabel} sm={2}>
                        <div className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                            <h3>Github Username</h3>
                        </div>
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
                        <div className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                            <h3>Password</h3>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', padding: 4}} componentClass={FormLabel} sm={2}>
                            <FormControl style={{width: window.innerWidth / 4}}
                                         onChange={this.updateDetails}
                                         value={this.state.details.password}
                                         type="password"
                                         placeholder="Password"/>
                    </div>
                </FormGroup>
                <FormGroup>
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
        theme: state.glob.theme,
    }
}

export default connect(mapStateToProps)(Register);