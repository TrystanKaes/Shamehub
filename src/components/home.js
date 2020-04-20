import React, { Component } from 'react';
import Welcomebanner from "./welcomebanner";
import { connect } from 'react-redux';

class Home extends Component {
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
                <Welcomebanner/>
                <h1>Welcome to Shamehub</h1>
                <h6>the github based social media</h6>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(Home);