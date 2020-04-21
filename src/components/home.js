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
            <div class={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
                <Welcomebanner/>
                <div style={{padding:20}}>
                    <h1 class={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Dext'}>Welcome to Shamehub</h1>
                    <h6 class={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Dext'}>the github based social media</h6>
                </div>
                <div style={{height:window.innerHeight}}></div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme
    }
}

export default connect(mapStateToProps)(Home);