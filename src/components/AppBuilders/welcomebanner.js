import React, { Component } from 'react';
import { connect } from 'react-redux';
import lightLogo from '../../assets/light-logo.svg';
import darkLogo from '../../assets/dark-logo.svg';

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
            <div>{(this.props.theme === 'dark') ?
                <img src={darkLogo} className="App-logo" alt="logo" />
                :
                <img src={lightLogo} className="App-logo" alt="logo" />}
                {/*<h1>Welcome to Shamehub</h1>*/}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        theme: state.glob.theme
    }
}

export default connect(mapStateToProps)(Welcomebanner);