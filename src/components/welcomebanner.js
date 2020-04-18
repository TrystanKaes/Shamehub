import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './../assets/logo.svg';

class Welcomebanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
        };
    }

    componentDidMount() {

    }

    render() {

        return(
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Welcome to Shamehub</h1>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(Welcomebanner);