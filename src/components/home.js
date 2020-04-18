import React, { Component } from 'react';
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
                <h4>Welcome to Shamehub</h4>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(Home);