import React, { Component } from 'react';
import { connect } from 'react-redux';

class DiscoverFeed extends Component {
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
                THIS IS A GLOBAL FUPPING Feed!
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(DiscoverFeed);