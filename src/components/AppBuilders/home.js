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
            <div className={(this.props.theme === 'dark') ? 'Dark-Background' : 'Light-Background'}>
                <Welcomebanner/>
                <div style={{padding:20}}>
                    <h1 className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Dext'}>Welcome to Shamehub</h1>
                    <h6 className={(this.props.theme === 'dark') ? 'Dark-Text' : 'Light-Dext'}>[ social connection through codebase opacity ]</h6>
                </div>
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