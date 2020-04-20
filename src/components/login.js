import React, { Component } from 'react';
import { submitLogin } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';


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
            show: false,
            bypass: false,
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

    login() {
        const {dispatch} = this.props;
        dispatch(submitLogin(this.state.details));
    }

    render(){

        return (

            <Form horizontal>
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
                                  onClick={this.bypassLogin}> Color Login</Button>
                          :
                          <Button variant="light" onClick={this.bypassLogin}> Standard Login</Button>
                      }
                  </div>
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

    }
}

export default connect(mapStateToProps)(Login);
