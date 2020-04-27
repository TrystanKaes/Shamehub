import React, { Component } from 'react';
import { submitLogin } from '../../../actions/userActions';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import {LoadState} from "../../../actions/globalActions";


class Login extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            details:{
                username: '',
                password: '',
            },
            background: '#fff',
        };
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
        dispatch(LoadState('Logging you in'))
        dispatch(submitLogin(this.state.details));
    }

    render(){

        return (
            <Form horizontal="true">
              <FormGroup controlId="username">
                  <div style={{display: 'flex', justifyContent: 'center'}} componentClass={FormLabel} sm={2}>
                      <div className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Text'}>
                        <h3>Username</h3>
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
                      <Button variant="secondary" onClick={this.login}>Sign in</Button>
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

export default connect(mapStateToProps)(Login);
